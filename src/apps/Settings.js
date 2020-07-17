import React, { useState, useEffect } from "react";
import { Card } from "../styled/Card";

const Settings = () => {
    const [storedProcesses, setStoredProcesses] = useState([""]);
    // const [runningProcesses, setRunningProcesses] = useState([""]);

    useEffect(() => {
        // Fetch configured processes from local storage.
        //
        // We shouldn't have problems with race conditions by doing this because
        // no one else is interested in these data. This is still disgusting and
        // I'm really sorry.
        async function fetchProcessesOnDisk() {
            const loadedProcesses = await ipcRenderer.invoke(
                "configuredProcessesRequest",
                null,
            );
            setStoredProcesses(loadedProcesses);
            console.log(loadedProcesses);
        }
        fetchProcessesOnDisk();
    }, []);

    // TODO: write a button handler which asks for all running processes.

    return (
        <Card className="lt-card lt-shadow">
            <h2>Settings</h2>
            <h3>Availability Status</h3>
            {storedProcesses.map((process) => (
                <p>{process}</p>
            ))}
            <p className="subtext">
                Add a new one! Dropdown will live here soon.
            </p>
        </Card>
    );
};

export default Settings;
