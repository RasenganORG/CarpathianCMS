import { Form, Input, Typography } from 'antd';
import React from 'react';

const AddNewLineForm = () => {

  const onFinishAddANewLineForm = (data) => {
    console.log(data);
  };

  return(
    <Form
      onFinish={onFinishAddANewLineForm}
      style={{
        width: '400px',
      }}
    >
      <Typography.Title level={5}>
        Name
      </Typography.Title>
      <Form.Item name={'name'}>
        <Input
          placeholder={'Enter name'}
          required
          allowClear
          style={{
            width: '100%',
            height: '50px',
          }}
        ></Input>
      </Form.Item>
      <Typography.Title level={5}>
        Age
      </Typography.Title>
      <Form.Item name={'age'}>
        <Input
          placeholder={'Enter age'}
          required
          allowClear
          style={{
            width: '100%',
            height: '50px',
          }}
        ></Input>
      </Form.Item>
      <Typography.Title level={5}>
        Address
      </Typography.Title>
      <Form.Item name={'address'}>
        <Input
          placeholder={'Enter address'}
          required
          allowClear
          style={{
            width: '100%',
            height: '50px',
          }}
        ></Input>
      </Form.Item>
    </Form>
  )
}

export default AddNewLineForm