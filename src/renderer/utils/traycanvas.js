module.exports = (text, darkMode = false) => {
  const canvas = document.createElement('canvas');
  const ctx = canvas.getContext('2d');
  canvas.width = 21;
  canvas.height = 15;
  if (darkMode) {
    ctx.fillStyle = '#fff';
  }
  ctx.font = '18px serif';
  ctx.fillText(text, 1, 14, 21);

  return canvas.toDataURL();
};
