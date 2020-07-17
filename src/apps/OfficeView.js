import React, { useEffect, useState, useContext } from "react";
import UserContext from "../contexts/UserContext";
import { Link, useParams, useHistory } from "react-router-dom";
import firebase from "firebase/app";
import { Button, SecondaryButton } from "../components/Inputs";
import { Card } from "../styled/Card";

export default function () {
    const user = useContext(UserContext);
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
        <Card>
            <h1>{office.Name}</h1>
            <h2>Logged in as {user.tokProfile.name}</h2>
            <ul>
                {office.Users.filter(
                    (callee) => callee.user.id !== user.uid,
                ).map((callee) => (
                    <li key={callee.user.id}>
                        <Link to={`/sessions/new-with-user/${callee.user.id}`}>
                            {callee.name}
                        </Link>
                    </li>
                ))}
            </ul>
            <Button to="/" className="lt-button lt-hover" onClick={signout}>
                Signout
            </Button>
            <SecondaryButton
                to="/settings"
                className="lt-button lt-hover"
                onClick={() => history.push("/settings")}>
                Settings
            </SecondaryButton>
        </Card>
    );
}
