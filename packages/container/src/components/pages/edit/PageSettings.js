import React from 'react';
import DeletePageButton from './DeletePageButton';
import { Col, Row } from 'antd';

const PageSettings = () => {


  return (

    <Row>
      <Col offset={2} span={22}>
        <DeletePageButton />
      </Col>
    </Row>
  );
};

export default PageSettings;
