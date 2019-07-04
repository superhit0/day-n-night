import React from 'react';
import ToggleButton from "react-toggle-button";

export default function({ value = false, onToggle = () =>{} }) {
  return (
    <ToggleButton
      inactiveLabel={''}
      activeLabel={''}
      value={ value }
      colors={{
        active: {
          base: 'rgb(29, 120, 254)'
        },
        inactive: {
          base: 'rgb(176, 174, 176)'
        }
      }}
      onToggle={() => {
        onToggle(!value);
        setValue(!value);
      }} />
  );
}
