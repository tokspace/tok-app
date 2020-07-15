import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import firebase from "firebase/app";

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
    });

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
        </div>
    );
}
