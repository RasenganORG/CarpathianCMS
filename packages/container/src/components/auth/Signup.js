import { Button, Col, Form, Input, Row, Typography } from 'antd';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import 'antd/dist/antd.css';
import * as Yup from 'yup';

const Signup = () => {
  const schema = Yup.object().shape({
    email: Yup.string().email().required('Email is required'),
    firstName: Yup.string().required("Your first name is required"),
    lastName: Yup.string().required("Your last name is required"),
    password: Yup.string()
      .required('Password is required')
      .min(8,'Password is too short - should have a minimum length of 8 characters')
  });

  const navigate = useNavigate();

  function onFinishForm(data) {
    console.log(data);
    navigate('/application/settings');
  }

  const yupSync = {
    async validator({ field }, value) {
      await schema.validateSyncAt(field, { [field]: value });
    },
  };

  return (
    <>
      <Row style={{ marginBottom: 150 }}>
        <Col
          offset={14}
          style={{
            marginTop: 20,
          }}>
          <Typography.Title level={4} style={{
            color: 'darkblue',
          }}>
            Already have an account?
          </Typography.Title>
          <Button
            type={'primary'}
            onClick={() => {
              navigate('/auth/login');
            }}
          >
            <Typography>
              Login Now
            </Typography>
          </Button>
        </Col>
      </Row>
      <Row>
        <Col span={8} offset={1}>
          <img
            width={500}
            src='https://img.freepik.com/free-vector/mobile-login-concept-illustration_114360-135.jpg?t=st=1656595571~exp=1656596171~hmac=f6abf5832abaff87deb0d8729cf1cf54c28cc73f638eae2069dc5fbe882e2edb&w=740'
          />
        </Col>
        <Col span={8} offset={4}>
          <Form
            onFinish={onFinishForm}
            style={{
              width: '400px',
            }}
          >
            <Typography.Title level={5}>
              Email
            </Typography.Title>
            <Form.Item name={'email'} rules={[yupSync]}>
              <Input
                placeholder={'Enter email'}
                required
                allowClear
                style={{
                  width: '100%',
                  height: '50px',
                }}
              ></Input>
            </Form.Item>

            <Typography.Title level={5}>
              First Name
            </Typography.Title>
            <Form.Item name={'firstName'} rules={[yupSync]}>
              <Input
                placeholder={'First Name'}
                required
                allowClear
                style={{
                  width: '100%',
                  height: '50px',
                }}
              ></Input>
            </Form.Item>

            <Typography.Title level={5}>
              Last Name
            </Typography.Title>
            <Form.Item name={'lastName'} rules={[yupSync]}>
              <Input
                placeholder={'Last Name'}
                required
                allowClear
                style={{
                  width: '100%',
                  height: '50px',
                }}
              ></Input>
            </Form.Item>

            <Typography.Title level={5}>
              Password
            </Typography.Title>
            <Form.Item name={'password'} rules={[yupSync]}>
              <Input.Password
                placeholder={'Enter Password'}
                required
                style={{
                  width: '100%',
                  height: '50px',
                }}
              >
              </Input.Password>
            </Form.Item>
            <Form.Item>
              <Button
                block
                type={'primary'}
                htmlType={'submit'}
                style={{
                  backgroundColor: 'aliceblue',
                  color: 'black',
                }}
                size={'large'}
              >
                Sign up
              </Button>
            </Form.Item>
          </Form>
        </Col>
      </Row>
    </>
  )
    ;
};

export default Signup;