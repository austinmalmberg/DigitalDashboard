import React from 'react';

import Header from './Header';
import EventList from './EventList';

const SecondaryEvents = ({ date, events, weather }) => {

  return (
    <div className="secondary">
      <Header date={ date } compact="true" weather={ weather }/>
      <EventList events={ events } compact="true" />
    </div>
  );
};

export default SecondaryEvents;
