import { Button, Tooltip, Typography } from 'antd';
import React from 'react';
import PropTypes from 'prop-types';

MenuButton.propTypes = {
  title: PropTypes.string,
  tooltipTitle: PropTypes.string,
  onClick: PropTypes.func,
}


export default function MenuButton ({ title, tooltipTitle, onClick }) {

  return (
    <Button
      type={'text'}
      onClick={onClick}>
      <Tooltip
        title={tooltipTitle}
        style={{
          display: 'flex',
          flexDirection: 'row',
        }}
      >
        <Typography.Title level={5}>
          {title}
        </Typography.Title>
      </Tooltip>
    </Button>);
};

