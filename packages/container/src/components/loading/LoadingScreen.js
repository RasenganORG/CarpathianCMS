import { Card, Col, Grid, Row, Spin, Typography } from 'antd';
import React from 'react';
import { LoadingOutlined } from '@ant-design/icons';

const antIcon = <LoadingOutlined   style={{ fontSize: 100 }} spin />;


const LoadingScreen = () => {

  return (
    <Row style={{
      width: '100%',
      height: '100vh',
    }}
         align={'middle'}>
      <Col
        offset={11}
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Spin indicator={antIcon} />
        <Typography.Title
          style={{
            fontSize:'16px',
            marginTop: '50px',
          }}>
          Loading...
        </Typography.Title>
      </Col>
    </Row>
  );
};

export default LoadingScreen;