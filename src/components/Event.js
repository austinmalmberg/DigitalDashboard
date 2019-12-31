import React, { useState, useEffect } from 'react';

import Contributor from './Contributor';

import getContextRemarks from '../helpers/timeContext';
import config from '../config';

const Event = ({ event, forDate, compact }) => {

  const [ start, setStart ] = useState(null);
  const [ end, setEnd ] = useState(null);
  const [ contributor, setContributor ] = useState(undefined);
  const [ summary, setSummary ] = useState('');

  useEffect(() => {
    const startDate = new Date(event.start.dateTime || `${event.start.date}T00:00:00`);
    const endDate = new Date(event.end.dateTime || `${event.end.date}T00:00:00`);

    const [ startRemarks, endRemarks ] = getContextRemarks(forDate, [startDate, endDate]);

    setStart(startRemarks);
    // only set end time if not compact or no startRemarks
    if (endRemarks && (!compact || !startRemarks)) {
      setEnd(endRemarks);
    }

    let summary = event.summary;

    if (summary.includes('[all]')) {

      summary = summary.split('[all]').join('').trim();

    } else {
      // try to get the contributor from the config file that matches the creator of the event
      const contributor = config.calendar.contributors.find(contributor => contributor.email === event.creator.email);

      if (contributor) setContributor(contributor);
    }

    setSummary(summary);

  }, [event, forDate, compact]);

  return (
    <div className="event">
      { (start || end) &&
        <div className="event--time muted" /*style={ contributor && { color: contributor.prefColor } }*/>
          { start && <p>{ start }</p> }
          { end && <p>{ end }</p> }
        </div>
      }

      <div className="event--details">
        { contributor && <Contributor contributor={ contributor } /> }
        <h3 className="event--summary">{ summary }</h3>
      </div>
    </div>
  );
};

export default Event;
