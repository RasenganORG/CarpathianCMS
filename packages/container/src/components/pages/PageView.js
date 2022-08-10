import React from 'react';
import { Col, Row } from 'antd';
import CalendarGeneratedApp from '../widgets-mfe/CalendarGeneratedApp';

export default () => {

  return (
    <Row>
      <Col offset={3} span={18}>
        <CalendarGeneratedApp />
      </Col>
    </Row>
  );
}
