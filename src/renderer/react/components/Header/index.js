import React from 'react';

export default class Header extends React.Component {
  render() {
    return (
      <div className="h-15 text-center container pt-1 pb-1">
        <ul className="nav nav-pills nav-justified">
          <li className="nav-item">
            <a className="nav-link active" href="#">Month</a>
          </li>
          <li className="nav-item">
            <a className="nav-link" href="#">Day</a>
          </li>
          <li className="nav-item">
            <a className="nav-link active" href="#">Year</a>
          </li>
        </ul>
      </div>
    );
  }
}
