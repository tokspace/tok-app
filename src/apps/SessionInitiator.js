import React, { useContext, useMemo, useEffect } from "react";
import { useParams } from "react-router-dom";
import Peer from "simple-peer";
import UserContext from "../contexts/UserContext";

export default function () {
    const { userId } = useParams();
    const user = useContext(UserContext);

    useEffect(function () {
        const webSocket = new WebSocket("ws://c90a1c436877.ngrok.io");
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

        initiator.on("connect", function () {
            console.log("initiator connect event listener fired");
            console.debug("Connected");
            initiator.send("Hello Jacky!");
        });
    });
    return <p>Starting a session with {userId}</p>;
}
