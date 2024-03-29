import { Dropdown, Menu, Space } from 'antd';
import { EditFilled } from '@ant-design/icons';
import React from 'react';

const menu = (
  <Menu
    items={[
      {
        key: '1',
        type: 'group',
        label: 'User Actions',
        children: [
          {
            key: 'delete',
            label: 'Delete user',
          },
        ],
      },
    ]}
  />
);

const DropdownUserOptions = ({ payload }) => {
  return (
    <Dropdown overlay={menu}>
      <a onClick={e => e.preventDefault()}>
        <Space
          style={{
            display: 'flex',
            justifyContent: 'center',
          }}
        >
          <EditFilled />
        </Space>
      </a>
    </Dropdown>);
};

export default DropdownUserOptions;