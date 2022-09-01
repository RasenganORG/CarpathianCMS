import { Button, Col, Form, Input, Row, Typography } from 'antd';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import 'antd/dist/antd.css';
import * as Yup from 'yup';
import { login, register } from '../../services/auth/AuthService';
import { useDispatch } from 'react-redux';
import { userActions } from '../../redux/userSlice';
import { PATHS } from '../../routes/paths';
import { notificationActions } from '../../redux/notificationSlice';

const Signup = () => {
  const [buttonDisabled, setButtonDisabled] = useState(false)
  const dispatch = useDispatch()
  const schema = Yup.object().shape({
    email: Yup.string().email().required('Email is required'),
    firstName: Yup.string().required("Your first name is required"),
    lastName: Yup.string().required("Your last name is required"),
    password: Yup.string()
      .required('Password is required')
      .min(8,'Password is too short - should have a minimum length of 8 characters')
  });

  const navigate = useNavigate();

  async function onFinishForm(data) {
    try {
      setButtonDisabled(true)
      const response = await register(data)

      if (response.code === "ERR_NETWORK")
        throw new Error(response.code);

      if(response.error)
        throw new Error(response.error.message)

      dispatch(userActions.login(response))
      dispatch(notificationActions.openNotification({
        message: 'User created successfully',
        description: '',
        type: 'success',
      }));
      navigate(PATHS.home)
    }
    catch (error){
      if (error.message === 'ERR_NETWORK') {
        dispatch(notificationActions.openNotification({
          message: 'Error ',
          description: 'Make sure you have a valid internet connection',
          type: 'error',
        }));
      }else if (error.message === "EMAIL_EXISTS") {
        dispatch(notificationActions.openNotification({
          message: 'Error ',
          description: 'This email is already used for an account',
          type: 'error',
        }));
      }
      else{
        dispatch(notificationActions.openNotification({
          message: 'Error ',
          description: 'Error while trying to Sign Up',
          type: 'error',
        }));
      }
    }
    finally {
      setButtonDisabled(false);
    }
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
              navigate(PATHS.auth.login);
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
                disabled={buttonDisabled}
                loading={buttonDisabled}
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
