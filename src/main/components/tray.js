import {nativeImage, Tray} from 'electron';

let mainTray;

export const setMainTray = (canvasUrl) => {
  if (mainTray) {
    mainTray.setImage(nativeImage.createFromDataURL(canvasUrl));
  } else {
    mainTray = new Tray(nativeImage.createFromDataURL(canvasUrl));
  }
  return mainTray;
};
