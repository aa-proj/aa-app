import {app, ipcMain} from 'electron'
import {mainWindow, store} from "./index";

const registerIpcHandler = () => {
  ipcMain.handle("test", (event, args) => {
    console.log("from renderer", args)
    return "OK from main"
  })

  ipcMain.handle("appQuit", (event, args) => {
    mainWindow.window.close()
    // app.quit()
  })

  ipcMain.handle("openDebug",(event, args) => {
    mainWindow.window.webContents.openDevTools({mode: "detach"})
  })

  ipcMain.handle("appVersion",(event, args) => {
    return app.getVersion()
  })

  ipcMain.handle("getStore",(event, args) => {
    return store.get(args)
  })

}

export {registerIpcHandler}
