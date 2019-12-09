import React from 'react';

import Weather from './Weather';

import { dateFormats, getDayInWeek, formatDate } from '../helpers/dateTime';

const Header = ({ date, currentWeather, forecastData, compact }) => {

  const dateFormat = compact ?
    dateFormats.shortest :
    dateFormats.businessCasual;

  return (
    <div className="header">
      <div className="info">
        <h2 className="day">{ getDayInWeek(date) }</h2>
        <p className="date">{ formatDate(date, dateFormat) }</p>
      </div>
      <Weather currentWeather={ currentWeather } forecastData={ forecastData } compact={ compact } />
    </div>
  );
};

export default Header;
