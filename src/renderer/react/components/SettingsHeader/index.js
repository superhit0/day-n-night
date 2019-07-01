import React from 'react';

import './styles.scss';

export default function({ setShowSettingsPage }) {
  return (
    <div className="pt-3">
      <label className="h2">Settings</label>
      <i
        onClick={()=>{setShowSettingsPage(false)}}
        id="settingsclose"
        className="fas fa-times float-right pt-1 pr-1"
      />
    </div>
  );
}
