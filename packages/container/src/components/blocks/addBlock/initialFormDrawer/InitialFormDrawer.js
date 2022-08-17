import { Drawer} from 'antd';
import React from 'react';
import BlockInitialForm from '../BlockInitialForm';

const InitialFormDrawer = ({ form }) => {


  return (
    <div style={{
      position: 'relative',
      height: '450px',
      width: '900px',
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
        <BlockInitialForm form={form}/>
      </Drawer>
    </div>
  );
};

export default InitialFormDrawer;
