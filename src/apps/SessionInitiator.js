import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Peer from "simple-peer";
import UserContext from "../contexts/UserContext";

export default function () {
    const { userId } = useParams();
    const user = useContext(UserContext);
    const [audioStream, setAudioStream] = useState(null);

    useEffect(function () {
        navigator.mediaDevices
            .getUserMedia({
                audio: true,
            })
            .then((stream) => {
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

                initiator.on("connect", function () {
                    console.log("initiator connect event listener fired");
                    console.debug("Connected");
                    window.initiator = initiator;
                    initiator.send("Hello Jacky!");
                });

                initiator.on("data", function (data) {
                    console.debug(data);
                });

                // initiator.on("stream", function (stream) {
                //     setAudioStream(stream);
                //     const audioContext = new AudioContext();
                //     const root = audioContext.createMediaStreamSource(stream);
                //     const analyser = audioContext.createAnalyser();

                //     root.connect(analyser)
                //     const frequencyData = new Uint8Array(analyser.frequencyBinCount);;
                //     analyser.getByteFrequencyData(frequencyData);
                //     console.debug(frequencyData);
                // });
            })
            .catch((err) => console.log(err));
    });
    return (
        <>
            {audioStream && <audio autoPlay={true} src={audioStream}></audio>}
            <p>Starting a session with {userId}</p>
        </>
    );
}
