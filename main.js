const { app, BrowserWindow, ipcMain, remote } = require("electron");
const path = require("path");
const fs = require("fs");
const psList = require("ps-list");

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

class Store {
    // opts is an object with the following structure:
    //
    // {
    //   // The name of the file on local storage where user configs are stored.
    //   configName: string,
    //
    //   // Default user configs. To be used if something goes wrong reading the
    //   // local file on disk with these configs.
    //   defaults: {
    //     // Process names that the user has configred to set their
    //     // availability status to "away" when running.
    //     storedProcesses: [],
    //   },
    // }
    constructor(opts) {
        // Renderer process has to get `app` module via `remote`, whereas the
        // main process can get it directly.
        const userDataPath = (app || remote.app).getPath("userData");
        this.path = path.join(userDataPath, opts.configName + ".json");
        console.log(this.path);

        this.data = parseDataFile(this.path, opts.defaults);
    }

    get(key) {
        return this.data[key];
    }

    set(key, val) {
        this.data[key] = val;

        try {
            fs.writeFileSync(this.path, JSON.stringify(this.data));
        } catch (err) {
            // TODO: better error handling.
            console.error(err);
        }
    }
}

function parseDataFile(filePath, defaults) {
    try {
        return JSON.parse(fs.readFileSync(filePath));
    } catch (error) {
        return defaults;
    }
}

const store = new Store({
    configName: "user-configs",
    defaults: {
        storedProcesses: [],
    },
});

// Listen for the front-end web app to send a request that asks for what
// processes the user's already configured in the settings page.
ipcMain.handle("configuredProcessesRequest", () =>
    store.get("storedProcesses"),
);

// Listen for the front-end web app to push up new configured processes that the
// user has configured.
ipcMain.handle(
    "saveNewConfiguredProcesses",
    (_event, newConfiguredProcesses) => {
        store.set("storedProcesses", newConfiguredProcesses);
    },
);
