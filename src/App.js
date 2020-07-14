import React from "react";
import styled, { css } from "styled-components";
import LoginComponent from "./apps/Login";
import RegistrationComponent from "./apps/Registration";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

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
    return (
        <Router>
            <Switch>
                <Background centered>
                    <Route
                        path="/register"
                        children={<RegistrationComponent />}
                    />
                    <Route exact path="/" children={<LoginComponent />} />
                </Background>
            </Switch>
        </Router>
    );
}

export default App;
