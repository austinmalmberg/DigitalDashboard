import React, { useState, useEffect } from 'react';

import config from '../config';
import { isSameDate } from '../helpers/dateTime';

import { getCurrentWeather } from '../apis/openWeatherMapApi';

import Header from './Header';
import EventList from './EventList';

const PrimaryCalendar = ({ date, events }) => {

  const [ weather, setWeather ] = useState({
    description: 'Unknown',
    image_src: '',
    temp: {
      min: 68,
      current: 69,
      max: 70
    }
  });

  useEffect(() => {

    getCurrentWeather(setWeather);
    const weatherId = setInterval(() => getCurrentWeather(setWeather), config.weather.syncInterval * 1000);

    return () => {
      if (weatherId) clearInterval(weatherId);
    }
  }, []);

  return (
    <div className="primary">
      <Header date={ date } weather = { weather }/>
      <EventList events={ events.filter(event => isSameDate(event.start.dateTime || event.start.date, date)) } />
    </div>
  );
};

export default PrimaryCalendar;
