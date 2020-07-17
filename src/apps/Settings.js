import React, { useState, useEffect } from "react";
import { Card } from "../styled/Card";
import { Button } from "../components/Inputs";

const Settings = () => {
    const [storedProcesses, setStoredProcesses] = useState([""]);
    const [runningProcesses, setRunningProcesses] = useState([]);
    const [newProcessToAdd, setNewProcessToAdd] = useState("");

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

    const handleChooseANewProcess = async () => {
        let processesList = await ipcRenderer.invoke("processesRequest", null);
        processesList = processesList.map(
            (process) => `${process.name} (PID: ${process.pid})`,
        );
        setRunningProcesses(processesList);
    };

    const handleNewProcessPress = async () => {
        // This assumes that the write to disk goes according to plan...
        // oh well :)
        await ipcRenderer.invoke("saveNewConfiguredProcesses", [
            ...storedProcesses,
            newProcessToAdd,
        ]);
        setStoredProcesses([...storedProcesses, newProcessToAdd]);
    };

    return (
        <Card className="lt-card lt-shadow">
            <h2>Settings</h2>
            <h3>Configured Processes</h3>
            {storedProcesses.map((process) => (
                <p key={process}>{process}</p>
            ))}
            {runningProcesses.length <= 0 && (
                <Button
                    className="lt-button lt-hover"
                    onClick={async () => await handleChooseANewProcess()}>
                    Add a New Process
                </Button>
            )}
            {runningProcesses.length > 0 && (
                <>
                    <select
                        value={newProcessToAdd}
                        onChange={(e) => setNewProcessToAdd(e.target.value)}>
                        {runningProcesses.map((process) => (
                            <option key={process}>{process}</option>
                        ))}
                    </select>
                    <Button
                        className="lt-button lt-hover"
                        onClick={async () => await handleNewProcessPress()}>
                        Add
                    </Button>
                </>
            )}
        </Card>
    );
};

export default Settings;
