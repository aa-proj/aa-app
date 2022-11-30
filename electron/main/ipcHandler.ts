import {app, ipcMain} from 'electron'
import {mainWindow} from "./index";

const registerIpcHandler = () => {
  ipcMain.handle("test", (event, args) => {
    console.log("from renderer", args)
    return "OK from main"
  })

  ipcMain.handle("appQuit", (event, args) => {
    app.quit()
  })

  ipcMain.handle("openDebug",(event, args) => {
    mainWindow.window.webContents.openDevTools({mode: "detach"})
  })
}

export {registerIpcHandler}
