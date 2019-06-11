const electron = require('electron');
const path = require('path');
const url = require('url');

const { app, BrowserWindow, systemPreferences } = electron;

let mainWindow;

const createMainWindow = () => {
  mainWindow = new BrowserWindow({
    width: 350,
    height: 450,
    titleBarStyle: 'hidden',
    skipTaskbar: true,
    resizable: false,
    webPreferences: {
      nodeIntegration: true,
      devTools: false
    }
  });
  mainWindow.setWindowButtonVisibility(false);
  mainWindow.loadURL(url.format({
    protocol: 'file',
    slashes: true,
    pathname: path.join(process.cwd(), '/src/index.html')
  }));
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

