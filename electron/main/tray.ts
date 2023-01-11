import {app, Tray, Menu} from 'electron'
import {createMain, launchMain, mainWindow} from "./index";
import * as path from "path";

let imgPath = app.isPackaged ?  path.join(__dirname, "../../dist/favicon.ico") : "./public/favicon.ico";

export class TaskTray {
  tray: Tray
  constructor() {
    this.tray = new Tray(imgPath)
    this.tray.setToolTip(app.name)
    this.tray.on("double-click", () => {
      createMain()
    })
    const contextMenu = Menu.buildFromTemplate([
      { label: '終了', role: 'quit' }
    ]);
    this.tray.setContextMenu(contextMenu)
  }
}
