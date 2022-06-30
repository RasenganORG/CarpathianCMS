import { Button, Col, Form,  Input, Row, Typography } from 'antd';
import {useNavigate} from 'react-router-dom'
import 'antd/dist/antd.css';

const Signup = () => {
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
            Already have an account?
          </Typography.Title>
          <Button
            type={'primary'}
            onClick={() => {
              navigate('/auth/login')
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
              First Name
            </Typography.Title>
            <Form.Item name={'firstName'}>
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
            <Form.Item name={'lastName'}>
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