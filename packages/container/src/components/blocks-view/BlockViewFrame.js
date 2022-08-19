import React from 'react';
import { Typography } from 'antd';
import PropTypes from 'prop-types';

BlockViewFrame.propTypes = {
  children: PropTypes.node,
  id: PropTypes.string,
  name: PropTypes.string,
}

export default function BlockViewFrame ({children,id,name}) {

  return(
    <div>
      {name && <Typography.Title level={5}>
        {name}
      </Typography.Title>}
      {children}
    </div>
  )
};

