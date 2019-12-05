import React from 'react';

import Weather from './Weather';

import { dateFormats, getDayInWeek, formatDate } from '../helpers/dateTime';

const Header = ({ date, weather, compact }) => {

  const dateFormat = compact ?
    dateFormats.shortest :
    dateFormats.businessCasual;

  return (
    <div className="header">
      { weather && <Weather weather={ weather } /> }
      <div className="day--info">
        <h2 className="day">{ getDayInWeek(date) }</h2>
        <p className="date">{ formatDate(date, dateFormat) }</p>
      </div>
    </div>
  );
};

export default Header;
