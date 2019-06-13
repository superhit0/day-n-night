import { BrowserWindow } from 'electron';
import url from 'url';
import path from 'path';

let mainWindow;

const isDevelopment = process.env.NODE_ENV !== 'production';
const wdsPort = isDevelopment && process.env.ELECTRON_WEBPACK_WDS_PORT;

export const createMainWindow = ({width, height}) => {
  mainWindow = new BrowserWindow({
    width,
    height,
    titleBarStyle: 'hidden',
    skipTaskbar: true,
    resizable: false,
    show: false,
    webPreferences: {
      nodeIntegration: true
    }
  });
  mainWindow.setWindowButtonVisibility(false);
  if (isDevelopment) {
    mainWindow.loadURL(`http://localhost:${wdsPort}`)
  }
  else {
    mainWindow.loadURL(url.format({
      pathname: path.join(__dirname, 'index.html'),
      protocol: 'file',
      slashes: true
    }))
  }

  mainWindow.on('closed', () => {
    mainWindow = null;
  });

  return mainWindow;
};
