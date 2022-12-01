import { app, BrowserWindow, shell, ipcMain, dialog } from 'electron'
import {join} from "path";

process.env.DIST_ELECTRON = join(__dirname, '..')
process.env.DIST = join(process.env.DIST_ELECTRON, '../dist')
process.env.PUBLIC = app.isPackaged ? process.env.DIST : join(process.env.DIST_ELECTRON, '../public')


const preload = join(__dirname, '../preload/index.js')
const url = process.env.VITE_DEV_SERVER_URL
const indexHtml = join(process.env.DIST, 'index.html')

export class MainWindow {
  window: BrowserWindow
  constructor() {
    this.window = new BrowserWindow({
      title: 'Main window',
      icon: join(process.env.PUBLIC, 'favicon.ico'),
      frame: false,
      width: 920,
      height: 600,
      webPreferences: {
        preload,
        nodeIntegration: false,
        contextIsolation: true,
      },
    })

    if (process.env.VITE_DEV_SERVER_URL) { // electron-vite-vue#298
      this.window.loadURL(url)
      this.window.webContents.openDevTools({mode:"detach"})
    } else {
      this.window.loadFile(indexHtml)
    }

    // Test actively push message to the Electron-Renderer
    this.window.webContents.on('did-finish-load', () => {
      this.window?.webContents.send('main-process-message', new Date().toLocaleString())
    })

    // Make all links open with the browser, not with the application
    this.window.webContents.setWindowOpenHandler(({ url }) => {
      if (url.startsWith('https:')) shell.openExternal(url)
      return { action: 'deny' }
    })
  }
  log(...str: any[]) {
    this.window.webContents.send("log", str)
  }
}
