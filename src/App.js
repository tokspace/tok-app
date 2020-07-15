import React, { useEffect, useState } from "react";
import styled, { css } from "styled-components";
import LoginComponent from "./apps/Login";
import RegistrationComponent from "./apps/Registration";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import firebase from "firebase/app";
import UserContext from "./contexts/UserContext";
import { InvisibleTitleBar } from "./components/InvisibleTitleBar";
import OfficeView from "./apps/OfficeView";
import PropTypes from "prop-types";
import Dashboard from "./apps/Dashboard";

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
        const unsubscribers = [];

        firebase.auth().onAuthStateChanged((firebaseUser) => {
            if (firebaseUser === null) {
                setUser(null);
            } else {
                unsubscribers.push(
                    firebase
                        .firestore()
                        .doc(`Users/${firebaseUser.uid}`)
                        .get()
                        .then((snapshot) => {
                            setUser({
                                tokProfile: snapshot.data(),
                                ...firebaseUser,
                            });
                        }),
                );
            }
        });

        return () => {
            unsubscribers.forEach((it) => it());
        };
    }, []);
    return (
        <>
            <InvisibleTitleBar />
            <UserContext.Provider value={user}>
                <Router>
                    <Switch>
                        {user !== null && (
                            <>
                                <Route path={"/office/:officeId"}>
                                    <OfficeView />
                                </Route>
                                <Route exact path="/">
                                    <Dashboard />
                                </Route>
                            </>
                        )}
                        <Route path="/register">
                            <Background centered={true}>
                                <RegistrationComponent />
                            </Background>
                        </Route>
                        <Route exact path={"/"}>
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
