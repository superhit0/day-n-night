import React, { useState } from 'react';
import Toggle from '../Toggle';

export default function({ setShowSettingsPage }) {
  return (
    <div className="container vh-100">
      <h1>Settings Page</h1>
      <Toggle/>
    </div>
  );
}