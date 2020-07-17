import React, { useEffect, useState } from "react";
import { Link, useParams, useHistory } from "react-router-dom";
import firebase from "firebase/app";
import { Button } from "../components/Inputs";
import { Card } from "../styled/Card";

export default function () {
    const { officeId } = useParams();
    const [office, setOfficeState] = useState({
        Name: "Name",
        Sessions: [],
        Users: [],
    });

    useEffect(() => {
        return firebase
            .firestore()
            .doc(`Offices/${officeId}`)
            .onSnapshot((snapshot) => {
                setOfficeState(snapshot.data());
            });
    }, [officeId]);

    const history = useHistory();
    const signout = () => {
        firebase
            .auth()
            .signOut()
            .then(() => {
                history.push("/");
            });
    };

    return (
        <Card className="lt-card lt-shadow">
            <div class="Office">
                <p className="lt-card lt-hover text-align:left">
                    <b>Office Name{office.Name}</b>
                    <Button className="lt-button lt-hover  --lt-colours-lightgray: #f0f0f0">
                        Leave
                    </Button>
                </p>
            </div>

            <div class="Desk">
                <p className="lt-card lt-hover text-align:left">
                    <ul>
                        {office.Users.map((user) => (
                            <li key={user.user.id}>
                                <Link
                                    to={`/sessions/new-with-user/${user.user.id}`}>
                                    {user.name}
                                </Link>
                            </li>
                        ))}
                    </ul>
                    <Button
                        to="/"
                        className="lt-button lt-hover  --lt-colours-secondary: #84a59d"
                        onClick={signout}>
                        Pull Up
                    </Button>{" "}
                </p>
            </div>
        </Card>
    );
}
