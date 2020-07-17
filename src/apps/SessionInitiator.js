import React, { useContext, useEffect } from "react";
import { useParams } from "react-router-dom";
import { PeerConnection } from "../websockets/Connection";
import UserContext from "../contexts/UserContext";

export default function () {
    const { userId } = useParams();
    const user = useContext(UserContext);

    useEffect(function () {
        new PeerConnection(user, true, userId);
    });

    return (
        <>
            <p>Starting a session with {userId}</p>
        </>
    );
}
