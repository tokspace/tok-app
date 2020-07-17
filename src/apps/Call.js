import React, { useMemo, useContext } from "react";
import Webcam from "react-webcam";
import UserContext from "../contexts/UserContext";
import { PeerConnection } from "../websockets/Connection";

const WebcamComponent = () => <Webcam />;

const Call = () => {
    const user = useContext(UserContext);
    useMemo(() => new PeerConnection(user), [user]);
    return null;
};

export default Call;
