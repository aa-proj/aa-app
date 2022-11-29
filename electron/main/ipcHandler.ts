import {app, ipcMain} from 'electron'

const registerIpcHandler = () => {
  ipcMain.handle("test", (event, args) => {
    console.log("from renderer", args)
    return "OK from main"
  })

  ipcMain.handle("appQuit", (event, args) => {
    app.quit()
  })
}

export {registerIpcHandler}
