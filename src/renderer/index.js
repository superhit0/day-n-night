const { remote } = require('electron');
let mainTray = null;
const { Tray, nativeImage } = remote;
const canvas = document.createElement('canvas');
const ctx = canvas.getContext('2d');
canvas.width = 21;
canvas.height = 15;
ctx.fillStyle = '#fff';
ctx.font = '18px serif';
ctx.fillText('88', 1, 14, 21);
if (mainTray) {
  mainTray.setImage(nativeImage.createFromDataURL(canvas.toDataURL()));
} else {
  mainTray = new Tray(nativeImage.createFromDataURL(canvas.toDataURL()));
}

window.onbeforeunload = () => {
  mainTray && mainTray.destroy();
};
