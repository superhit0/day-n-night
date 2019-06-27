import React from 'react';
import './styles.scss';

export default function({ height, width, waveThin, fill, theme, invert = false }) {
  const x=height*fill/100;
  const path = invert
    ? `
    M0 ${x} 
    L0 ${height} 
    L${width} ${height} 
    L${width} ${x}
    q-${width/4} -${height/waveThin} -${width/2} 0
    q-${width/4} ${height/waveThin} -${width/2} 0 
    `
    : `
    M0 ${x} 
    L0 ${height} 
    L${width} ${height} 
    L${width} ${x}
    q-${width/4} ${height/waveThin} -${width/2} 0 
    q-${width/4} -${height/waveThin} -${width/2} 0
    `;
  return (
    <svg className={`fill-svg h-100 w-100 rounded-circle ${theme}`}>
      <path id="box" d={path} stroke="none" strokeWidth="3" fill="black" />
      Sorry, your browser does not support inline SVG.
    </svg>
  );
}
