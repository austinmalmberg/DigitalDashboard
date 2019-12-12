import React, { useState, useEffect } from 'react';

const EventTime = ({ event, forDate, compact }) => {

  const [ start, setStart ] = useState(null);
  const [ end, setEnd ] = useState(null);

  useEffect(() => {
    const startDate = new Date(event.start.dateTime || `${event.start.date}T00:00:00`);
    const endDate = new Date(event.end.dateTime || `${event.end.date}T00:00:00`);

    const start = isSameDate(forDate, startDate) ? formatTime(startDate) : null;
    setStart(start);

    const end = isSameDate(forDate, endDate) ? formatTime(endDate) : null;
    setEnd(end);
  }, [event, forDate])

  return (
    <div className="event--time muted">
      { start && <p>{ start }</p> }
      { (!compact && end) && <p>{ end }</p> }
    </div>
  );
};

export default EventTime;
