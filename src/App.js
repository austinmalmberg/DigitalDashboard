import React, { useState, useEffect } from 'react';

import Clock from './components/Clock';
import PrimaryCalendar from './components/PrimaryCalendar';
import SecondaryEvents from './components/SecondaryEvents';

import config from './config';
import { loadApiClient, loadCalendarEvents } from './apis/googleCalendarApi';
import { isSameDate, addDays } from './helpers/dateTime';

const App = () => {

  const [ date, setDate ] = useState(new Date());

  const [ isAuthorized, setAuthorized ] = useState(false);
  const [ events, setEvents ] = useState([]);

  // called once to load Google API
  useEffect(() => {
    loadApiClient(setAuthorized);

    setDate(new Date());
    const timerId = setInterval(() => setDate(new Date()), 1000);

    return () => {
      if (timerId) clearInterval(timerId);
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
        <PrimaryCalendar date={ date } events={ events.filter(event => isSameDate(event.start.dateTime || event.start.date, date)) } />

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
