import Peer from "simple-peer";
import firebase from "firebase/app";

export class PeerConnection {
    constructor(user, isInitiator = false, targetUser = undefined) {
        this.user = user;
        this.isInitiator = isInitiator;
        this.targetUser = targetUser;
        this.stream = null;

        this.ws = new WebSocket(
            "ws://ec2-54-197-132-43.compute-1.amazonaws.com:8080/",
        );
        this.ws.onopen = () => {
            this.ws.onmessage = (event) => {
                const data = JSON.parse(event.data);
                this.from = data.origin;
                this.p.signal(data.data);
            };
            this.p = new Peer({ initiator: isInitiator });
            this.isInitiator ? this.setupInitiator() : this.setupListener();

            this.setupCommon();
        };
    }

    close() {
        console.log("cleaning up sockets...");
        this.ws.close();
        this.p.destroy();
    }

    setupInitiator() {
        console.log("initiating connection as initiator");
        this.ws.send(this.user.uid);
        navigator.mediaDevices
            .getUserMedia({
                audio: true,
                video: true,
            })
            .then((stream) => this.p.addStream(stream))
            .catch((err) => alert(err.message));

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
        this.p.on("connect", () => {
            navigator.mediaDevices
                .getUserMedia({
                    audio: true,
                    video: false,
                })
                .then(this.p.addStream)
                .catch((err) => alert(err.message));
        });
    }

    setupCommon() {
        this.p.on("data", (data) => {
            console.log(`got some response: ${data}`);
        });

        // video calling
        this.p.on("stream", (stream) => {
            setIsCalling(this.user, true);
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

export function setIsOnline(user, isOnline) {
    firebase.firestore().doc(`Users/${user.uid}`).update({
        isOnline: isOnline,
    });
}
