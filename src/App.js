import React, { useState, useEffect } from 'react';

import Clock from './components/Clock';
import PrimaryCalendar from './components/PrimaryCalendar';
import SecondaryEvents from './components/SecondaryEvents';

import { loadApiClient, loadCalendarEvents } from './apis/googleCalendarApi';
import { getDarkSkyWeather } from './apis/darkSkyApi';

import config from './config';
import { isSameDate, addDays } from './helpers/dateTime';

const App = () => {

  // updates daily via the Clock component
  const [ date, setDate ] = useState(new Date());

  const [ isAuthorized, setAuthorized ] = useState(false);
  const [ events, setEvents ] = useState([]);
  const [ weather, setWeather ] = useState({
    currently: {
      summary: '',
      icon: '',
      temperature: 69
    },
    daily: {
      data: [
        {
          summary: '',
          icon: '',
          temperatureHigh: 69,
          temperatureLow: 69
        } // ...
      ]
    }
  });

  // called once to load Google Calendar and Dark Sky APIs
  useEffect(() => {
    loadApiClient(setAuthorized);

    getDarkSkyWeather(setWeather);
    const weatherId = setInterval(async () => {
      getDarkSkyWeather(setWeather)
    }, config.weather.syncInterval * 1000);

    return () => {
      if (weatherId) clearInterval(weatherId);
    };
  }, []);

  // listen for Google OAUTH sign in
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

        <Clock date={ date } setDate={ setDate } />

        <PrimaryCalendar
          date={ date }
          events={ events.filter(event => isSameDate(event.start.dateTime || event.start.date, date)) }
          weather={ { min: weather.daily.data[0].temperatureLow, max: weather.daily.data[0].temperatureHigh, current: weather.currently.temperature } }
        />

      </div>

      <div className="right">

        {/* map numbers from 0 - daysToSync to their respective date then create SecondaryEvent components from these dates */}
        { [...Array(config.calendar.daysToSync - 1).keys()].map(key => addDays(date, key + 1)).map((futureDate, key) => (
          <SecondaryEvents
            key={ key }
            date={ futureDate }
            events={ events.filter(event => isSameDate(event.start.dateTime || event.start.date, futureDate)) }
            // weather={ { min: weather.daily.data[key].temperatureLow, max: weather.daily.data[key].temperatureHigh } }
          />
        ))}

      </div>
    </>
  );
}

export default App;
