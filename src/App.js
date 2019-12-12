import React, { useState, useEffect } from 'react';

import Clock from './components/Clock';
import Authorization from './components/Authorization';
import DailySnapshot from './components/DailySnapshot';

import getLocation from './apis/geolocation';
import getWeather from './apis/darkSkyApi';
import { loadApiClient, loadCalendarEvents } from './apis/googleCalendarApi';

import config from './config';
import { addDays, normalizeDate } from './helpers/dateTime';

const App = () => {

  // updates daily via the Clock component
  const [ date, setDate ] = useState(normalizeDate(new Date()));

  const [ signedIn, setSignedIn ] = useState(false);
  const [ events, setEvents ] = useState([]);

  const [ location, setLocation ] = useState(null);
  const [ weatherData, setWeatherData ] = useState(null);

  // onload, get calendar events and weather
  useEffect(() => {
    // request location for weather data
    getLocation(setLocation, console.log);

    // updates authorization state when google calendar api is loaded
    loadApiClient(setSignedIn);

    console.log('initialize application');
  }, []);

  useEffect(() => {
    let weatherId;

    if (location) {
      async function updateWeather() {
        const weather = await getWeather(location);
        if (weather) {
          setWeatherData(weather);
        }
      }

      updateWeather();
      // schedule periodic weather updates
      weatherId = setInterval(updateWeather, config.weather.syncInterval * 60 * 1000);

      console.log('initialize weather');
    } else {

      console.log('could not initialize weather');
    }

    return () => {
      if (weatherId) clearInterval(weatherId);

      console.log('clean up weather interval');
    };
  }, [location, date]);

  // listen for Google OAUTH sign in
  useEffect(() => {
    let intervalId;

    if (signedIn) {
      // load calendar events
      loadCalendarEvents(setEvents);
      intervalId = setInterval(() => loadCalendarEvents(setEvents), Math.max(config.calendar.syncInterval, 5) * 60 * 1000);

      console.log('initialize calendar');
    } else {

      console.log('could not initialize calendar');
    }

    // clean up interval
    return () => {
      if (intervalId) clearInterval(intervalId);

      console.log('clean up calendar interval');
    }
  }, [signedIn]);


  if (!signedIn) {
    return (
      <div className="text-center">
        <Clock appDate={ date } setAppDate={ setDate } />
        <Authorization signedIn={ signedIn } />
      </div>
    );
  }

  return (
    <>
      <div className="left">

        <Clock appDate={ date } setAppDate={ setDate } />

        <DailySnapshot
          forDate={ date }
          events={ events }
          weatherData={ weatherData }
        />

      </div>

      <div className="right">

        {/* map numbers from 0 - daysToSync to their respective date then create SecondaryEvent components from these dates */}
        { [...Array(config.calendar.daysToSync - 1).keys()].map(key => [addDays(date, key + 1), key]).map(([futureDate, i], key) => (
          <DailySnapshot
            key={ key }
            forDate={ futureDate }
            events={ events }
            weatherData={ weatherData }
          />
        ))}

      </div>
    </>
  );
};

export default App;
