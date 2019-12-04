import React from 'react';

import EventTime from './EventTime';
import EventSummary from './EventSummary';

const Event = ({ summary, startTime, endTime, compact }) => {

  if (startTime === undefined && endTime === undefined) {
    return (
      <div className={ compact ? "event--small" : "event" }>
        <EventSummary summary={ summary } />
      </div>
    );
  }

  return (
    <div className={ compact ? "event--small" : "event" }>
      <EventTime
        startTime={ startTime }
        endTime={ compact ? null : endTime }
      />
      <EventSummary summary={ summary } />
    </div>
  );
};

export default Event;
