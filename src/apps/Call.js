import React, { useEffect, useRef } from "react";

const Call = ({ call }) => {
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
