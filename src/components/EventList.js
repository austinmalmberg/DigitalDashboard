import React from 'react';
import Col from 'react-bootstrap/Col';
import Event from './Event';

import { getDayInWeek, formatDate } from '../helpers/dateTime';

const EventList = ({ date, events, condensed }) => {

  if (condensed) {
    return (
      <p>Working on it</p>
    );
  }

  return (
    <>
      { events.map((event, key) => (
        <Event
          key={ key }
          summary={ event.summary }
          startDate={ event.start.dateTime ? new Date(event.start.dateTime) : new Date(event.start.date) }
          endDate={ event.end.dateTime ? new Date(event.end.dateTime) : new Date(event.end.date) }
        />
      ))}
    </>
  );
};

export default EventList;
