import React from 'react';
import Toolbar from '../toolbar/Toolbar';
import { Col, Row } from 'antd';
import CalendarGeneratedApp from '../widgets-mfe/CalendarGeneratedApp';
import BlocksManager from '../blocks/BlocksManager';
import AddBlock from '../blocks/AddBlock';

export default () => {

  return (
    <Row gutter={[20,50]}>
      <Col offset={3} span={18}>
        <BlocksManager/>
      </Col>
      <Col offset={3} span={18} >
        <AddBlock/>
      </Col>

    </Row>
  );
}
