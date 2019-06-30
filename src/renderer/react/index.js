import React, { useState } from 'react';
import { ipcRenderer } from 'electron';
import Header from './components/Header';
import Footer from './components/Footer';
import Body from './components/Body';
import { AppContext } from './context';

import './styles/utilities.scss';
import './styles/main.scss';
import '@fortawesome/fontawesome-free/css/all.min.css';

export default function() {
  const [ theme, setTheme ] = useState('light');
  const [ fill, setFill ] = useState(0);
  const [ allBounds, setAllBounds ] = useState([]);
  const [ boundType, setStateBoundType ] = useState('day');
  const setBoundType = (boundType = 'day') => {
    ipcRenderer.send('bound-change', { boundType });
  };

  ipcRenderer.on('tray-data', (event, { data, darkTheme, allBounds, boundType }) => {
    if(darkTheme) {
      document.getElementById('app').classList.add('dark');
    } else {
      document.getElementById('app').classList.remove('dark');
    }

    setTheme(darkTheme ? 'dark' : 'light');
    setFill(Number(data) || data);
    setAllBounds(allBounds);
    setStateBoundType(boundType);
  });

  return (
    <AppContext.Provider value={{ theme, fill, allBounds, boundType, setBoundType }}>
      <div className="vh-100">
        <Header/>
        <Body/>
        <Footer/>
      </div>
    </AppContext.Provider>
  );
}
