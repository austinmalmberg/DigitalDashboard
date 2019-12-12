import React, { useState, useEffect } from 'react';

import getContextRemarks from '../helpers/timeContext';

const Event = ({ event, forDate, compact }) => {

  const [ start, setStart ] = useState(null);
  const [ end, setEnd ] = useState(null);
  const [ summary, setSummary ] = useState('');

  useEffect(() => {
    const startDate = new Date(event.start.dateTime || `${event.start.date}T00:00:00`);
    const endDate = new Date(event.end.dateTime || `${event.end.date}T00:00:00`);

    const [ startRemarks, endRemarks ] = getContextRemarks(forDate, [startDate, endDate]);

    setStart(startRemarks);
    // only set end time if not compact or no startRemarks
    if ((!compact || !startRemarks) && endRemarks) {
      setEnd(endRemarks);
    }

    setSummary(event.summary);
  }, [event, forDate, compact])

  return (
    <div className="event">
      { (start || end) &&
        <div className="event--time muted">
          { start && <p>{ start }</p> }
          { end && <p>{ end }</p> }
        </div>
      }
      <h3 className="event--summary">{ summary }</h3>
    </div>
  );
};

export default Event;
