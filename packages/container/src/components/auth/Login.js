import { Button, Card, Col, Form, Image, Input, Row, Space, Typography } from 'antd';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import 'antd/dist/antd.css';
import * as Yup from 'yup';
import { useDispatch } from 'react-redux';
import userSlice, { userActions } from '../../redux/userSlice';
import { login } from '../../services/auth/AuthService';
import { PATHS } from '../../routes/paths';

const Login = () => {
  const dispatch = useDispatch();

  const schema = Yup.object().shape({
    email: Yup.string().email().required('Email is required'),
    password: Yup.string()
      .required('Password is required')
      .min(8, 'Password is too short - should have a minimum length of 8 characters'),
  });

  const navigate = useNavigate();

  async function onFinishForm(data) {
    const response = await login(data)
    dispatch(userActions.login(response))
    navigate(PATHS.home)
  }

  const yupSync = {
    async validator({ field }, value) {
      await schema.validateSyncAt(field, { [field]: value });
    },
  };


  return (
    <>
      <Row style={{
        marginBottom: 150,
      }}>
        <Col
          offset={14}
          style={{
            marginTop: 20,
          }}
        >
          <Typography.Title level={4} style={{
            color: 'darkblue',
          }}>
            New here?
          </Typography.Title>
          <Button
            type={'primary'}
            onClick={() => {
              navigate(PATHS.auth.signup);
            }}
          >
            <Typography>
              Register Now
            </Typography>
          </Button>
        </Col>
      </Row>
      <Row>
        <Col span={8} offset={1}>
          <img
            width={500}
            src='https://img.freepik.com/free-vector/forgot-password-concept-illustration_114360-1123.jpg?t=st=1656595571~
            exp=1656596171~hmac=63e63dfae8f62d8b6a1eb7eae6261c2c72784d9b1dce928137478635019b12f2&w=740'
          />
        </Col>
        <Col span={8} offset={4}>
          <Form
            onFinish={onFinishForm}
            style={{
              marginTop: 50,
              width: '400px',
            }}
          >
            <Typography.Title level={5}>
              Email
            </Typography.Title>
            <Form.Item
              name={'email'}
              rules={[yupSync]}
            >
              <Input
                placeholder={'Enter email'}
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
            <Form.Item
              name={'password'}
              rules={[yupSync]}
            >
              <Input.Password
                placeholder={'Enter Password'}

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
                Log in
              </Button>
            </Form.Item>
          </Form>
        </Col>
      </Row>
    </>
  )
    ;
};

export default Login;