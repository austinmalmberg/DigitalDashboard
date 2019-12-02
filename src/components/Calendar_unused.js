import React, { useState, useEffect } from 'react';
import Row from 'react-bootstrap/Row';

import Authorization from './calendar_components/Authorization';
import EventList from './calendar_components/EventList';

import config from '../config';
import { loadApiClient, loadCalendarEvents } from '../googleCalendarApi';
import { isSameDate } from '../helpers/dateTime';

const Calendar = () => {

  const [ isAuthorized, setAuthorized ] = useState(false);

  const [ events, setEvents ] = useState([]);
  const [ todaysEvents, setTodaysEvents ] = useState([]);
  const [ futureEvents, setFutureEvents ] = useState([]);

  // load Google API script which was called from index.html
  useEffect(() => {
    loadApiClient(setAuthorized);
  }, []);

  // listen for sign in
  useEffect(() => {

    let intervalId;

    if (isAuthorized) {
      let maxSyncDate = new Date();
      maxSyncDate.setDate(maxSyncDate.getDate() + config.calendar.daysToSync - 1);

      loadCalendarEvents(maxSyncDate, setEvents);
      intervalId = setInterval(() => loadCalendarEvents(maxSyncDate, setEvents), config.calendar.syncInterval * 1000);
    }

    return () => clearInterval(intervalId);
  }, [isAuthorized]);

  // listen for events to change
  useEffect(() => {

    if (events.length > 0) {
      const today = new Date();

      for (var i = 0; i < events.length; i++) {
        const event = events[i];
        let when = new Date(event.start.dateTime);
        if (!when)
          when = new Date(event.start.date);

        if (!isSameDate(when, today))
          break;
      }

      setTodaysEvents(events.slice(0, i));
      setFutureEvents(events.slice(i));
    }

  }, [events]);

  if (!isAuthorized)
    return <Authorization isAuthorized={ isAuthorized } />

  return (
    <Row id="Calendar" className="flex-grow-1 m-2">
      <EventList events={ todaysEvents } />
      <EventList events={ futureEvents } condensed="true" />
    </Row>
  );
};

export default Calendar;
