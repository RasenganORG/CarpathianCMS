import { Button, Card, Typography } from 'antd';
import React from 'react';

const CardAddBlockItem = (props) => {

  return (

    <Card
      hoverable
      style={{
        display: 'flex',
        flexDirection: 'column',
        minHeight: '150px',
      }}
    >
      <Button
        onClick={props.onClick}
        type={'text'}
      >
        <img
          style={{
            width: 50,
          }}
          src={props.src} />
        <Typography>
          {props.name}

        </Typography>
      </Button>

    </Card>
  );
};
export default CardAddBlockItem;