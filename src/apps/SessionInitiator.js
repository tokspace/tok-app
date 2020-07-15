import React, { useContext, useMemo } from "react";
import { useParams } from "react-router-dom";
import Peer from "simple-peer";
import UserContext from "../contexts/UserContext";

export default function () {
    const { userId } = useParams();
    const user = useContext(UserContext);

    const ws = useMemo(() => new WebSocket("ws://localhost:8080"), []);
    const initiator = new Peer({ initiator: true });

    ws.onmessage = (ev) => {
        initiator.signal(JSON.parse(ev.data));
    };

    initiator.on("signal", (data) => {
        ws.addEventListener("open", (ev) => {
            ws.send(user.uid);
            ws.send(
                JSON.stringify({
                    data,
                    target: userId,
                }),
            );
        });
    });

    initiator.on("connect", (ev) => {
        console.debug("YO");
        initiator.send("YO WUT UP MY DOOD");
    });

    return <p>{ws.readyState}</p>;
}
