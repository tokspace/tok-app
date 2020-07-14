import React from "react";
import styled, { css } from "styled-components";
import LoginComponent from "./apps/Login";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

const Background = styled.div`
    ${(props) =>
        props.centered &&
        css`
            display: flex;
            align-items: center;
            justify-content: center;
        `}
`;

function App() {
    return (
        <Background>
            <Router>
                <Switch>
                    <Route path="/" children={<LoginComponent />} />
                </Switch>
            </Router>
        </Background>
    );
}

export default App;
