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

  const [ signedIn, setSignedIn ] = useState(false);
  const [ events, setEvents ] = useState([]);

  const [ location, setLocation ] = useState(null);
  const [ currentWeather, setCurrentWeather ] = useState(null);
  const [ forecastData, setForecastData ] = useState([]);

  // called once to load Google Calendar and Dark Sky APIs
  useEffect(() => {
    // request location for weather data
    getLocation(setLocation, console.log);

    // updates authorization state when google calendar api is loaded
    loadApiClient(setSignedIn);
  }, []);

  useEffect(() => {
    if (location !== null) {

      const updateWeather = async () => {
        const weather = await getWeather(location);
        if (weather) {
          setCurrentWeather(weather.currently);
          setForecastData(weather.daily.data);
        }
      };

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

    if (signedIn) {
      // load calendar events
      loadCalendarEvents(setEvents);
      intervalId = setInterval(() => loadCalendarEvents(setEvents), Math.max(config.calendar.syncInterval, 5) * 60 * 1000);
    }

    // clean up interval
    return () => {
      if (intervalId) clearInterval(intervalId);
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
