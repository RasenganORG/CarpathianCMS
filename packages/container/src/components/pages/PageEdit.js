import React from 'react';
import { Col, Row } from 'antd';
import BlocksManager from '../blocks/BlocksManager';

export default () => {

  return (
    <Row gutter={[20,50]}>
      <Col offset={3} span={18}>
        <BlocksManager/>
      </Col>

    </Row>
  );
}
