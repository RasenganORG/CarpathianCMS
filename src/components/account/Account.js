import { Button, Form, Input, Typography } from 'antd';
import 'antd/dist/antd.css';
import { useNavigate } from 'react-router-dom';
import UploadImage from '../upload/UploadImage';


const Account = () => {
  const navigate = useNavigate();

  function onFinishForm(data) {
    console.log(data);
  }

  return (
    <div
      style={{
        display:'flex',
        justifyContent:'center',
        marginTop:100
      }}
    >
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
            placeholder={'Change your email'}
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
            placeholder={'Change your First Name'}
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
            placeholder={'Change your Last Name'}
            required
            allowClear
            style={{
              width: '100%',
              height: '50px',
            }}
          ></Input>
        </Form.Item>
        <Typography.Title level={5}>
          Your portrait
        </Typography.Title>
        <Form.Item name={'ownerPortrait'}>
          <UploadImage />
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
    </div>
  );
};

export default Account;