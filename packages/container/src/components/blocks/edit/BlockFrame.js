import React from 'react';
import { Button, Tooltip, Typography } from 'antd';
import { EditTwoTone } from '@ant-design/icons';
import PropTypes from 'prop-types';

BlockFrame.requiredProps = {
  children: PropTypes.node,
  id:PropTypes.string,
  onClick:PropTypes.func,
  name:PropTypes.string,
}

export default function BlockFrame({ children, id, onClick, name }) {
  return (
    <div
      style={{
        marginBottom: '2rem',
        padding: '1rem',
        backgroundColor:'#FCFEFF ',
      }}
    >
      <div
        style={{
          display: 'flex',
          justifyContent:'space-between',
        }}
      >
        <Typography.Title level={5}>
          {name}
        </Typography.Title>
        <BlockEditButton onClick={onClick} id={id} />
      </div>
      {children}
    </div>
  );
}

const BlockEditButton = ({onClick, id}) => {

  return (
    <Tooltip title={'Edit the current block'}>
      <Button
        shape={'circle'}
        icon={<EditTwoTone />}
        onClick={() => onClick(id)}
      />
    </Tooltip>
  );
};