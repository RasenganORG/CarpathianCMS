import PropTypes from 'prop-types';
import useIsMountedRef from '../hooks/useIsMountedRef';
import { Button, Form, Input, Space, Typography } from 'antd';
import React, { useState } from 'react';
import { resetPassword } from '../../services/user/UsersService';


ResetPasswordForm.propTypes = {
  onSent: PropTypes.func,
  onGetEmail: PropTypes.func,
};

const formItemLayout = {
  labelCol: {
    xs: { span: 24 },
    md: { span: 24 },
  },
  wrapperCol: {
    xs: { span: 24 },
    md: { span: 20 },
  },
};

export default function ResetPasswordForm({ onSent, onGetEmail }) {
  const isMountedRef = useIsMountedRef();
  const [isSubmitting, setIsSubmitting] = useState(false)



  const onSubmit = async data => {
    try {
      setIsSubmitting(true)

      resetPassword(data.email)

      if (isMountedRef.current) {
        onSent();
        onGetEmail(data.email);
      }
    } catch (error) {
      console.error(error);
    }
    setIsSubmitting(false)
  };

  return (
    <Form
      onFinish={onSubmit}

      {...formItemLayout}
    >
      <Space
        direction={'vertical'}
        align={'center'}
        style={{
          width:'100%',
        }}
        size={30}
      >
        <Form.Item
          name={'email'}
          label={
            <Typography.Title level={5}>
              Email
            </Typography.Title>
          }
          style={{
            width: '20rem',
            flexDirection:'column',
            display: 'flex',
            minHeight: '100%',
            alignItems: 'center',
            justifyContent: 'center',
          }}
          labelAlign={'left'}
          rules={[
            {
              type: 'email',
              message: 'The input is not valid E-mail!',
            },
            {
              required: true,
              message: 'Please enter your E-mail',
            },
          ]}
          hasFeedback
        >
          <Input
            placeholder={'Enter email'}
            allowClear
            style={{
              width: '20rem',
              height: '50px',
            }}
          ></Input>
        </Form.Item>

        <Form.Item
          style={{
            width: '20rem',
            height: '50px',
            flexDirection:'row',
            display: 'flex',
            justifyContent: 'center',
          }}
        >
          <Button
            type={'primary'}
            htmlType={'submit'}
            style={{
              width: '20rem',
              height: '50px',
            }}
            size={'large'}
            loading={isSubmitting}
            disabled={isSubmitting}
          >
            Reset
          </Button>
        </Form.Item>
      </Space>
    </Form>
  );
}