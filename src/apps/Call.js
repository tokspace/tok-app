import React, { useEffect, useContext } from "react";
import Webcam from "react-webcam";
import UserContext from "../contexts/UserContext";
import { PeerConnection } from "../websockets/Connection";

const WebcamComponent = () => <Webcam />;

const Call = () => {
    const user = useContext(UserContext);
    // new PeerConnection(user)
    useEffect(() => {
        new PeerConnection(user);
    }, []);
    return null;
};

export default Call;
