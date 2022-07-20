// See the Electron documentation for details on how to use preload scripts:
// https://www.electronjs.org/docs/latest/tutorial/process-model#preload-scripts
const { ipcRenderer, contextBridge } = require("electron");

contextBridge.exposeInMainWorld("electron", {
  app: {
    close() {
      ipcRenderer.send("app-close");
    },
    minimize() {
      ipcRenderer.send("app-minimize");
    },
    reload() {
      ipcRenderer.send("app-reload");
    },
    devTools() {
      ipcRenderer.send("app-dev");
    },
    version: (arg) => ipcRenderer.invoke("app-version", arg),
  },
  // Channels for error logging from renderer
  log: {
    silly: (arg) => ipcRenderer.invoke("log-silly", arg),
    debug: (arg) => ipcRenderer.invoke("log-debug", arg),
    verbose: (arg) => ipcRenderer.invoke("log-verbose", arg),
    info: (arg) => ipcRenderer.invoke("log-info", arg),
    warn: (arg) => ipcRenderer.invoke("log-warn", arg),
    error: (arg) => ipcRenderer.invoke("log-error", arg),
    getPath: (arg) => ipcRenderer.invoke("log-path", arg),
  },
});
