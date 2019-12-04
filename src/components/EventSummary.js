import React from 'react';

const EventSummary = ({ summary }) => {

  const maxLength = 28;
  if (summary.length > maxLength)
    summary = `${summary.substring(0, maxLength)}...`;

  return (
    <h3 className="event--summary">{ summary }</h3>
  );
};

export default EventSummary;
