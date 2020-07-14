import styled from "styled-components";
import React, { useState } from "react";
import FloatingLabel from "./FloatingLabel";

const RelPositioning = styled.div`
    position: relative;
`;

const LoginCard = styled.div`
    font-family: Roboto Mono;
    width: 30vw;
    height: 50vh;
    position: absolute;
    padding: 2em 2em;
    margin: auto;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    vertical-align: middle;
`;

const Input = styled.input`
    width: calc(100% - 1.6em);
    font-family: "Roboto Mono", monospace;
    font-size: 0.8em;
    padding: calc(0.8em - 1px);
    outline: none;
    margin-top: 2em;
`;
const Button = styled.button`
    width: 100%;
    font-weight: 900;
    padding: calc(0.8em - 1px);
    margin-top: 2em;
    font-family: "Roboto Mono", monospace;
`;

const TextInput = (props) => {
    return (
        <RelPositioning>
            <FloatingLabel
                label={props.label}
                id={props.id}
                value={props.value}
            />
            <Input
                name={props.id}
                className="lt-shadow"
                placeholder={props.label}
                id={props.id}
                type={props.type}
                autoFocus
                autoComplete="off"
                onChange={props.onChange}
                value={props.value}
            />
        </RelPositioning>
    );
};

const LoginComponent = (props) => {
    const [user, setUser] = useState("");
    const [pass, setPass] = useState("");

    return (
        <div>
            <LoginCard className="lt-card lt-shadow">
                <h2>Login</h2>
                <p className="subtext">Welcome back to tokspace.</p>
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
        </div>
    );
};

export default LoginComponent;
