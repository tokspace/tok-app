import React, { useState } from "react";
import { TextInput, Button } from "../components/Inputs";
import { Card } from "../styled/Card";
import { Link, useHistory } from "react-router-dom";
import firebase from "firebase/app";

const RegistrationComponent = () => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [pass, setPass] = useState("");
    const [confirmPass, setConfirmPass] = useState("");

    const history = useHistory();

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
                        .then(({ user }) => {
                            const db = firebase.firestore();

                            const write = db.batch();

                            let userRef = db.doc(`Users/${user.uid}`);
                            write.set(userRef, {
                                name,
                                email,
                                offices: [
                                    {
                                        name: "TokSpace",
                                        office: firebase
                                            .firestore()
                                            .doc(
                                                `Offices/3mfArDn3ejO0oVQDwTdJ`,
                                            ),
                                    },
                                ],
                            });

                            write.update(
                                db.doc(`Offices/3mfArDn3ejO0oVQDwTdJ`),
                                {
                                    Users: firebase.firestore.FieldValue.arrayUnion(
                                        {
                                            name,
                                            user: userRef,
                                        },
                                    ),
                                },
                            );

                            write.commit().then(() => {
                                alert("Your profile was created successfully");
                                history.push("/");
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
