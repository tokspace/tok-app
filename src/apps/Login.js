import React, { useState, useEffect } from "react";
import { TextInput, Button } from "../components/Inputs";
import { Card } from "../styled/Card";
import { Link } from "react-router-dom";
import firebase from "firebase/app";
import ErrorMessage from "../components/ErrorMessage";

const LoginComponent = (props) => {
    const [email, setEmail] = useState("");
    const [pass, setPass] = useState("");
    const [errMsg, setErrMsg] = useState("");

    const validateForm = (e) => {
        e.preventDefault();
        if (pass.length < 6) {
            setErrMsg("Password must be > 6 characters");
            return;
        }

        firebase
            .auth()
            .signInWithEmailAndPassword(email, pass)
            .catch((e) => {
                setErrMsg(e.message);
            });
    };

    return (
        <Card className="lt-card lt-shadow">
            <form onSubmit={validateForm}>
                <img
                    style={{
                        height: 64,
                    }}
                    alt={""}
                    src={"/tokspace.png"}
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
                <Button className="lt-button lt-hover">Login</Button>
                <Link to="/register" className="subtext">
                    Make an account
                </Link>
                <ErrorMessage
                    message={errMsg}
                    timeout={3000}
                    setMessage={setErrMsg}
                />
            </form>
        </Card>
    );
};

export default LoginComponent;
