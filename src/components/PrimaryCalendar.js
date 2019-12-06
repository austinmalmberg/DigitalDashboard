import React from 'react';

import { isSameDate } from '../helpers/dateTime';

import Header from './Header';
import EventList from './EventList';

const PrimaryCalendar = ({ date, events, currentWeather, forecastData }) => {

  return (
    <div className="primary">
      <Header date={ date } currentWeather={ currentWeather } forecastData={ forecastData } />
      <EventList events={ events.filter(event => isSameDate(event.start.dateTime || event.start.date, date)) } />
    </div>
  );
};

export default PrimaryCalendar;
