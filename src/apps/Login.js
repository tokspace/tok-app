import React, { useState } from "react";
import { TextInput, Button } from "../components/Inputs";
import { Card } from "../styled/Card";
import { BrowserRouter as Link } from "react-router-dom";

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
            <Link to="/register">Make an account.</Link>
            <Button className="lt-button lt-hover">Login</Button>
        </Card>
    );
};

export default LoginComponent;
