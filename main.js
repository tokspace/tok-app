const { app, BrowserWindow, ipcMain } = require("electron");
const psList = require("ps-list");

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
}

app.whenReady().then(createWindow);

// Listen for the front-end web app to send a request that asks for what
// processes are running on the user's machine.
ipcMain.handle("processesRequest", async () => psList());
