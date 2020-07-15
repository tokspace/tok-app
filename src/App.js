import React, { useEffect, useState } from "react";
import styled, { css } from "styled-components";
import LoginComponent from "./apps/Login";
import RegistrationComponent from "./apps/Registration";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import firebase from "firebase";
import UserContext from "./contexts/UserContext";
import RunningProcesses from "./components/RunningProcesses";

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

function App() {
    const [user, setUser] = useState(null);

    useEffect(() => {
        firebase.auth().onAuthStateChanged(setUser);
    }, []);
    return (
        <UserContext.Provider value={user}>
            <Router>
                <Switch>
                    <Background centered>
                        <Route path="/register">
                            <RegistrationComponent />
                        </Route>
                        <Route exact path="/">
                            <LoginComponent />
                        </Route>
                    </Background>
                </Switch>
            </Router>
        </UserContext.Provider>
    );
}

export default App;
