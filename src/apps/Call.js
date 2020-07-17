import React from "react";
import Webcam from "react-webcam";
import { PeerConnection } from "../websockets/Connection";

const WebcamComponent = () => <Webcam />;

const Call = ({ user }) => {
    new PeerConnection(user);
    return null;
};

export default Call;
