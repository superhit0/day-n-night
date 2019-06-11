import { app, BrowserWindow, systemPreferences } from 'electron';
import path from 'path';
import url from 'url';

const isDevelopment = process.env.NODE_ENV !== 'production';
const wdsPort = isDevelopment && process.env.ELECTRON_WEBPACK_WDS_PORT;

let mainWindow;

const createMainWindow = () => {
  mainWindow = new BrowserWindow({
    width: 350,
    height: 450,
    titleBarStyle: 'hidden',
    skipTaskbar: true,
    resizable: false,
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

const updateMyAppTheme = ( isDarkMode ) => {

};

app.on('ready', () => {
  createMainWindow();
});

systemPreferences.subscribeNotification(
  'AppleInterfaceThemeChangedNotification',
  () => {
    updateMyAppTheme(systemPreferences.isDarkMode())
  }
)

