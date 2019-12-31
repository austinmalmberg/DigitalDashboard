import React from 'react';

const Contributor = ({ contributor }) => (
  <span
    className="contributor"
    style={ contributor.style }>{ contributor.displayName }
  </span>
);

export default Contributor;
