import React, { useContext, useEffect, useRef } from "react";
import CallContext from "../contexts/CallContext";

const Call = () => {
    const call = useContext(CallContext);
    const videoRef = useRef();

    useEffect(() => {
        call.p.on("stream", (stream) => {
            console.debug(stream);
            videoRef.current.srcObject = stream;
        });
    }, [call]);

    return <video ref={videoRef} autoPlay={true}></video>;
};

export default Call;
