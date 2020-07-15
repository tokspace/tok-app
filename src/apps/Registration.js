import React, { useState } from "react";
import { TextInput, Button } from "../components/Inputs";
import { Card } from "../styled/Card";
import { Link } from "react-router-dom";
import firebase from "firebase";
import writeData from "../index.js";

const RegistrationComponent = (props) => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [pass, setPass] = useState("");
    const [confirmPass, setConfirmPass] = useState("");

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
            <Button
                className="lt-button lt-hover"
                onClick={() => {
                    firebase
                        .auth()
                        .createUserWithEmailAndPassword(email, pass)
                        .then((user) => {
                            writeData();
                            const docRef = firebase
                                .firestore()
                                .collection("Users")
                                .doc();
                            docRef.set({
                                Name: document.getElementById("name").value,
                                Email: document.getElementById("email").value,
                            });
                        })
                        .catch((e) => {
                            alert(e.message);
                        });
                }}>
                Register
            </Button>
            <Link to="/" className="subtext">
                Have an account? Login
            </Link>
        </Card>
    );
};

export default RegistrationComponent;
