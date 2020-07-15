import React, { useState } from "react";

const RunningProcesses = () => {
    const [runningProcesses, setRunningProcesses] = useState([""]);

    // handleRequestProcessesPress is called when a user clicks the "Request
    // Processes" button. This sends a message to the main Electron process, and
    // formats the response into something fit for displaying to the user.
    const handleRequestProcessesPress = async () => {
        let processesList = await ipcRenderer.invoke("processesRequest", null);
        processesList = processesList.map(
            (process) => `${process.name} (PID: ${process.pid})`,
        );
        setRunningProcesses(processesList);
    };

    // Handle messages from the main Electron process about what processes are
    // running on the user's machine. These messages from the main Electron
    // process will be sent in response to the "processesRequest" message being
    // sent by the front-end.
    // electron.ipcRenderer.on("processesReply", (_event, arg) =>
    //     setRunningProcesses(arg),
    // );

    return (
        <>
            <h2>Running Processes:</h2>
            {runningProcesses.map((process) => (
                <p>{process}</p>
            ))}
            <button onClick={async () => await handleRequestProcessesPress()}>
                Request Processes
            </button>
        </>
    );
};

export default RunningProcesses;
