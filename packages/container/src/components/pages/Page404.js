import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Typography, Button, Row, Col } from 'antd';
import PageNotFoundIllustration from '../assets/illustration_404';

const { Title, Text } = Typography;

const Page404 = () => {
  return (
    <div style={{ minHeight: '100vh' }}>
      <Row justify="center" align="middle" style={{ paddingTop: '15vh', paddingBottom: '10vh' }}>
        <Col xs={24} sm={18} md={12} lg={8}>
          <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} exit={{ scale: 0 }}>
            <Title level={3}>Sorry, page not found!</Title>
          </motion.div>
          <Text type="secondary">
            Sorry, we couldn’t find the page you’re looking for. Perhaps you’ve mistyped the URL? Be sure to check your
            spelling.
          </Text>
          <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} exit={{ scale: 0 }}>
            <PageNotFoundIllustration style={{ height: 260, marginTop: '5vh', marginBottom: '10vh' }} />
          </motion.div>
          <Button type="primary" size="large" block>
            <Link to="/">Go to Home</Link>
          </Button>
        </Col>
      </Row>
    </div>
  );
};

export default Page404;