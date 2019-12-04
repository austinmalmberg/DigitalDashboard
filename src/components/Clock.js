import React from 'react';

import { formatTime } from '../helpers/dateTime';

import config from '../config';

const Clock = ({ date }) => {

  return (
    <div className="clock--panel">
      <h1 className="clock">{ formatTime(date, config.clock.militaryTime) }</h1>
    </div>
  );
};

export default Clock;
