import React, { useState } from 'react';
import { ipcRenderer } from 'electron';
import Header from './components/Header';
import Footer from './components/Footer';
import Body from './components/Body';
import SettingsPage from './components/SettingsPage';
import { AppContext } from './context';

import './styles/utilities.scss';
import './styles/main.scss';
import '@fortawesome/fontawesome-free/css/all.min.css';

export default function() {
  const [ theme, setTheme ] = useState('light');
  const [ fill, setFill ] = useState(0);
  const [ allBounds, setAllBounds ] = useState([]);
  const [ boundType, setStateBoundType ] = useState('day');
  const [ showSettingsPage, setShowSettingsPage ] = useState(false);
  const [ boundLimits, setStateBoundLimits ] = useState({ min: {}, max: {} });
  const setBoundType = (boundType = 'day') => {
    ipcRenderer.send('bound-change', { boundType });
  };
  const setBoundsLimits = (boundLimits) => {
    ipcRenderer.send('bound-limits-change', { boundLimits });
  };

  ipcRenderer.on('tray-data', (event, { data, darkTheme, allBounds, boundType, boundLimits }) => {
    setTheme(darkTheme ? 'dark' : 'light');
    setFill(Number(data) || data);
    setAllBounds(allBounds);
    setStateBoundType(boundType);
    setStateBoundLimits(boundLimits);
  });

  if (showSettingsPage) {
    return (
      <SettingsPage
        setShowSettingsPage={setShowSettingsPage}
        {
          ...{
            boundType,
            setBoundType,
            boundLimits,
            setBoundsLimits
          }
        }
      />
    );
  }

  return (
    <AppContext.Provider value={{ theme, fill, allBounds, boundType, setBoundType }}>
      <div className={`reactmain vh-100 ${theme}`}>
        <Header/>
        <Body/>
        <Footer setShowSettingsPage={setShowSettingsPage} />
      </div>
    </AppContext.Provider>
  );
}
