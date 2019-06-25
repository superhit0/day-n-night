import React from 'react';

export default function({ height, width}) {
  console.log(height, width)
  const x=height/2;
  const path = `
    M0 ${x} 
    L0 ${height} 
    L${width} ${height} 
    L${width} ${x}
    q-${width/4} ${height/8} -${width/2} 0 
    q-${width/4} -${height/8} -${width/2} 0
    `;
  return (
    <svg className="h-100 w-100 rounded-circle">
      <path id="box" d={path} stroke="none" strokeWidth="3" fill="blue" />
      Sorry, your browser does not support inline SVG.
    </svg>
  );
}
