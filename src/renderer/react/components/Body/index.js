import { ipcRenderer } from 'electron';
import React, { useState, useRef, useEffect } from 'react';
import SVGComponent from '../SVGComponent';

export default function() {
  const [height, setHeight] = useState(0);
  const [width, setWidth] = useState(0);
  const [fill, setFill] = useState(window.trayFill || 0);
  const ref = useRef(null);

  useEffect(() => {
    const style = window.getComputedStyle(ref.current);
    setHeight(Number(style.getPropertyValue("height").slice(0, -2)));
    setWidth(Number(style.getPropertyValue("width").slice(0, -2)));
    ipcRenderer.on('tray-data', (event, data) => {
      setFill(Number(data));
    });
  });

  return (
    <div className="h-74 p-2 pl-3 pr-3">
      <div className="h-100 rounded-circle" ref={ref}>
        <SVGComponent height={height} width={width} waveThin={8} fill={fill} />
        <SVGComponent height={height} width={width} waveThin={16} fill={fill} invert={true} />
      </div>
    </div>
  );
}
