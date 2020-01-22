import React from 'react';

import Event from './Event';

const EventList = ({ events, eventColors, forDate, compact }) => {

  if (!events) {
    return (
      <div className="events"></div>
    );
  }

  return (
    <div className="events">
      { events.map((event, key) => (
        <Event
          key={ key }
          event={ event }
          eventColors={ eventColors }
          forDate={ forDate }
          compact={ compact }
        />
      ))}
    </div>
  );
};

export default EventList;
