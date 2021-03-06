const {
  app,
  BrowserWindow,
  protocol,
  ipcMain,
  clipboard,
} = require("electron");
const path = require("path");
const { versions } = require("node:process");
const {
  sillyLogger,
  debugLogger,
  verboseLogger,
  infoLogger,
  warnLogger,
  errorLogger,
  getFilePath,
} = require("./logging");

// Handle creating/removing shortcuts on Windows when installing/uninstalling.
// eslint-disable-next-line global-require
if (require("electron-squirrel-startup")) {
  app.quit();
}

const createWindow = () => {
  // Create the browser window.
  const mainWindow = new BrowserWindow({
    frame: false,
    width: 300,
    height: 600,
    resizable: false,
    webPreferences: {
      preload: MAIN_WINDOW_PRELOAD_WEBPACK_ENTRY,
      preload: MAIN_WINDOW_PRELOAD_WEBPACK_ENTRY,
      nodeIntegration: true,
      webSecurity: false,
      allowRunningInsecureContent: true,
      worldSafeExecuteJavaScript: true,
      contextIsolation: true,
    },
  });

  // and load the index.html of the app.
  mainWindow.loadURL(MAIN_WINDOW_WEBPACK_ENTRY);

  // Open the DevTools.
  mainWindow.webContents.openDevTools({ mode: "detach" });

  // Closes app
  ipcMain.on("app-close", () => {
    mainWindow.close();
  });

  // Minimize app
  ipcMain.on("app-minimize", () => {
    mainWindow.minimize();
  });

  // Minimize app
  ipcMain.on("app-reload", () => {
    mainWindow.reload();
  });

  // Open dev tools
  ipcMain.on("app-dev", () => {
    mainWindow.webContents.openDevTools({ mode: "undocked" });
  });

  // Returns version info
  ipcMain.handle("app-version", async (event, arg) => {
    return versions;
  });

  // Handling error in rendered. Writes to file using electron-log
  ipcMain.handle("log-silly", (_, arg) => {
    sillyLogger(arg);
    return { status: "success", message: "Error logged", severity: "silly" };
  });
  ipcMain.handle("log-debug", (_, arg) => {
    debugLogger(arg);
    return { status: "success", message: "Error logged", severity: "debug" };
  });
  ipcMain.handle("log-verbose", (_, arg) => {
    verboseLogger(arg);
    return { status: "success", message: "Error logged", severity: "verbose" };
  });
  ipcMain.handle("log-info", (_, arg) => {
    infoLogger(arg);
    return { status: "success", message: "Error logged", severity: "info" };
  });
  ipcMain.handle("log-warn", (_, arg) => {
    warnLogger(arg);
    return { status: "success", message: "Error logged", severity: "warn" };
  });
  ipcMain.handle("log-error", (_, arg) => {
    errorLogger(arg);
    return { status: "success", message: "Error logged", severity: "error" };
  });
  ipcMain.handle("log-path", (_, arg) => {
    return getFilePath();
  });
};

protocol.registerSchemesAsPrivileged([
  {
    scheme: "http",
    privileges: {
      standard: true,
      bypassCSP: true,
      allowServiceWorkers: true,
      supportFetchAPI: true,
      corsEnabled: true,
      stream: true,
    },
  },
  {
    scheme: "https",
    privileges: {
      standard: true,
      bypassCSP: true,
      allowServiceWorkers: true,
      supportFetchAPI: true,
      corsEnabled: true,
      stream: true,
    },
  },
  { scheme: "mailto", privileges: { standard: true } },
]);

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on("ready", createWindow);

app.commandLine.appendSwitch("ignore-certificate-errors");

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});

app.on("activate", () => {
  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and import them here.
