import { Button, Empty } from 'antd';
import React from 'react';
import { Typography } from 'antd/es';
import { useNavigate } from 'react-router-dom';

const EmptyPage = () => {
  const navigate = useNavigate();

  return (

    <Empty
      image='https://gw.alipayobjects.com/zos/antfincdn/ZHrcdLPrvN/empty.svg'
      imageStyle={{
        height: 160,
      }}
      description={
        <Typography.Text
          style={{
            marginTop: '3rem',
            fontSize: '20px',
          }}>
          There are no blocks on your page.
        </Typography.Text>
      }
    >
      <Button
        type='primary'
        onClick={() => navigate('edit')}
      >
        Add Now
      </Button>
    </Empty>
  );
};

export default EmptyPage;
