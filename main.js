const { app, BrowserWindow, ipcMain } = require("electron");
const psList = require("ps-list");

const { session } = require("electron");

function createWindow() {
    // Create the browser window.
    const win = new BrowserWindow({
        width: 800,
        height: 900,
        titleBarStyle: "hiddenInset",
        webPreferences: {
            preload: __dirname + "/preload.js",
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
