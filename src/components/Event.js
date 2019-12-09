import React from 'react';

import EventTime from './EventTime';
import EventSummary from './EventSummary';

const Event = ({ summary, startTime, endTime, compact }) => {

  if (!(startTime && endTime)) {
    return (
      <div className="event">
        <EventSummary summary={ summary } />
      </div>
    );
  }

  return (
    <div className="event">
      <EventTime
        startTime={ startTime }
        endTime={ compact ? null : endTime }
      />
      <EventSummary summary={ summary } />
    </div>
  );
};

export default Event;
