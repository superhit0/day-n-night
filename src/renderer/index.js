import { ipcRenderer } from 'electron';
import trayCanvas from './utils/traycanvas';

window.onload = () => {
  ipcRenderer.send('page-load');
};

ipcRenderer.on('tray-data', (event, { data, darkMode }) => {
  ipcRenderer.send('tray-image', trayCanvas(data, darkMode));
});

import './app';
