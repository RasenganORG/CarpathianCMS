import React from 'react';
import { Col, Row } from 'antd';
import CalendarGeneratedApp from '../widgets-mfe/CalendarGeneratedApp';
import BlocksManager from '../blocks/BlocksManager';
import BlockViewManager from '../blocks-view/BlockViewManager';

export default () => {

  return (
    <Row gutter={[20,50]}>
      <Col offset={3} span={18}>
        <BlockViewManager/>
      </Col>
    </Row>
  );
}
