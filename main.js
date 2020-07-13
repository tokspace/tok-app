const { app, BrowserWindow } = require('electron')

function createWindow () {
  // Create the browser window.
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
        contextIsolation: true,
    },
    icon: "tokspace.png",
    title: "Tokspace"
  });

  // and load the index.html of the app.
  win.loadURL("http://localhost:3000");
}

app.whenReady().then(createWindow);