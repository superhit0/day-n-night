import React, { useContext } from 'react';
import { AppContext } from '../../context';
import './styles.scss';

const renderListItems = ({ theme, boundType, setBoundType, allBounds }) => (
  allBounds.map(bound => (
    <li className="nav-item">
      <a
        className={`nav-link text-capitalize ${ bound === boundType ? `active ${theme}` : '' }`}
        href='#'
        onClick={() => {setBoundType(bound)}}
      >
        {bound}
      </a>
    </li>
  ))
);

export default () => {
  const { theme, boundType, setBoundType, allBounds } = useContext(AppContext);

  return (
    <div className="header h-15 text-center container pt-2 pb-1 mx-auto">
      <ul className="nav nav-pills nav-justified">
        { renderListItems({ theme, boundType, setBoundType, allBounds }) }
      </ul>
    </div>
  );
}
