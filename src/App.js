import React, { useEffect, useState } from "react";
import styled, { css } from "styled-components";
import LoginComponent from "./apps/Login";
import RegistrationComponent from "./apps/Registration";
import {
    BrowserRouter as Router,
    Route,
    Switch,
    Redirect,
} from "react-router-dom";
import firebase from "firebase/app";
import UserContext from "./contexts/UserContext";
import { InvisibleTitleBar } from "./components/InvisibleTitleBar";
import OfficeView from "./apps/OfficeView";
import PropTypes from "prop-types";
import Dashboard from "./apps/Dashboard";
import Peer from "simple-peer";
import SessionInitiator from "./apps/SessionInitiator";

const Background = styled.div`
    ${(props) =>
        props.centered &&
        css`
            display: flex;
            align-items: center;
            justify-content: center;
            height: 100vh;
        `}
`;

Background.propTypes = {
    centered: PropTypes.bool,
};

function App() {
    const [user, setUser] = useState(null);

    useEffect(() => {
        firebase.auth().onAuthStateChanged((firebaseUser) => {
            if (firebaseUser === null) {
                setUser(null);
                return;
            }
            firebase
                .firestore()
                .doc(`Users/${firebaseUser.uid}`)
                .get()
                .then((snapshot) => {
                    setUser({
                        tokProfile: snapshot.data(),
                        ...firebaseUser,
                    });
                });

            const webSocket = new WebSocket("ws://localhost:8080");
            const acceptingPeer = new Peer();

            let lastAuthor;

            webSocket.addEventListener("open", function () {
                webSocket.send(firebaseUser.uid);
                acceptingPeer.on("signal", function (data) {
                    const message = Object.assign(data, {
                        target: lastAuthor,
                    });
                    webSocket.send(JSON.stringify(message));
                });
                acceptingPeer.on("data", function (data) {
                    console.debug(`Got a message: ${data}`);
                });
            });
            webSocket.addEventListener("message", function (ev) {
                const data = JSON.parse(ev.data);

                lastAuthor = data.author;
                acceptingPeer.signal(data);
            });
        });
    }, []);

    let routes;
    if (user === null) {
        routes = (
            <Switch>
                <Route path="/register">
                    <Background centered={true}>
                        <RegistrationComponent />
                    </Background>
                </Route>
                <Route path="/login">
                    <Background centered={true}>
                        <LoginComponent />
                    </Background>
                </Route>
                <Redirect to="/login" />
            </Switch>
        );
    } else {
        routes = (
            <Switch>
                <Route path={"/sessions/new-with-user/:userId"}>
                    <SessionInitiator />
                </Route>
                <Route path="/dashboard">
                    <Dashboard />
                </Route>
                <Route path={"/office/:officeId"}>
                    <Background>
                        <OfficeView />
                    </Background>
                </Route>
                <Redirect to="/dashboard" />
            </Switch>
        );
    }

    return (
        <>
            <InvisibleTitleBar />
            <UserContext.Provider value={user}>
                <Router>{routes}</Router>
            </UserContext.Provider>
        </>
    );
}

export default App;
