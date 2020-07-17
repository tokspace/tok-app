import Peer from "simple-peer";

export function NewPeer(user, isInitiator = false, target = undefined) {
    // get video/audio
    navigator.mediaDevices
        .getUserMedia({
            video: true,
            audio: true,
        })
        .then((stream) => {
            const ws = new WebSocket(
                "ws://ec2-54-197-132-43.compute-1.amazonaws.com:8080/",
            );
            let p;

            let from;
            ws.onmessage = (event) => {
                const data = JSON.parse(event.data);
                from = data.origin;
                p.signal(data.data);
            };

            ws.onopen = () => {
                if (isInitiator) {
                    console.log("initiating connection as initiator");
                    ws.send(user.uid);
                    p = new Peer({ initiator: isInitiator, stream });
                    p.on("signal", (data) => {
                        const payload = {
                            target: target,
                            data: data,
                        };
                        console.log(`signalling to ${target}`);
                        ws.send(JSON.stringify(payload));
                    });
                    // can use this for chat or something
                    p.on("connect", () => {
                        console.log("initiator connect event listener fired");
                        p.send("yeeeet");
                    });
                } else {
                    console.log("initiating connection as listener");
                    ws.send(user.uid);
                    p.on("signal", (data) => {
                        console.log(`signaling back to ${from}...`);
                        const resultPayload = {
                            target: from,
                            data: data,
                        };
                        ws.send(JSON.stringify(resultPayload));
                    });
                }

                p.on("data", (data) => {
                    console.log(`got some response: ${data}`);
                });

                // video/audio calling
                p.on("stream", (stream) => {
                    console.log("some streaming shit yeeee");
                    // // got remote video stream, now let's show it in a video tag
                    // var video = document.querySelector('video')

                    // if ('srcObject' in video) {
                    //     video.srcObject = stream
                    // } else {
                    //     video.src = window.URL.createObjectURL(stream) // for older browsers
                    // }

                    // video.play()
                });
            };
        })
        .catch((e) => {
            // swallow error
        });
}
