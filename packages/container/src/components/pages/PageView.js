import React from 'react';
import { Col, Row } from 'antd';
import CalendarGeneratedApp from '../widgetsMfe/CalendarGeneratedApp';
import BlocksManager from '../blocks/BlocksManager';
import BlockViewManager from '../blocksView/BlockViewManager';

export default () => {

  return (
    <Row gutter={[20,50]}>
      <Col offset={3} span={18}>
        <BlockViewManager/>
      </Col>
    </Row>
  );
}
