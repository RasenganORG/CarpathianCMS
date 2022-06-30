import { Button, Card, Col, Form, Image, Input, Row, Space, Typography } from 'antd';
import {useNavigate} from 'react-router-dom'
import 'antd/dist/antd.css';

const Login = () => {
  const navigate = useNavigate()

  function onFinishForm(data) {
    console.log(data);
    navigate('/settings')
  }

  return (
    <>
      <Row>
        <Col span={3}>
          <div
            style={{
              height: '250px',
            }}
          />
        </Col>
        <Col offset={14}>
          <Typography.Title level={4} style={{
            color:'darkblue'
          }}>
            New here?
          </Typography.Title>
          <Button
            type={'primary'}
            onClick={() => {
              navigate('/auth/register')
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
            src='https://img.freepik.com/free-vector/forgot-password-concept-illustration_114360-1123.jpg?t=st=1656595571~exp=1656596171~hmac=63e63dfae8f62d8b6a1eb7eae6261c2c72784d9b1dce928137478635019b12f2&w=740'
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
            <Form.Item name={'email'}>
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
              Password
            </Typography.Title>
            <Form.Item name={'password'}>
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