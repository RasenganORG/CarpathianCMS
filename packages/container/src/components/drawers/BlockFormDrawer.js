import {  Drawer } from 'antd';
import React, { useState } from 'react';
import BlockInitialForm from '../blocks/addBlock/BlockInitialForm';

const BlockFormDrawer = ({ form, onClose}) => {


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
          height: '450px',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-around',
          alignItems: 'center',
        }}
      >
      </div>
      <Drawer
        title='Complete the form'
        placement='right'
        closable={false}
        onClose={onClose}
        visible={true}
        getContainer={false}
        width={'100%'}
        style={{
          position: 'absolute',
        }}
      >
        <BlockInitialForm form={form}/>
      </Drawer>
    </div>
  );
};

export default BlockFormDrawer;
