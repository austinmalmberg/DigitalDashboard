import React from 'react';

import DayHeader from './DayHeader';
import EventList from './EventList';

const SecondaryEvents = ({ date, events }) => {

  return (
    <div className="secondary">
      <DayHeader date={ date } />
      <EventList events={ events } compact="true" />
    </div>
  );
};

export default SecondaryEvents;
