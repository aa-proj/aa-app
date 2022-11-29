import {autoUpdater} from "electron-updater";
import {mainWindow} from "./index";

export const registerUpdateEvent = () => {
  autoUpdater.on('checking-for-update', () => {
    console.log('Checking for update...');
    mainWindow.log("Checking for update...")
  })
  autoUpdater.on('update-available', (info) => {
    console.log('Update available.');
    mainWindow.log("Update available", info)
  })
  autoUpdater.on('update-not-available', (info) => {
    console.log('Update not available.');
    mainWindow.log("Update not available", info)
  })
  autoUpdater.on('error', (err) => {
    mainWindow.log('Error in auto-updater. ' + err);
  })
  autoUpdater.on('download-progress', (progressObj) => {
    let log_message = "Download speed: " + progressObj.bytesPerSecond;
    log_message = log_message + ' - Downloaded ' + progressObj.percent + '%';
    log_message = log_message + ' (' + progressObj.transferred + "/" + progressObj.total + ')';
    mainWindow.log(log_message);
  })
  autoUpdater.on('update-downloaded', (info) => {
    mainWindow.log('Update downloaded');
  });
}
