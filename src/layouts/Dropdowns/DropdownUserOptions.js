import { Dropdown, Menu, Space } from 'antd';
import { EditFilled } from '@ant-design/icons';

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
          {
            key: 'updateInfo',
            label: 'Update Info',
          },
        ],
      },
      {
        key: '2',
        label: 'Notify',
        children: [
          {
            key: 'sendEmail',
            label: 'Send Email',
          },
          {
            key: 'sendWarning',
            label: 'Send Warning',
          },
        ],
      },
    ]}
  />
);

const DropdownUserOptions = ({payload}) => (
  <Dropdown overlay={menu}>
    <a onClick={e => e.preventDefault()}>
      <Space
        style={{
          display:'flex',
          justifyContent:'center'
        }}
      >
        <EditFilled />
      </Space>
    </a>
  </Dropdown>
);

export default DropdownUserOptions;