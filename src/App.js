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
import SessionInitiator from "./apps/SessionInitiator";
import { PeerConnection } from "./websockets/Connection";
import Call from "./apps/Call";
import Settings from "./apps/Settings";

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
                .onSnapshot((snapshot) => {
                    setUser({
                        tokProfile: snapshot.data(),
                        ...firebaseUser,
                    });
                });
            const connection = new PeerConnection(firebaseUser);
            connection.ws.addEventListener("open", function () {
                setCall(connection);
            });
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
                <>
                    {call && call.p && <Call call={call} />}
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
                        <Route path="/settings">
                            <Background centered={true}>
                                <Settings />
                            </Background>
                        </Route>
                        <Redirect to="/dashboard" />
                    </Switch>
                </>
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
