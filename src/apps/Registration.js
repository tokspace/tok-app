import React, { useState } from "react";
import { TextInput, Button } from "../components/Inputs";
import { Card } from "../styled/Card";
import { Link } from "react-router-dom";
import ErrorMessage from "../components/ErrorMessage";
import firebase from "firebase";

const RegistrationComponent = (props) => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [pass, setPass] = useState("");
    const [confirmPass, setConfirmPass] = useState("");
    const [errMsg, setErrMsg] = useState("");

    const validateForm = () => {
        // pass length
        if (pass.length < 6) {
            setErrMsg("Password must be > 6 characters");
            return;
        }

        // passes equal
        if (pass !== confirmPass) {
            setErrMsg("Passwords aren't the same");
            return;
        }

        // email validation
        const re = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w+)+$/;
        if (!re.test(email)) {
            setErrMsg("Email is invalid");
            return;
        }

        // name validation
        if (name.trim() === "") {
            setErrMsg("Name cannot be empty");
            return;
        }

        firebase
            .auth()
            .createUserWithEmailAndPassword(email, pass)
            .then((user) => {
                alert("This is where Yashika works her magick");
            })
            .catch((e) => {
                setErrMsg(e.message);
            });
    };

    return (
        <Card className="lt-card lt-shadow">
            <img
                style={{
                    height: 64,
                }}
                alt={""}
                src={"tokspace.png"}
            />
            <h2>Register</h2>
            <p className="subtext">Tokspace: a platform for collaboration.</p>
            <TextInput
                label="Display Name"
                id="name"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
            />
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
            <TextInput
                label="Confirm Password"
                id="confirmPass"
                type="password"
                value={confirmPass}
                onChange={(e) => setConfirmPass(e.target.value)}
            />
            <Button className="lt-button lt-hover" onClick={validateForm}>
                Register
            </Button>
            <Link to="/" className="subtext">
                Have an account? Login
            </Link>
            <ErrorMessage
                message={errMsg}
                timeout={3000}
                setMessage={setErrMsg}
            />
        </Card>
    );
};

export default RegistrationComponent;
