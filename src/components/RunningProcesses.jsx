import React, { useState } from "react";
const electron = window.require("electron");

const RunningProcesses = () => {
    const [runningProcesses, setRunningProcesses] = useState([""]);

    // handleRequestProcessesPress is called when a user clicks the "Request
    // Processes" button. This sends a message to the main Electron process.
    const handleRequestProcessesPress = () =>
        electron.ipcRenderer.send("processesRequest", null);

    // Handle messages from the main Electron process about what processes are
    // running on the user's machine. These messages from the main Electron
    // process will be sent in response to the "processesRequest" message being
    // sent by the front-end.
    electron.ipcRenderer.on("processesReply", (_event, arg) =>
        setRunningProcesses(arg),
    );

    return (
        <>
            <h2>Running Processes:</h2>
            {runningProcesses.map((process) => (
                <p>{process}</p>
            ))}
            <button onClick={handleRequestProcessesPress}>
                Request Processes
            </button>
        </>
    );
};

export default RunningProcesses;
