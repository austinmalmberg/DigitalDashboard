import React, { useState, useEffect } from 'react';

import { formatTime, isSameDate } from '../helpers/dateTime';

const Clock = ({ date, setDate }) => {

  const [ dateTime, setDateTime ] = useState(new Date());

  // initialize interval to update clock time
  useEffect(() => {
    let timerId;

    const d = new Date();
    setDateTime(d);

    // syncs the interval with the system clock so they "tick" together
    const timeSyncId = setTimeout(() => {
      timerId = setInterval(() => setDateTime(new Date()), 1000);
    }, 1000 - d.getTime() % 1000);

    return () => {
      if (timeSyncId) clearTimeout(timeSyncId);
      if (timerId) clearInterval(timerId);
    };
  }, []);

  // called every rerender (every second) to determine if the date changed
  // which updates the calendar in the main app
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
