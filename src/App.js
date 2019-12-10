import React, { useState, useEffect } from 'react';

import Clock from './components/Clock';
import Authorization from './components/Authorization';
import PrimaryCalendar from './components/PrimaryCalendar';
import SecondaryEvents from './components/SecondaryEvents';

import getLocation from './apis/geolocation';
import getWeather from './apis/darkSkyApi';
import { loadApiClient, loadCalendarEvents } from './apis/googleCalendarApi';

import config from './config';
import { dateWithinRange, addDays } from './helpers/dateTime';

const App = () => {

  // updates daily via the Clock component
  const [ date, setDate ] = useState(new Date());

  const [ isAuthorized, setAuthorized ] = useState(false);
  const [ events, setEvents ] = useState([]);

  const [ location, setLocation ] = useState(null);
  const [ currentWeather, setCurrentWeather ] = useState(null);
  const [ forecastData, setForecastData ] = useState([]);

  // called once to load Google Calendar and Dark Sky APIs
  useEffect(() => {
    // updates authorization state when google calendar api is loaded
    loadApiClient(setAuthorized);
  }, []);

  useEffect(() => {
    if (location !== null) {

      async function updateWeather() {
        const { currently, daily } = await getWeather(location);

        if (currently)
          setCurrentWeather(currently);

        if (daily) {
          setForecastData(daily.data);
        }
      }

      updateWeather();
      const weatherId = setInterval(updateWeather, config.weather.syncInterval * 60 * 1000);

      return () => {
        if (weatherId) clearInterval(weatherId);
      };

    }
  }, [location, date]);

  // listen for Google OAUTH sign in
  useEffect(() => {

    let intervalId;

    if (isAuthorized) {
      getLocation(setLocation, console.log);

      loadCalendarEvents(setEvents);
      intervalId = setInterval(() => loadCalendarEvents(setEvents), Math.max(config.calendar.syncInterval, 5) * 60 * 1000);
    }

    // clean up interval
    return () => {
      if (intervalId) clearInterval(intervalId);
    }
  }, [isAuthorized]);


  if (!isAuthorized) {
    return (
      <div className="text-center">
        <Clock date={ date } setDate={ setDate } />
        <Authorization setAuthorized={ setAuthorized } />
      </div>
    );
  }

  return (
    <>
      <div className="left">

        <Clock date={ date } setDate={ setDate } />

        <PrimaryCalendar
          date={ date }
          events={ events.filter(event => dateWithinRange(date, event.start.dateTime || event.start.date, event.end.dateTime || event.end.date)) }
          currentWeather={ currentWeather }
          forecastData = { forecastData[0] }
        />

      </div>

      <div className="right">

        {/* map numbers from 0 - daysToSync to their respective date then create SecondaryEvent components from these dates */}
        { [...Array(config.calendar.daysToSync - 1).keys()].map(key => addDays(date, key + 1)).map((futureDate, key) => (
          <SecondaryEvents
            key={ key }
            date={ futureDate }
            events={ events.filter(event => dateWithinRange(futureDate, event.start.dateTime || event.start.date, event.end.dateTime || event.end.date)) }
            forecastData = { forecastData[key + 1] }
          />
        ))}

      </div>
    </>
  );
}

export default App;
