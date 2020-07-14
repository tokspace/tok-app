const { app, BrowserWindow, ipcMain } = require("electron");

function createWindow() {
    // Create the browser window.
    const win = new BrowserWindow({
        width: 800,
        height: 900,
        webPreferences: {
            nodeIntegration: true,
        },
        icon: "tokspace.png",
        title: "TokSpace",
    });

    // and load the index.html of the app.
    win.loadURL("http://localhost:3000");

    // Listen for the front-end web app to send a request that asks for what
    // processes are running on the user's machine.
    ipcMain.on("processesRequest", (event, _arg) =>
        // TODO: use node's APIs to find all running processes.
        // For now, we'll just send a dummy list of fake process names.
        event.reply("processesReply", ["spotify", "mail", "safari"]),
    );
}

app.whenReady().then(createWindow);
