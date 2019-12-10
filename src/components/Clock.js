import React, { useState, useEffect } from 'react';

import { formatTime, isSameDate } from '../helpers/dateTime';

import config from '../config';

const Clock = ({ date, setDate }) => {

  const [ dateTime, setDateTime ] = useState(new Date());

  // initialize interval to update clock time
  useEffect(() => {
    const timerId = setInterval(() => setDateTime(new Date()), 1000);

    return () => {
      if (timerId) clearInterval(timerId);
    };
  }, []);

  // called every second
  // determines if the date changed (not time)
  // if the date changed, setDate on app.
  useEffect(() => {
    if (!isSameDate(date, dateTime) || !date) {
      setDate(dateTime);
    }
  });

  return (
    <div className="clock--panel">
      <h1 className="clock">{ formatTime(dateTime) }</h1>
    </div>
  );
};

export default Clock;
