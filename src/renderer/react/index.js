import React from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import Body from './components/Body';

import './styles/utilities.scss';
import '@fortawesome/fontawesome-free/css/all.min.css';

export default function() {
  return (
    <div className="vh-100">
      <Header/>
      <Body/>
      <Footer/>
    </div>
  );
}
