import React, { useEffect, useState } from "react";
import { Link, useParams, useHistory } from "react-router-dom";
import firebase from "firebase/app";
import { Button } from "../components/Inputs";

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
    }, []);

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
        <div>
            <h1>{office.Name}</h1>
            <ul>
                {office.Users.map((user) => (
                    <li key={user.user.id}>
                        <Link to={`/sessions/new-with-user/${user.user.id}`}>
                            {user.name}
                        </Link>
                    </li>
                ))}
            </ul>
            <Button onClick={signout}>Signout</Button>
        </div>
    );
}
