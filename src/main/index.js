import { app, BrowserWindow, systemPreferences, ipcMain, Tray, nativeImage } from 'electron';
import path from 'path';
import url from 'url';

const isDevelopment = process.env.NODE_ENV !== 'production';
const wdsPort = isDevelopment && process.env.ELECTRON_WEBPACK_WDS_PORT;

let mainWindow;
let mainTray;
const windowBounds = {
  width: 350,
  height: 450
};

const createMainWindow = () => {
  mainWindow = new BrowserWindow({
    width: windowBounds.width,
    height: windowBounds.height,
    titleBarStyle: 'hidden',
    skipTaskbar: true,
    resizable: false,
    show: true,
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
};

const setMainTray = (event, canvasUrl) => {
  if (mainTray) {
    mainTray.setImage(nativeImage.createFromDataURL(canvasUrl));
  } else {
    mainTray = new Tray(nativeImage.createFromDataURL(canvasUrl));
  }
};

const updateMyAppTheme = () => {
  const isDarkMode = systemPreferences.isDarkMode();
  mainWindow.webContents.send('tray-data', '88', isDarkMode);
};

app.on('ready', () => {
  createMainWindow();
  ipcMain.on('page-load', (event) => {
    event.reply('tray-data', '88', systemPreferences.isDarkMode());
  });
});

ipcMain.on('tray-image', setMainTray);

systemPreferences.subscribeNotification(
  'AppleInterfaceThemeChangedNotification',
  updateMyAppTheme
)

