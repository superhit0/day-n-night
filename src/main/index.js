import { app, systemPreferences, ipcMain } from 'electron';
import { createMainWindow, setMainTray } from './components';
import { getTimeSpent } from './utils';

let mainWindow;
let mainTray;
let timeUpdater;
let boundType = 'day';

const windowBounds = {
  width: 250,
  height: 300
};

const updateMyAppTheme = () => {
  const isDarkMode = systemPreferences.isDarkMode();
  const currentTime = new Date();
  mainWindow.webContents.send('tray-data', getTimeSpent(currentTime, boundType), isDarkMode);
};

const toggleMainWindowVisiblibity = (event, bounds) => {
  if (mainWindow.isVisible()) {
    mainWindow.hide();
  } else {
    const {x, y, width, height} = bounds;
    mainWindow.setPosition(x - (windowBounds.width/2) + (width/2), y + height);
    mainWindow.show();
  }
};

app.on('ready', () => {
  mainWindow = createMainWindow(windowBounds);
  ipcMain.on('page-load', () => {
    updateMyAppTheme();
    if (!timeUpdater) {
      timeUpdater = setInterval(updateMyAppTheme, 60 * 1000);
    }
  });
});

ipcMain.on('tray-image', (event, canvasUrl) => {
  mainTray = setMainTray(canvasUrl, toggleMainWindowVisiblibity);
});

systemPreferences.subscribeNotification(
  'AppleInterfaceThemeChangedNotification',
  updateMyAppTheme
)

