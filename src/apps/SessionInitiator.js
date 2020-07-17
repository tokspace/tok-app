import React, { useMemo, useContext } from "react";
import { useParams } from "react-router-dom";
import { PeerConnection } from "../websockets/Connection";
import UserContext from "../contexts/UserContext";

export default () => {
    const user = useContext(UserContext);
    const { userId } = useParams();
    useMemo(() => new PeerConnection(user, true, userId), [user, userId]);
    return (
        <>
            {/* {audioStream && <audio autoPlay={true} src={audioStream}></audio>} */}
            <p>Starting a session with {userId}</p>
        </>
    );
};
