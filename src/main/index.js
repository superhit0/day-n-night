import { app, systemPreferences, ipcMain, Tray, nativeImage } from 'electron';
import { createMainWindow, setMainTray } from './components';

let mainWindow;
let mainTray;

const updateMyAppTheme = () => {
  const isDarkMode = systemPreferences.isDarkMode();
  mainWindow.webContents.send('tray-data', '88', isDarkMode);
};

app.on('ready', () => {
  mainWindow = createMainWindow();
  ipcMain.on('page-load', updateMyAppTheme);
});

ipcMain.on('tray-image', (event, canvasUrl) => {
  mainTray = setMainTray(canvasUrl);
});

systemPreferences.subscribeNotification(
  'AppleInterfaceThemeChangedNotification',
  updateMyAppTheme
)

