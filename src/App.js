import React, { useEffect, useMemo, useState } from "react";
import styled, { css } from "styled-components";
import LoginComponent from "./apps/Login";
import RegistrationComponent from "./apps/Registration";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
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

    const ws = useMemo(() => new WebSocket("ws://localhost:8080"), []);
    const acceptor = useMemo(() => new Peer(), []);
    let signalTarget;

    ws.onmessage = (event) => {
        const data = JSON.parse(event.data);
        acceptor.signal(data);
        signalTarget = data.author;
    };

    acceptor.on("signal", (data) => {
        ws.send(JSON.stringify({ data, target: signalTarget }));
    });

    acceptor.on("data", (data) => {
        // got a data channel message
        console.log(`got a message from ${signalTarget}: ${data}`);
    });

    useEffect(() => {
        firebase.auth().onAuthStateChanged((firebaseUser) => {
            console.log(firebaseUser);
            if (firebaseUser === null) {
                setUser(null);
            } else {
                // ws.send(firebaseUser.uid);
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
            }
        });
    }, []);
    return (
        <>
            <InvisibleTitleBar />
            <UserContext.Provider value={user}>
                <Router>
                    <Switch>
                        {user !== null && (
                            <Background>
                                <Route path={"/sessions/new-with-user/:userId"}>
                                    <SessionInitiator />
                                </Route>
                                <Route path={"/office/:officeId"}>
                                    <OfficeView />
                                </Route>
                                <Route exact path="/">
                                    <Dashboard />
                                </Route>
                            </Background>
                        )}
                        <Route path="/register">
                            <Background centered={true}>
                                <RegistrationComponent />
                            </Background>
                        </Route>
                        <Route>
                            <Background centered={true}>
                                <LoginComponent />
                            </Background>
                        </Route>
                    </Switch>
                </Router>
            </UserContext.Provider>
        </>
    );
}

export default App;
