import React, { useState, useEffect } from 'react';

import EventList from './components/EventList';

import config from './config';
import { loadApiClient, loadCalendarEvents } from './googleCalendarApi';
import { dateFormats, formatTime, formatDate, getDayInWeek, isSameDate, addDays } from './helpers/dateTime';

const App = () => {

  const [ date, setDate ] = useState(new Date());

  const [ isAuthorized, setAuthorized ] = useState(false);
  const [ events, setEvents ] = useState([]);

  // 2d array for separating events
  const [ dailyEvents, setDailyEvents ] = useState([...Array(config.calendar.daysToSync).keys()].fill([]));

  const maxSyncDate = addDays(date, config.calendar.daysToSync - 1);

  // called once to load Google API
  useEffect(() => {
    loadApiClient(setAuthorized);
  }, []);

  useEffect(() => {
    const timerId = setInterval(() => setDate(new Date()), 1000);

    return () => clearInterval(timerId);
  }, [date]);

  // listen for sign in
  useEffect(() => {

    let intervalId;

    if (isAuthorized) {
      loadCalendarEvents(maxSyncDate, setEvents);
      intervalId = setInterval(() => loadCalendarEvents(maxSyncDate, setEvents), config.calendar.syncInterval * 1000);
    }

    // clean up interval
    return () => clearInterval(intervalId);
  }, [isAuthorized, maxSyncDate]);

  // listen for events to change
  useEffect(() => {
    const d = new Date();
    if (events.length > 0) {
      const chop = parseEventsByDay(d, config.calendar.daysToSync, events).slice(0, config.calendar.daysToSync);
      console.log(chop);
      setDailyEvents(chop);
    }

  }, [events]);


  return (
    <>
      <div className="left">

        {/* clock */}
        <div className="clock--panel">
          <h1 className="clock">{ formatTime(date, config.clock.militaryTime) }</h1>
        </div>

        {/* main calendar card */}
        <div className="today">

          {/* date */}
          <div className="today--header">
            <h2 className="today--day">{ getDayInWeek(date) }</h2>
            <p className="today--date">{ formatDate(date, dateFormats.businessCasual) }</p>
          </div>

          {/* events container */}
          <div className="today--events">
            <EventList events={ dailyEvents[0] } />
          </div>
        </div>

      </div>

      {/* secondary calendar cards */}
      <div className="right">
        <EventList events={ dailyEvents.slice(1).flatMap(arr => [...arr]) } condensed="true" />
      </div>
    </>
  );
}

/**
 * @param {Object []} events - a list of events objects ordered by start date
*/
function parseEventsByDay(currentDate, numDays, events) {

  // init a 2d array to hold daily events
  const result = [[]];

  let d = currentDate;
  for (var i = 0; i < events.length; i++) {

    const event = events[i];

    let when = new Date(event.start.dateTime);
    // this might not be necessary, but it was in Google's API example so I'm going to keep it in here
    if (!when) {
      when = new Date(event.start.date);
    }

    while (!isSameDate(when, d) || result.length < numDays) {
      d = addDays(d, 1);

      // create an empty event array for that day
      result.push([]);
    }

    result[result.length - 1].push(event);
  }

  return result;
}

export default App;
