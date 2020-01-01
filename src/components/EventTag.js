import React from 'react';

const EventTag = ({ tag }) => (
  <span
    className="tag"
    style={ tag.style }>{ tag.displayText }
  </span>
);

export default EventTag;
