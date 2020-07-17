import React, { useEffect, useState, useContext } from "react";
import UserContext from "../contexts/UserContext";
import CallContext from "../contexts/CallContext";
import { Link, useParams, useHistory } from "react-router-dom";
import firebase from "firebase/app";
import { Button, SecondaryButton } from "../components/Inputs";
import { Card } from "../styled/Card";
import styled from "styled-components";

const Desk = styled.div`
    display: flex;
    align-items: center;
    padding: 8px;
`;

export default () => {
    const user = useContext(UserContext);
    const call = useContext(CallContext);
    const { officeId } = useParams();
    const [office, setOfficeState] = useState({
        Name: "Name",
        Sessions: [],
        Users: [],
    });

    function setIsOnline(isOnline) {
        return firebase
            .firestore()
            .doc(`Offices/${officeId}`)
            .update({
                [`users.${user.uid}.isOnline`]: isOnline,
            });
    }

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
        call.close();
        firebase
            .auth()
            .signOut()
            .then(() => {
                history.push("/");
            });
    };
    const onlineUsers = office.Users.filter(
        (callee) => callee.user.id !== user.uid && callee.isOnline,
    );

    return (
        <Card className="lt-card">
            <h1>
                <b>{office.Name}</b>
            </h1>
            <Button
                className="lt-button"
                onClick={() => {
                    setIsOnline(false);
                    setTimeout(() => setIsOnline(true), 1000 * 60 * 60);
                }}>
                Step Away for 1 hr
            </Button>
            <h2>Logged in as {user.tokProfile.name}</h2>
            {onlineUsers.map((callee) => (
                <Desk className="lt-card">
                    <h3 style={{ flexGrow: 1 }}>{callee.name}</h3>
                    <Link
                        to={`/sessions/new-with-user/${callee.user.id}`}
                        className="lt-button nomrgn">
                        Pull Up
                    </Link>
                </Desk>
            ))}
            {onlineUsers.length === 0 && <p>Nobody is available right now</p>}
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
};
