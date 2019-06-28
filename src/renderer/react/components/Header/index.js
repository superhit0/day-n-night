import React, { useContext } from 'react';
import { AppContext } from '../../context';
import './styles.scss';

export default () => {
  const { theme } = useContext(AppContext);

  return (
    <div className="header h-15 text-center container pt-2 pb-1 mx-auto">
      <ul className="nav nav-pills nav-justified">
        <li className="nav-item">
          <a className="nav-link" href="#">Month</a>
        </li>
        <li className="nav-item">
          <a className={`nav-link active ${theme}`} href="#">Day</a>
        </li>
        <li className="nav-item">
          <a className="nav-link" href="#">Year</a>
        </li>
      </ul>
    </div>
  );
}
