import React, { useState, useEffect } from 'react';

import { formatTime, isSameDate, normalizeDate } from '../helpers/dateTime';

import config from '../config';

const Clock = ({ appDate, setAppDate, theme }) => {

  const [ date, setDate ] = useState(new Date());

  const formatOptions = {
    hour: 'numeric',
    minute: '2-digit',
    hour12: !config.militaryTime,
  };
  if (config.displaySeconds)
    formatOptions.second = '2-digit';

  useEffect(() => {
    const now = new Date();
    const updateInterval = config.displaySeconds ? 1000 : 1000 * 60;
    const [ timeoutId, intervalId ] = syncClocks(now, updateInterval);

    // syncs the interval with the system clock so they tick together
    function syncClocks(now, updateInterval) {
      let intervalId;
      const timeoutId = setTimeout(() => {
        setDate(new Date());
        intervalId = setInterval(() => setDate(new Date()), updateInterval);
      }, updateInterval - now.getTime() % updateInterval);

      return [ timeoutId, intervalId ];
    }

    // clean up
    return () => {
      if (timeoutId) clearTimeout(timeoutId);
      if (intervalId) clearInterval(intervalId);
    };
  }, []);

  useEffect(() => {
    // updates the appDate, when necessary
    if (!isSameDate(date, appDate)) setAppDate(normalizeDate(date));
  }, [date, appDate, setAppDate]);

  return (
    <div className="clock--panel" style={ theme && theme.clock }>
      <h1 className="clock">{ formatTime(date, formatOptions) }</h1>
    </div>
  );
};

export default Clock;
