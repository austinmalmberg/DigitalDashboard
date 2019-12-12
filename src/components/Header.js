import React from 'react';

import Weather from './Weather';

import { formatDate } from '../helpers/dateTime';

const Header = ({ date, currentWeather, forecastData, compact }) => {

  const options = compact ?
    { month: 'numeric', day: 'numeric' }:
    { month: 'long', day: 'numeric' };

  return (
    <div className="header">
      <div className="info">
        <h2 className="day">{ formatDate(date, { weekday: 'long' }) }</h2>
        <p className="date">{ formatDate(date, options) }</p>
      </div>
      <Weather currentWeather={ currentWeather } forecastData={ forecastData } compact={ compact } />
    </div>
  );
};

export default Header;
