import { Button, Card, Col, Drawer, Row } from 'antd';
import React, { useState } from 'react';
import CardAddWidgetItem from '../../layouts/cards/CardAddWidgetItem';

const AddWidgets = () => {
  const [visible, setVisible] = useState(false);

  const showDrawer = () => {
    setVisible(true);
  };

  const onClose = () => {
    setVisible(false);
  };

  return (
    <div className='site-drawer-render-in-current-wrapper'>
      <div
        style={{
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-around',
          alignItems: 'center',
        }}
      >
        <Button type='primary' onClick={showDrawer}>
          Add more widgets on your page
        </Button>
      </div>
      <Drawer
        title='Choose what widgets you want to add on this page'
        placement='right'
        closable={false}
        onClose={onClose}
        visible={visible}
        getContainer={false}
        width={'100%'}
        extra={<Button onClick={onClose}>Close</Button>}
        style={{
          position: 'absolute',
        }}
      >
        <Row>
          <Col span={4}>
            <CardAddWidgetItem
              src={'https://img.icons8.com/ios/50/000000/swithching-between-tabs.png'}
              name={'Add tabs'} />
          </Col>
          <Col span={4} offset={1}>
            <CardAddWidgetItem
              src={'https://img.icons8.com/ios-glyphs/50/000000/accordion.png'}
              name={'Add accordion'} />
          </Col>
          <Col span={4} offset={1}>
            <CardAddWidgetItem
              src={'https://img.icons8.com/ios-glyphs/50/000000/table-1.png'}
              name={'Add tabel'} />
          </Col>
          <Col span={4} offset={1}>
            <CardAddWidgetItem
              src={'https://img.icons8.com/material-outlined/50/000000/image.png'}
              name={'Add an image'} />
          </Col>

          <Col span={4} offset={1}>
            <CardAddWidgetItem
              src={'https://img.icons8.com/external-simple-line-edt.graphics/50/000000/external-Images-images-simple-line-edt.graphics.png'}
              name={'Add multiple image'} />
          </Col>
        </Row>

        <Row style={{
          marginTop:35,
        }}>
          <Col span={4}>
            <CardAddWidgetItem
              src={'https://img.icons8.com/ios-filled/50/000000/paragraph.png'}
              name={'Add paragraph'} />
          </Col>
          <Col span={4} offset={1}>
            <CardAddWidgetItem
              src={'https://img.icons8.com/ios/50/000000/list--v1.png'}
              name={'Add list'} />
          </Col>
          <Col span={4} offset={1}>
            <CardAddWidgetItem
              src={'https://img.icons8.com/material-outlined/50/000000/comments--v1.png'}
              name={'Add comments'} />
          </Col>
          <Col span={4} offset={1}>
            <CardAddWidgetItem
              src={'https://img.icons8.com/pix/50/000000/experimental-calendar-pix.png'}
              name={'Add a calendar'} />
          </Col>
          <Col span={4} offset={1}>
            <CardAddWidgetItem
              src={'https://img.icons8.com/ios/50/000000/form.png'}
              name={'Add a form'} />
          </Col>
        </Row>
      </Drawer>
    </div>
  );
};

export default AddWidgets;
//todo tabs, accordion,table, fileUpload, input textarea, list, calendar, comments