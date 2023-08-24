import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Typography, Button, Row, Col } from 'antd';
import PageNotFoundIllustration from '../assets/illustration_404';
import ComingSoonIllustration from '../assets/illustration_coming_soon';
import AddNewPageForm from './AddNewPageForm';

const { Title, Text } = Typography;

const PageEmptySite = () => {
  const [newPageModalIsOpened, setNewPageModalIsOpened] = useState(false);


  return (
    <div style={{ minHeight: '100vh' }}>
      <Row justify="center" align="middle" style={{ paddingTop: '7vh', paddingBottom: '5vh' }}>
        <Col xs={24} sm={18} md={12} lg={8}>
          <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} exit={{ scale: 0 }}>
            <Title level={3}>Hello there!</Title>
          </motion.div>
          <Text type="secondary">
            This is your starting point. Your website has no pages. Please go ahead and create some pages.
          </Text>
          <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} exit={{ scale: 0 }}>
            <ComingSoonIllustration style={{ height: 260, marginTop: '5vh', marginBottom: '10vh' }} />
          </motion.div>
          <Button type="primary" size="large" block onClick={() => setNewPageModalIsOpened(true)}>
            Create new Page
          </Button>
        </Col>
      </Row>
      <AddNewPageForm
        setNewPageModalIsOpened={setNewPageModalIsOpened}
        newPageModalIsOpened={newPageModalIsOpened} />
    </div>
  );
};

export default PageEmptySite;