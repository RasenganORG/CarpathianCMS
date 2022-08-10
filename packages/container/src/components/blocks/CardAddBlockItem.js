import {  Card, Typography } from 'antd';
import React from 'react';

const CardAddBlockItem = (props) => {

  return (
    <Card
      hoverable
      style={{
        display:'flex',
        flexDirection:'column',
        minHeight:'150px'
      }}
    >
      <img
        style={{
          width: 50,
        }}
        src={props.src} />
      <Typography>
        {props.name}

      </Typography>
    </Card>
  );
};
export default CardAddBlockItem;