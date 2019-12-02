import React, { useState, useEffect } from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import EventList from './components/EventList';

import config from './config';
import { loadApiClient, loadCalendarEvents } from './googleCalendarApi';
import { dateFormats, formatTime, formatDate, getDayInWeek, isSameDate } from './helpers/dateTime';

const App = () => {

  /* CALENDAR */

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


  /* DATE AND TIME */

  const [ date, setDate ] = useState(new Date());

  useEffect(() => {
    const timerId = setInterval(() => setDate(new Date()), 1000);

    return () => clearInterval(timerId);
  }, [date]);



  return (
    <>
      <Container fluid="true" className="row bg-light">
          <Col>

            {/* clock */}
            <Row>
              <h1 className="display-2 mx-auto">{ formatTime(date, config.clock.militaryTime) }</h1>
            </Row>

            {/* main calendar card */}
            <Row className="Today d-flex flex-column border">

              {/* date */}
              <Col className="DateContainer bg-primary py-3 text-center">
                <h2 className="display-4 my-0">{ formatDate(date, dateFormats.businessCasual) }</h2>
                <h2 className="display-3 my-0">{ getDayInWeek(date) }</h2>
              </Col>

              {/* events container */}
              <Col className="Events d-flex flex-column justify-content-start flex-grow-1">
                <EventList events={ todaysEvents } />
              </Col>
            </Row>

          </Col>

          {/* secondary calendar cards */}
          <Col>
            <EventList events={ futureEvents } condensed="true" />
          </Col>
      </Container>
    </>
  );
}

export default App;
