import React from 'react';

import Event from './Event';

import { formatTime } from '../helpers/dateTime';

const EventList = ({ events, compact }) => {

  if (events.length === 0) {
    return (
      <div className="events muted">
        <Event summary={ `Nothing scheduled` } compact={ compact } />
      </div>
    );
  }

  if (events.length > 4 && compact) {
    events.slice(0, 4);
  }

  return (
    <div className="events">
      { events.map((event, key) => (
        <Event
          key={ key }
          summary={ event.summary }
          startTime={ formatTime(new Date(event.start.dateTime || event.start.date)) }
          endTime={ formatTime(new Date(event.end.dateTime || event.end.date)) }
          compact={ compact }
        />
      ))}
    </div>
  );
};

export default EventList;
