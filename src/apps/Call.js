import React, { useMemo } from "react";
import Webcam from "react-webcam";
import { PeerConnection } from "../websockets/Connection";

const WebcamComponent = () => <Webcam />;

const Call = ({ user }) => {
    useMemo(() => new PeerConnection(user), [user]);
    return null;
};

export default Call;
