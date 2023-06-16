import { Button,  Col, Form,  Input, Row,  Typography } from 'antd';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import 'antd/dist/antd.css';
import { useDispatch } from 'react-redux';
import  { userActions } from '../../redux/userSlice';
import { login, uploadGoogleAccount } from '../../services/auth/AuthService';
import { PATHS } from '../../routes/paths';
import { notificationActions } from '../../redux/notificationSlice';
import { useForm } from 'antd/es/form/Form';
import {  useGoogleLogin } from '@react-oauth/google';
import useAuth from '../hooks/use-auth';



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

const Login = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [googleIsLoading, googleSetIsLoading] = useState(false);
  const { isAuthenticated } = useAuth();
  const dispatch = useDispatch();
  const [form] = useForm();
  const navigate = useNavigate();


  async function onFinishForm(data) {
    try {
      setIsLoading(true);
      const response = await login(data);

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


  const googleLogin = useGoogleLogin({
    flow: 'auth-code',
    onSuccess: async (codeResponse) => {
      const response = await uploadGoogleAccount({
        code: codeResponse.code,
      });

      dispatch(userActions.login(response));
      navigate(PATHS.home);

    },
    onError: errorResponse => console.log(errorResponse),
  });


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
            {...formItemLayout}
            form={form}
            requiredMark={'optional'}
            className={'auth-form'}
          >
            <Form.Item
              name={'email'}
              label={
                <Typography.Title level={5}>
                  Email
                </Typography.Title>
              }
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
                  width: '100%',
                  height: '50px',
                }}
              ></Input>
            </Form.Item>
            <Form.Item
              name={'password'}
              label={
                <Typography.Title level={5}>
                  Password
                </Typography.Title>
              }
              labelAlign={'left'}
              rules={[
                {
                  required: true,
                  message: 'Please enter a password',
                },
              ]}
              hasFeedback
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
          <Row>
            <Col span={12}>

              <Button
                block
                icon={<img src='https://img.icons8.com/fluency/28/null/google-logo.png' style={{
                  float: 'left',
                  marginLeft: '10%',
                }} />}
                size='large'
                onClick={() => googleLogin()}
                style={{
                  background: '#fff',
                  border: 'none',
                  boxShadow: '0px 4px 14px rgba(0, 0, 0, 0.1)',
                  borderRadius: '8px',
                  fontWeight: 'bold',
                  fontSize: '16px',
                  color: '#707070',
                  margin: '10px',
                  padding: '7px',
                  width: '20rem',
                }}
              >
                Sign in with Google
              </Button>

              <Button
                size="large"
                variant="contained"
                onClick={() => navigate(PATHS.auth.reset)}
              >
                Forgot your password?
              </Button>


            </Col>
          </Row>
        </Col>
      </Row>
    </>
  )
    ;
};

export default Login;

