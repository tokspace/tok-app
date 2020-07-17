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
import CallContext from "./contexts/CallContext";
import { InvisibleTitleBar } from "./components/InvisibleTitleBar";
import OfficeView from "./apps/OfficeView";
import PropTypes from "prop-types";
import Dashboard from "./apps/Dashboard";
import SessionInitiator from "./apps/SessionInitiator";
import { PeerConnection } from "./websockets/Connection";
import Call from "./apps/Call";

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
    const [call, setCall] = useState(null);

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
            setCall(new PeerConnection(firebaseUser));
        });
    }, []);

    function renderRoutes() {
        if (user === null) {
            return (
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
            return (
                <CallContext.Provider value={call}>
                    <Call />
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
                </CallContext.Provider>
            );
        }
    }

    return (
        <>
            <InvisibleTitleBar />
            <UserContext.Provider value={user}>
                <Router>{renderRoutes()}</Router>
            </UserContext.Provider>
        </>
    );
}

export default App;
