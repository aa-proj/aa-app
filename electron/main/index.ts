import {app, BrowserWindow} from 'electron'
import {release} from 'os'
import {autoUpdater} from "electron-updater"
import {registerUpdateEvent} from "./updater";
import {MainWindow} from "./mainWindow";
import {registerIpcHandler} from "./ipcHandler";

// Windows7はハードウェアアクセラレーションをオフにする
if (release().startsWith('6.1')) app.disableHardwareAcceleration()

// Set application name for Windows 10+ notifications
if (process.platform === 'win32') app.setAppUserModelId(app.getName())

if (!app.requestSingleInstanceLock()) {
  app.quit()
  process.exit(0)
}

let mainWindow: MainWindow | null = null

// ElectronがReadyの時 EntryPoint
app.on('ready', async function () {
  // IpcHandlerを登録
  registerIpcHandler()

  mainWindow = new MainWindow()

  // Update Check
  // 別に遅延させる意味はあんまりない
  setTimeout(() => {
    registerUpdateEvent()
    autoUpdater.checkForUpdates();
    mainWindow.log("AutoUpdater Initialized")
  }, 5000)

});

// TODO タスクトレイに入れたい
app.on('window-all-closed', () => {
  mainWindow.window = null
  if (process.platform !== 'darwin') app.quit()
})

app.on('second-instance', () => {
  if (mainWindow.window) {
    // Focus on the main window if the user tried to open another
    if (mainWindow.window.isMinimized()) mainWindow.window.restore()
    mainWindow.window.focus()
  }
})

app.on('activate', () => {
  // Mac用
  const allWindows = BrowserWindow.getAllWindows()
  if (allWindows.length) {
    allWindows[0].focus()
  } else {
    mainWindow = new MainWindow()
  }
})


export {mainWindow}

// New window example arg: new windows url
// ipcMain.handle('open-win', (event, arg) => {
//   const childWindow = new BrowserWindow({
//     webPreferences: {
//       preload,
//       nodeIntegration: true,
//       contextIsolation: false,
//     },
//   })
//
//   if (process.env.VITE_DEV_SERVER_URL) {
//     childWindow.loadURL(`${url}#${arg}`)
//   } else {
//     childWindow.loadFile(indexHtml, { hash: arg })
//   }
// })




