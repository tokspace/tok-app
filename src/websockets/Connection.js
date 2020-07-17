import Peer from "simple-peer";
import firebase from "firebase/app";

export class PeerConnection {
    constructor(user, isInitiator = false, targetUser = undefined) {
        this.user = user;
        this.isInitiator = isInitiator;
        this.targetUser = targetUser;
        this.ws = new WebSocket(
            "ws://ec2-54-197-132-43.compute-1.amazonaws.com:8080/",
        );

        navigator.mediaDevices
            .getUserMedia({
                video: true,
                audio: true,
            })
            .then((stream) => {
                this.ws.onmessage = (event) => {
                    const data = JSON.parse(event.data);
                    this.from = data.origin;
                    this.p.signal(data.data);
                };

                this.ws.onopen = () => {
                    console.log("???");
                    this.p = new Peer({ initiator: isInitiator, stream });
                    // setIsOnline(user, true)
                    this.isInitiator
                        ? this.setupInitiator()
                        : this.setupListener();

                    this.setupCommon();
                };
            })
            .catch((e) => {
                // swallow error
            });
    }

    setupInitiator() {
        console.log("initiating connection as initiator");
        this.ws.send(this.user.uid);
        this.p.on("signal", (data) => {
            const payload = {
                target: this.targetUser,
                data: data,
            };
            console.log(`signalling to ${this.targetUser}`);
            this.ws.send(JSON.stringify(payload));
        });

        // can use this for chat or something
        this.p.on("connect", () => {
            console.log("initiator connect event listener fired");
            this.p.send("yeeeet");
        });
    }

    setupListener() {
        console.log("initiating connection as listener");
        this.ws.send(this.user.uid);
        this.p.on("signal", (data) => {
            console.log(`signaling back to ${this.from}...`);
            const resultPayload = {
                target: this.from,
                data: data,
            };
            this.ws.send(JSON.stringify(resultPayload));
        });
    }

    setupCommon() {
        this.p.on("data", (data) => {
            console.log(`got some response: ${data}`);
        });

        // video calling
        this.p.on("stream", (stream) => {
            console.log("some streaming shit yeeee");

            setIsCalling(this.user, true);
            // TODO: implement
        });

        // audio calling
        this.p.on("track", (track, stream) => {
            // TODO: implement
        });

        this.p.on("close", () => {
            // TODO: handle this
        });

        this.p.on("error", () => {
            // TODO: handle this
        });
    }
}

function setIsCalling(user, isCalling) {
    firebase.firestore().doc(`Users/${user.uid}`).update({
        isCalling: isCalling,
    });
}

function setIsOnline(user, isOnline) {
    firebase.firestore().doc(`Users/${user.uid}`).update({
        isOnline: isOnline,
    });
}

// export function NewPeer(user, isInitiator = false, target = undefined) {
//     // get video/audio
//     navigator.mediaDevices
//         .getUserMedia({
//             video: true,
//             audio: true,
//         })
//         .then((stream) => {
//             const ws = new WebSocket(
//                 "ws://ec2-54-197-132-43.compute-1.amazonaws.com:8080/",
//             );

//             let p;
//             let from;
//             ws.onmessage = (event) => {
//                 const data = JSON.parse(event.data);
//                 from = data.origin;
//                 p.signal(data.data);
//             };

//             ws.onopen = () => {
//                 p = new SimplePeer({ initiator: isInitiator, stream });
//                 setIsOnline(user, true)

//                 if (isInitiator) {
//                     console.log("initiating connection as initiator");
//                     ws.send(user.uid);
//                     p.on("signal", (data) => {
//                         const payload = {
//                             target: target,
//                             data: data,
//                         };
//                         console.log(`signalling to ${target}`);
//                         ws.send(JSON.stringify(payload));
//                     });
//                     // can use this for chat or something
//                     p.on("connect", () => {
//                         console.log("initiator connect event listener fired");
//                         p.send("yeeeet");
//                     });
//                 } else {
//                     console.log("initiating connection as listener");
//                     ws.send(user.uid);
//                     p.on("signal", (data) => {
//                         console.log(`signaling back to ${from}...`);
//                         const resultPayload = {
//                             target: from,
//                             data: data,
//                         };
//                         ws.send(JSON.stringify(resultPayload));
//                     });
//                 }

//                 p.on("data", (data) => {
//                     console.log(`got some response: ${data}`);
//                 });

//                 // video calling
//                 p.on("stream", (stream) => {
//                     console.log("some streaming shit yeeee");

//                     setIsCalling(user, true)
//                     // TODO: implement
//                 });

//                 // audio calling
//                 p.on("track", (track, stream) => {
//                     // TODO: implement
//                 })

//                 p.on("close", () => {
//                     // TODO: handle this
//                 })

//                 p.on("error", () => {
//                     // TODO: handle this
//                 })
//             };
//         })
//         .catch((e) => {
//             // swallow error
//         });
// }
