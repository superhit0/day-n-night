import React from 'react';
import Toggle from '../Toggle';
import SettingsHeader from '../SettingsHeader';

export default function({ setShowSettingsPage }) {
  return (
    <div className="container vh-100 bg-light">
      <SettingsHeader setShowSettingsPage={setShowSettingsPage} />
      <hr className="mt-1" />
      <Toggle/>
    </div>
  );
}
