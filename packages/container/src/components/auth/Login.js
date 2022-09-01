import { Button, Card, Col, Form, Image, Input, Row, Space, Typography } from 'antd';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import 'antd/dist/antd.css';
import * as Yup from 'yup';
import { useDispatch } from 'react-redux';
import userSlice, { userActions } from '../../redux/userSlice';
import { login } from '../../services/auth/AuthService';
import { PATHS } from '../../routes/paths';
import { notificationActions } from '../../redux/notificationSlice';

const Login = () => {
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);

  const schema = Yup.object().shape({
    email: Yup.string().email().required('Email is required'),
    password: Yup.string()
      .required('Password is required')
      .min(8, 'Password is too short - should have a minimum length of 8 characters'),
  });

  const navigate = useNavigate();

  async function onFinishForm(data) {
    try {
      setIsLoading(true);
      const response = await login(data);
      console.log(response.code);

      if (response.code === 'ERR_NETWORK')
        throw new Error(response.code);

      if (response.code === 'ERR_BAD_REQUEST')
        throw new Error(response.code);

      dispatch(userActions.login(response));
      dispatch(notificationActions.openNotification({
        message: 'Logged in successfully',
        description: '',
        type: 'success',
      }));
      navigate(PATHS.home);
    } catch (error) {
      if (error.message === 'ERR_NETWORK') {
        dispatch(notificationActions.openNotification({
          message: 'Error',
          description: 'Make sure you have a valid internet connection',
          type: 'error',
        }));
      } else if (error.message === 'ERR_BAD_REQUEST') {
        dispatch(notificationActions.openNotification({
          message: 'Error',
          description: 'Make sure your credentials are valid',
          type: 'error',
        }));
      } else {
        dispatch(notificationActions.openNotification({
          message: 'Error',
          description: 'Error while trying to Log In',
          type: 'error',
        }));
      }
    } finally {
      setIsLoading(false);
    }
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
              navigate('../register');
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
                loading={isLoading}
                disabled={isLoading}
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
