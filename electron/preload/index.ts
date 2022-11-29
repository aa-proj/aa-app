import { contextBridge, ipcRenderer } from "electron";

contextBridge.exposeInMainWorld("api", {
  invoke: (channel: string, args: any) => {
    return ipcRenderer.invoke(channel, args);
  },
  on: (channel, func) => { // メインプロセスからの受信用
    ipcRenderer.on(channel, (event, ...args) => func(...args));
  }
});
