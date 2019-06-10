const electron = require('electron');
const path = require('path');

const { app, BrowserWindow, Tray, nativeImage: NativeImage, systemPreferences } = electron;

let mainWindow;
let mainTray;

const createMainWindow = () => {
  mainWindow = new BrowserWindow({
    width: 350,
    height: 450,
    titleBarStyle: 'hidden',
    skipTaskbar: true,
    resizable: false
  });
  mainWindow.setWindowButtonVisibility(false);
};

const createMainTray = () => {
  // const nativeImage = NativeImage.createFromBuffer(new Buffer('HELLO'));
  if(systemPreferences.isDarkMode()) {
    mainTray = new Tray(path.join(process.cwd() + '/assets/spinner_dark.png'));
  } else {
    mainTray = new Tray(path.join(process.cwd() + '/assets/spinner_light.png'));
  }
};

const updateMyAppTheme = ( isDarkMode ) => {

};

app.on('ready', () => {
  createMainWindow();
  createMainTray();
});

systemPreferences.subscribeNotification(
  'AppleInterfaceThemeChangedNotification',
  () => {
    updateMyAppTheme(systemPreferences.isDarkMode())
  }
)

