import React, { useContext, useMemo } from "react";
import { useParams } from "react-router-dom";
import { PeerConnection } from "../websockets/Connection";
import UserContext from "../contexts/UserContext";

export default () => {
    const { userId } = useParams();
    const user = useContext(UserContext);

    useMemo(() => new PeerConnection(user, true, userId), [user, userId]);
    return (
        <>
            {/* {audioStream && <audio autoPlay={true} src={audioStream}></audio>} */}
            <p>Starting a session with {userId}</p>
        </>
    );
};
