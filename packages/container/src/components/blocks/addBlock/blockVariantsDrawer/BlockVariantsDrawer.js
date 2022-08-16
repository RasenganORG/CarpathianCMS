import { Button, Card, Col, Drawer, Row } from 'antd';
import React, { useState } from 'react';
import CardVariantItem from '../CardVariantItem';
import BlockVariants from '../BlockVariants';

const BlockVariantsDrawer = ({onNext, setFieldValue}) => {


  return (
    <div style={{
      position: 'relative',
      height: '450px',
      width: '100%',
      padding: '48px',
      overflow: 'hidden',
      textAlign: 'center',
      background: '#fafafa',
      border: '1px solid #ebedf0',
      borderRadius:' 2px',
    }}>
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-around',
          alignItems: 'center',
        }}
      >
      </div>
      <Drawer
        title='Choose what widgets you want to add on this page'
        placement='right'
        closable={false}
        onClose={() => false}
        visible={true}
        getContainer={false}
        width={'100%'}
        style={{
          position: 'absolute',
          height: '450px',
        }}
      >
        <BlockVariants onNext={onNext} setFieldValue={(name, value) => setFieldValue(name, value)}/>
      </Drawer>
    </div>
  );
};

export default BlockVariantsDrawer;
