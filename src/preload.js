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
  },
});
