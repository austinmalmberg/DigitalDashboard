import React from 'react';

import Header from './Header';
import EventList from './EventList';

const SecondaryEvents = ({ date, events, currentWeather, forecastData }) => {

  return (
    <div className="secondary">
      <Header date={ date } currentWeather={ currentWeather } forecastData={ forecastData } compact="true" />
      <EventList events={ events } compact="true" />
    </div>
  );
};

export default SecondaryEvents;
