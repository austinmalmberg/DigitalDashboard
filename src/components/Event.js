import React from 'react';

import EventSummary from './EventSummary';

import { formatTime } from '../helpers/dateTime';

const Event = ({ summary, startDate, endDate }) => {

  return (
    <div className={ "event"+ (endDate == null ? "--small" : "") } >
      <div className="event--time">
        <p>{ formatTime(startDate) }</p>
        { endDate && <p>{ formatTime(endDate) }</p> }
      </div>
      <EventSummary summary={ summary } />
    </div>
  );
};

export default Event;
