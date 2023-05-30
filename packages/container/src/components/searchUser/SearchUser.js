import { AutoComplete, Button, Divider, Form, Input, Select, Space, Typography } from 'antd';
import { InfoCircleOutlined, SearchOutlined } from '@ant-design/icons';
import React, { useState } from 'react';
import Search from 'antd/es/input/Search';
import { searchUser } from '../../services/user/UsersService';

const formItemLayout = {
  labelCol: {
    xs: { span: 24 },
    md: { span: 24 },
  },
  wrapperCol: {
    xs: { span: 24 },
    md: { span: 24 },
  },
};

export default function SearchUser({ form, setSelectedUser }) {
  const [buttonLoading, setButtonLoading] = useState(false);
  const [options, setOptions] = useState([]);

  const onSearchUser = async () => {
    try {
      setButtonLoading(true);
      const searchedUser = form.getFieldValue('searchUser');
      if (searchedUser) {
        const response = await searchUser(searchedUser);
        const options = response.map(user => {
          return {
            label:
              <Space
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                }}>
                <Typography.Text>{user.email}</Typography.Text>
                <Typography.Text> {user.firstName} {user.lastName}</Typography.Text>
              </Space>,
            value: user.email,
            user:user
          };
        });
        if (options.length > 0)
          setOptions(options);
        else setOptions([{ label: 'No results found', value: '' }]);

      } else {
        setOptions([]);
      }

      setButtonLoading(false);
    } catch (error) {

    }
  };

  const onSelect = (value, option) => {
    setSelectedUser(option.user)
  };

  return (
    <>
      <Form.Item
        name={'searchUser'}
        labelAlign={'left'}
        label={'Search user'}
        tooltip={{
          icon: <InfoCircleOutlined />,
          title: 'Search for a user to manage his permissions for this page',
          placement: 'right',
        }}
        {...formItemLayout}
      >
        <AutoComplete
          dropdownMatchSelectWidth={252}
          options={options}
          onSelect={onSelect}
          onSearch={onSearchUser}
        >
          <Search
            placeholder='Search by email or name'
            allowClear
            enterButton={<Button onClick={onSearchUser} icon={<SearchOutlined />} />}
            loading={buttonLoading}
            size='large'
            style={{
              width: '100%',
              height: '50px',
            }}
          />
        </AutoComplete>

      </Form.Item>

    </>
  );
}

