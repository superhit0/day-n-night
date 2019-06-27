import React, { useState, useRef, useEffect, useContext } from 'react';
import { AppContext } from '../../context';
import SVGComponent from '../SVGComponent';
import TrayLabel from '../TrayLabel';
import './styles.scss';

export default function() {
  const [height, setHeight] = useState(0);
  const [width, setWidth] = useState(0);
  const ref = useRef(null);
  const { fill, theme } = useContext(AppContext);

  useEffect(() => {
    const style = window.getComputedStyle(ref.current);
    setHeight(Number(style.getPropertyValue("height").slice(0, -2)));
    setWidth(Number(style.getPropertyValue("width").slice(0, -2)));
  });

  return (
    <div className="h-74 p-2 pl-3 pr-3">
      <div className={`h-100 rounded-circle svg-holder ${theme}`} ref={ref}>
        <SVGComponent height={height} width={width} waveThin={8} fill={100-fill} theme={theme} />
        <SVGComponent height={height} width={width} waveThin={16} fill={100-fill} theme={theme} invert={true} />
        <TrayLabel text={fill} />
        <div className="w-100 text-center text-white">
          P E R C E N T
        </div>
      </div>
    </div>
  );
}
