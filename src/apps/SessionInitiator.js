import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { PeerConnection } from "../websockets/Connection";
import UserContext from "../contexts/UserContext";
import Call from "./Call";
import { compare } from "semver";

export default function () {
    const { userId } = useParams();
    const user = useContext(UserContext);
    const [call, setCall] = useState(null);

    useEffect(
        function () {
            setCall(new PeerConnection(user, true, userId));
        },
        [user, userId],
    );

    return (
        <>
            {call && call.p && <Call call={call} />}
            <p>Starting a session with {userId}</p>
        </>
    );
}
