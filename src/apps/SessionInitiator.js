import React, { useContext, useMemo, useEffect } from "react";
import { useParams } from "react-router-dom";
import Peer from "simple-peer";
import UserContext from "../contexts/UserContext";

export default function () {
    const { userId } = useParams();
    const user = useContext(UserContext);

    useEffect(function () {
        const webSocket = new WebSocket("ws://localhost:8080");
        const initiator = new Peer({ initiator: true });

        webSocket.addEventListener("open", function () {
            webSocket.send(user.uid);
            initiator.on("signal", function (data) {
                console.debug(data);
                const message = Object.assign(data, {
                    target: userId,
                });
                webSocket.send(JSON.stringify(message));
            });
        });

        webSocket.addEventListener("message", function (ev) {
            const data = JSON.parse(ev.data);
            console.debug(data);
            initiator.signal(data);
        });
    });
    return <p>Starting a session with {userId}</p>;
}
