import React, { useState } from "react";
import { TextInput, Button } from "../components/Inputs";
import { Card } from "../styled/Card";
import { Link } from "react-router-dom";
import firebase from "firebase/app";

const LoginComponent = (props) => {
    const [email, setEmail] = useState("");
    const [pass, setPass] = useState("");

    return (
        <Card className="lt-card lt-shadow">
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
                label="Email"
                id="email"
                type="text"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
            />
            <TextInput
                label="Password"
                id="pass"
                type="password"
                value={pass}
                onChange={(e) => setPass(e.target.value)}
            />
            <Button
                className="lt-button lt-hover"
                onClick={() => {
                    firebase
                        .auth()
                        .signInWithEmailAndPassword(email, pass)
                        .catch((e) => {
                            alert(e.message);
                        });
                }}>
                Login
            </Button>
            <Link to="/register" className="subtext">
                Make an account
            </Link>
        </Card>
    );
};

export default LoginComponent;
