import React from 'react';

import { isSameDate } from '../helpers/dateTime';

import Header from './Header';
import EventList from './EventList';

const PrimaryCalendar = ({ date, events, weather }) => {

  return (
    <div className="primary">
      <Header date={ date } weather={ weather } />
      <EventList events={ events.filter(event => isSameDate(event.start.dateTime || event.start.date, date)) } />
    </div>
  );
};

export default PrimaryCalendar;
