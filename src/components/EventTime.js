import React from 'react';

const EventTime = ({ startTime, endTime }) => (
  <div className="event--time muted">
    <p>{ startTime }</p>
    { endTime && <p>{ endTime }</p> }
  </div>
);

export default EventTime;
