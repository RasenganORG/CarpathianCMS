import { Button, Card, Typography } from 'antd';
import React from 'react';

const CardVariantItem = (props) => {

  return (

    <Card
      hoverable
      style={{
        display: 'flex',
        flexDirection: 'column',
        minHeight: '130px',
        minWidth: '160px',
      }}
    >
      <Button
        onClick={() => props.onClick(props.type)}
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
export default CardVariantItem;