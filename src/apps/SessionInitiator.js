import React, { useContext, useMemo } from "react";
import { useParams } from "react-router-dom";
import Peer from "simple-peer";
import UserContext from "../contexts/UserContext";

export default function () {
    const { userId } = useParams();
    const user = useContext(UserContext);

    const ws = useMemo(() => new WebSocket("ws://aff644e2496a.ngrok.io/"), []);
    const initiator = new Peer({ initiator: true });

    ws.onmessage = (ev) => {
        // console.log(ev.data)
        // console.log(JSON.parse(ev.data))
        initiator.signal(JSON.parse(ev.data));
    };

    ws.addEventListener("open", (ev) => {
        ws.send(user.uid);
    });

    initiator.on("signal", (data) => {
        ws.addEventListener("open", (ev) => {
            // console.log(data)
            ws.send(
                JSON.stringify({
                    ...data,
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
