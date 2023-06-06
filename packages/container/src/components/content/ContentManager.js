import { Col,  Row} from 'antd';
import React from 'react';
import ImageManager from './ImageManager';

export const ContentManager = () => {

  return (
    <Row gutter={[30, 50]}>
      <Col offset={5} span={15}>
        <ImageManager/>
      </Col>
    </Row>
  );
};

export default ContentManager;
