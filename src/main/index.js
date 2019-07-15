import { app, systemPreferences, ipcMain, Menu } from 'electron';
import { createMainWindow, setMainTray } from './components';
import { getTimeSpent, isNightTime, allBounds, allBoundsAwake, getTimeBounds, setAwakeTimeBounds } from './utils';

let mainWindow;
let mainTray;
let timeUpdater;
let boundType = 'day';

const windowBounds = {
  width: 250,
  height: 300
};

const mapBoundLimits = ({ min, max }) => ({
  min: {
    hour: min.getHours().toString().padStart(2,'0'),
    minutes: min.getMinutes().toString().padStart(2,'0')
  },
  max: {
    hour: max.getHours().toString().padStart(2,'0'),
    minutes: max.getMinutes().toString().padStart(2,'0')
  }
});

const updateMyAppTheme = () => {
  const isDarkMode = systemPreferences.isDarkMode();
  const currentTime = new Date();
  mainWindow.webContents.send('tray-data', {
    data: getTimeSpent(currentTime, boundType),
    boundLimits: mapBoundLimits(getTimeBounds('awake', currentTime)),
    darkMode: isDarkMode,
    darkTheme: isNightTime(currentTime),
    allBounds: boundType === 'awake' ? allBoundsAwake : allBounds,
    boundType
  });
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

ipcMain.on('bound-change', (event, { boundType: newBoundType }) => {
  boundType = newBoundType;
  updateMyAppTheme();
});

ipcMain.on('bound-limits-change', (event, { boundLimits }) => {
  setAwakeTimeBounds({ boundLimits });
  updateMyAppTheme();
});

systemPreferences.subscribeNotification(
  'AppleInterfaceThemeChangedNotification',
  updateMyAppTheme
);

Menu.setApplicationMenu(null);

