import React from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import { formatTime } from '../helpers/dateTime';

const Event = ({ summary, startDate, endDate }) => {

  return (
    <div className="my-2">
      <Col>
        <Row>{ formatTime(startDate) }</Row>
        <Row>{ formatTime(endDate) }</Row>
      </Col>
      <Col>
        <h2>{ summary }</h2>
      </Col>
    </div>
  );
};

export default Event;
