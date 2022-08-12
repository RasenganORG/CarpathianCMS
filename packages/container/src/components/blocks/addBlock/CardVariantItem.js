import { Button, Card, Typography } from 'antd';
import React from 'react';
import {v4 as uuidv4} from 'uuid'

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
        onClick={() => props.onClick(props.name, uuidv4() )}
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