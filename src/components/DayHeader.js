import React from 'react';

import WeatherHUD from './WeatherHUD';

import { dateFormats, getDayInWeek, formatDate } from '../helpers/dateTime';

const DayHeader = ({ date, weather }) => {

  return (
    <div className="header">
      <div className="weather">
        <WeatherHUD date={ date } weather={ weather } />
        <figure>
          TBD
        </figure>
      </div>
      <div className="day--info">
        <h2 className="day">{ getDayInWeek(date) }</h2>
        <p className="date">{ formatDate(date, dateFormats.businessCasual) }</p>
      </div>
    </div>
  );
};

export default DayHeader;
