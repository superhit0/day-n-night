import React from 'react';

export default function({ setShowSettingsPage }) {
  return (
    <div className="container h-auto text-right" onClick={() => {setShowSettingsPage(true)}}>
      <i className="fas fa-cog"></i>
    </div>
  );
}
