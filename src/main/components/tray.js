import {nativeImage, Tray} from 'electron';

let mainTray;

export const setMainTray = (canvasUrl, toggleMainWindowVisiblibity) => {
  if (mainTray) {
    mainTray.setImage(nativeImage.createFromDataURL(canvasUrl));
  } else {
    mainTray = new Tray(nativeImage.createFromDataURL(canvasUrl));
    mainTray.on('click', toggleMainWindowVisiblibity);
  }
  return mainTray;
};
