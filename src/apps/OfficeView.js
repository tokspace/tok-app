import React, { useEffect, useState, useContext } from "react";
import UserContext from "../contexts/UserContext";
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

export default ({ call }) => {
    const user = useContext(UserContext);
    const { officeId } = useParams();
    const [office, setOfficeState] = useState({
        Name: "",
        Sessions: [],
        Users: {},
    });

    // initial state setup
    setIsOnline(true);

    function setIsOnline(isOnline) {
        console.log(office);
        const db = firebase.firestore();
        const write = db.batch();
        write.update(db.doc(`Offices/${officeId}`), {
            [`Users.${user.uid}.isOnline`]: isOnline,
        });
        write
            .commit()
            .then(() => {
                // console.log(office.Users[user.uid])
            })
            .catch((e) => {
                console.log(`e: ${e}`);
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
                setIsOnline(false);
                history.push("/");
            });
    };

    const onlineUsers = Object.keys(office.Users)
        .map((e) => {
            const u = office.Users[e];
            u.uid = e;
            return u;
        })
        .filter((callee) => callee.uid !== user.uid);

    const isOnline = office.Users[user.uid] && office.Users[user.uid].isOnline;
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
            <p>Status: {isOnline ? "Online" : "Busy"}</p>
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
