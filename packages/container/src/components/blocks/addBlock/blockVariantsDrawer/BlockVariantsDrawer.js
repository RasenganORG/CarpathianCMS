import {  Drawer } from 'antd';
import React from 'react';
import BlockVariants from '../BlockVariants';
import PropTypes from 'prop-types';

BlockVariantsDrawer.requiredProps = {
  onNext:PropTypes.func,
  setFieldValue: PropTypes.func,
}

export default function BlockVariantsDrawer ({onNext, setFieldValue})  {


  return (
    <div style={{
      position: 'relative',
      height: '400px',
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
        open={true}
        getContainer={false}
        width={'100%'}
        style={{
          position: 'absolute',
          height: '400px',
        }}
      >
        <BlockVariants onNext={onNext} setFieldValue={(name, value) => setFieldValue(name, value)}/>
      </Drawer>
    </div>
  );
};
