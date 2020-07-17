import React, { useContext } from "react";
import { useParams } from "react-router-dom";
import { PeerConnection } from "../websockets/Connection";
import UserContext from "../contexts/UserContext";

export default function () {
    const { userId } = useParams();
    const user = useContext(UserContext);

    new PeerConnection(user, true, userId);
    return (
        <>
            {/* {audioStream && <audio autoPlay={true} src={audioStream}></audio>} */}
            <p>Starting a session with {userId}</p>
        </>
    );
}
