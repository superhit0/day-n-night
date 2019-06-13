import { app, systemPreferences, ipcMain } from 'electron';
import { createMainWindow, setMainTray } from './components';

let mainWindow;
let mainTray;

const windowBounds = {
  width: 350,
  height: 450
};

const dateMap = date => [date.getFullYear(), date.getMonth(), date.getDate(), date.getHours(), date.getMinutes(), date.getSeconds()];
const timeBoundsMap = {
  day: {
    min:[1,1,1,0,0,0],
    max:[1,1,2,0,0,0]
  },
  month: {
    min:[1,1,0,0,0,0],
    max:[1,2,0,0,0,0]
  },
  year: {
    min:[1,0,0,0,0,0],
    max:[2,0,0,0,0,0]
  }
};

const getTimeBounds = (type, date) => {
  const { min, max } = timeBoundsMap[type] || timeBoundsMap['day'];
  const dateMapData = dateMap(date);

  const [ minMap, maxMap ] = [ min, max ].map(it => (
    it.map((value, index) => {
      let offset = 0;
      if (value > 1) {
        offset = 1;
        value = 1;
      }
      return value * dateMapData[index] + offset;
    })
  ));

  return {
    min: Reflect.construct(Date, minMap),
    max: Reflect.construct(Date, maxMap)
  }
};

const updateMyAppTheme = () => {
  const isDarkMode = systemPreferences.isDarkMode();
  const currentTime = new Date();
  const timeBounds = getTimeBounds('day', currentTime);
  const timeSpent = Math.round((currentTime.getTime() - timeBounds.min) * 100 / (timeBounds.max - timeBounds.min));
  mainWindow.webContents.send('tray-data', timeSpent, isDarkMode);
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

