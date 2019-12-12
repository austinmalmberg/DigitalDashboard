import React, { useState, useEffect } from 'react';

import { isSameDate, formatTime } from '../helpers/dateTime';

const Event = ({ event, forDate, compact }) => {

  const [ start, setStart ] = useState(null);
  const [ end, setEnd ] = useState(null);
  const [ summary, setSummary ] = useState('');

  useEffect(() => {
    const startDate = new Date(event.start.dateTime || `${event.start.date}T00:00:00`);
    const start = isSameDate(forDate, startDate) ? formatTime(startDate) : null;
    setStart(start);

    const endDate = new Date(event.end.dateTime || `${event.end.date}T00:00:00`);
    const end = isSameDate(forDate, endDate) ? formatTime(endDate) : null;
    setEnd(end);

    setSummary(event.summary);
  }, [event, forDate])

  return (
    <div className="event">
      { start &&
        <div className="event--time muted">
          <p>{ start }</p>
          { (!compact && end) && <p>{ end }</p> }
        </div>
      }
      <p className="event--summary">{ summary }</p>
    </div>
  );
};

export default Event;
