import React from 'react';

import Event from './Event';

import { getDayInWeek, formatDate } from '../helpers/dateTime';

const EventList = ({ date, events, condensed }) => {

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
