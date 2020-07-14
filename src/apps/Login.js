import styled from "styled-components";
import React, { useState } from "react";
import { TextInput, Button } from "../components/Inputs";

const LoginCard = styled.div`
    font-family: Roboto Mono;
    width: 30vw;
    padding: 2em 2em;
    margin: auto;
    vertical-align: middle;
    text-align: center;
`;

const LoginComponent = (props) => {
    const [user, setUser] = useState("");
    const [pass, setPass] = useState("");

    return (
        <LoginCard className="lt-card lt-shadow">
            <img
                style={{
                    height: 64,
                }}
                alt={""}
                src={"tokspace.png"}
            />
            <h2>Login</h2>
            <p className="subtext">Welcome back to TokSpace.</p>
            <TextInput
                label="Username"
                id="user"
                type="text"
                value={user}
                onChange={(e) => setUser(e.target.value)}
            />
            <TextInput
                label="Password"
                id="pass"
                type="password"
                value={pass}
                onChange={(e) => setPass(e.target.value)}
            />
            <Button className="lt-button lt-hover">Login</Button>
        </LoginCard>
    );
};

export default LoginComponent;
