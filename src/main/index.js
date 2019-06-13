import { app, systemPreferences, ipcMain } from 'electron';
import { createMainWindow, setMainTray } from './components';

let mainWindow;
let mainTray;

const windowBounds = {
  width: 350,
  height: 450
};

const updateMyAppTheme = () => {
  const isDarkMode = systemPreferences.isDarkMode();
  mainWindow.webContents.send('tray-data', '88', isDarkMode);
};

const toggleMainWindowVisiblibity = (event, bounds) => {
  if (mainWindow.isVisible()) {
    mainWindow.hide();
  } else {
    const {x, y, width} = bounds;
    mainWindow.setPosition(x - (windowBounds.width/2) + (width/2), y);
    mainWindow.show();
  }
};

app.on('ready', () => {
  mainWindow = createMainWindow(windowBounds);
  ipcMain.on('page-load', updateMyAppTheme);
});

ipcMain.on('tray-image', (event, canvasUrl) => {
  mainTray = setMainTray(canvasUrl, toggleMainWindowVisiblibity);
});

systemPreferences.subscribeNotification(
  'AppleInterfaceThemeChangedNotification',
  updateMyAppTheme
)

