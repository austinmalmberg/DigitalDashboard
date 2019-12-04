import React, { useState, useEffect } from 'react';

import Clock from './components/Clock';
import DayHeader from './components/DayHeader';
import EventList from './components/EventList';
import SecondaryEvents from './components/SecondaryEvents';

import config from './config';
import { loadApiClient, loadCalendarEvents } from './apis/googleCalendarApi';
import { getCurrentWeather } from './apis/openWeatherMapApi';
import { dateFormats, formatDate, getDayInWeek, isSameDate, addDays } from './helpers/dateTime';

const App = () => {

  const [ date, setDate ] = useState(new Date());

  const [ isAuthorized, setAuthorized ] = useState(false);
  const [ events, setEvents ] = useState([]);
  const [ weather, setWeather ] = useState({
    weather: {
      main: "Unknown"
    },
    main: {
      temp: 69,
      temp_min: 69,
      temp_max: 69
    }
  });

  // called once to load Google API
  useEffect(() => {
    loadApiClient(setAuthorized);

    setDate(new Date());
    const timerId = setInterval(() => setDate(new Date()), 1000);

    getCurrentWeather(setWeather);
    const weatherId = setInterval(() => getCurrentWeather(setWeather), config.weather.syncInterval * 1000);

    return () => {
      if (timerId) clearInterval(timerId);
      if (weatherId) clearInterval(weatherId);
    };
  }, []);

  // listen for sign in
  useEffect(() => {

    let intervalId;

    if (isAuthorized) {

      loadCalendarEvents(setEvents);
      intervalId = setInterval(() => loadCalendarEvents(setEvents), config.calendar.syncInterval * 1000);
    }

    // clean up interval
    return () => {
      if (intervalId) clearInterval(intervalId);
    }
  }, [isAuthorized]);

  return (
    <>
      <div className="left">

        <Clock date={ date } />

        {/* primary calendar card */}
        <div className="primary">
          <DayHeader date={ date } weather={ weather } />
          <EventList events={ events.filter(event => isSameDate(event.start.dateTime || event.start.date, date)) } />
        </div>

      </div>

      {/* secondary calendar cards */}
      <div className="right">
        { [...Array(config.calendar.daysToSync - 1).keys()].map(key => addDays(date, key + 1)).map((futureDate, key) => (
          <SecondaryEvents
            key={ key }
            date={ futureDate }
            events={ events.filter(event => isSameDate(event.start.dateTime || event.start.date, futureDate)) }
          />
        ))}
      </div>
    </>
  );
}

export default App;
