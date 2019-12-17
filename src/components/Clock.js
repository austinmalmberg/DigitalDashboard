import React, { useState, useEffect } from 'react';

import { formatTime, isSameDate, normalizeDate } from '../helpers/dateTime';

import config from '../config';

const Clock = ({ appDate, setAppDate, theme }) => {

  const [ date, setDate ] = useState(new Date());

  const matchDates = () => {
    if (!isSameDate(date, appDate)) setAppDate(normalizeDate(date));
  };

  // syncs the interval with the system clock so they tick together
  const syncClocks = (now, updateInterval) => {
    let intervalId;

    const timeoutId = setTimeout(() => {
      setDate(new Date());
      intervalId = setInterval(() => setDate(new Date()), updateInterval);
    }, updateInterval - now.getTime() % updateInterval);

    return [ timeoutId, intervalId ];
  }

  const formatOptions = {
    timeStyle: config.displaySeconds ? 'medium' : 'short',
    hour12: !config.militaryTime,
  };

  useEffect(() => {
    const now = new Date();
    const updateInterval = config.displaySeconds ? 1000 : 1000 * 60;
    const [ timeoutId, intervalId ] = syncClocks(now, updateInterval);

    return () => {
      if (timeoutId) clearTimeout(timeoutId);
      if (intervalId) clearInterval(intervalId);
    };
  }, []);

  useEffect(matchDates, [appDate, date]);

  return (
    <div className="clock--panel" style={ theme && theme.clock }>
      <h1 className="clock">{ formatTime(date, formatOptions) }</h1>
    </div>
  );
};

export default Clock;
