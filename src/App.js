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
import { NewPeer } from "./websockets/Connection";
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
    // const [audioSource, setAudioSource] = useState(null);

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

            NewPeer(firebaseUser);
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
                {/* {audioSource && <audio src={audioSource}></audio>} */}
            </UserContext.Provider>
        </>
    );
}

export default App;
