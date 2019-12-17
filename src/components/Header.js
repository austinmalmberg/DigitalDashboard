import React from 'react';

import Weather from './Weather';

import { formatDate } from '../helpers/dateTime';

const Header = ({ date, weather, theme, setTheme, compact }) => {

  const options = compact ?
    { month: 'numeric', day: 'numeric' }:
    { month: 'long', day: 'numeric' };

  return (
    <div style={ theme && theme.header } className="header">
      <div className="date--info">
        <h2 className="day">{ formatDate(date, { weekday: 'long' }) }</h2>
        <p className="date">{ formatDate(date, options) }</p>
      </div>
      <Weather weather={ weather } setTheme={ setTheme } compact={ compact } />
    </div>
  );
};

export default Header;
