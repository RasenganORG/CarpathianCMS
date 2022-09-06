import { AutoComplete, Button, Form, Input, Select } from 'antd';
import { InfoCircleOutlined, SearchOutlined } from '@ant-design/icons';
import React, { useState } from 'react';
import Search from 'antd/es/input/Search';

const formItemLayout = {
  labelCol: {
    xs: { span: 24 },
    md: { span: 24 },
  },
  wrapperCol: {
    xs: { span: 24 },
    md: { span: 12 },
  },
};

export default function UserPermission({ form }) {
  const [buttonLoading, setButtonLoading] = useState(false);
  const [options, setOptions] = useState([])

  const onSearchUser = () => {
    setButtonLoading(true);
    const searchUser = form.getFieldValue('searchUser');
    console.log(searchUser);
    setButtonLoading(false);
  };

  const onSelect = (value) => {
    console.log('onSelect', value);
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
      >
        <AutoComplete
          dropdownMatchSelectWidth={252}
          style={{ width: 300 }}
          options={options}
          onSelect={onSelect}
          onSearch={onSearchUser}
        >
          <Search
            placeholder='input search text'
            allowClear
            enterButton='Search'
            loading={buttonLoading}
            size='large'
            onSearch={onSearchUser}
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

