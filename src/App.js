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
    const [audioSource, setAudioSource] = useState(null);

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
                    console.log(data);
                    const message = Object.assign(data, {
                        target: lastAuthor,
                    });
                    webSocket.send(JSON.stringify(message));
                });
            });
            webSocket.addEventListener("message", function (ev) {
                const data = JSON.parse(ev.data);
                console.log(data);

                lastAuthor = data.author;
                acceptingPeer.signal(data);
            });
            acceptingPeer.on("connect", function () {
                console.log("Fired from the connect listener");
                acceptingPeer.send("Sending from nick's machine :)");

                window.acceptingPeer = acceptingPeer;

                navigator.mediaDevices
                    .getUserMedia({
                        audio: true,
                    })
                    .then((stream) => {
                        acceptingPeer.addStream(stream);
                        acceptingPeer.on("stream", (stream) => {
                            setAudioSource(stream);
                        });

                        audioSource.play();
                    })
                    .catch((err) => {
                        console.log(
                            "catching an error from the acceptingPeer.on('connect') listener:",
                        );
                        console.error(err);
                    });
            });
            acceptingPeer.on("data", function (data) {
                console.debug(`Got a message: ${data}`);
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
                {audioSource && <video src={audioSource}></video>}
            </UserContext.Provider>
        </>
    );
}

export default App;
