import { Alert, Button, Form, Input, Typography, Upload } from 'antd';
import { UploadOutlined } from '@ant-design/icons';

const SiteSettings = () => {
  function onFinishForm(data) {
    console.log(data);
  }

  return (
    <div
      style={{
        display:'flex',
        justifyContent:'center'
      }}
    >
      <Form
        onFinish={onFinishForm}
        style={{
          width: '50%',
        }}
      >
        <Typography.Title level={5}>
          Site Title
        </Typography.Title>
        <Form.Item name={'siteTitle'}>
          <Input
            placeholder={'Enter the title of your website'}
            required
            allowClear
            style={{
              width: '100%',
              height: '50px',
            }}
          ></Input>
        </Form.Item>
        <Typography.Title level={5}>
          Site Logo
        </Typography.Title>
        <Form.Item name={'siteLogo'}>
          <Upload>
            <Button icon={<UploadOutlined />}>Click to Upload</Button>
          </Upload>
        </Form.Item>
        <Typography.Title level={5}>
          Site presentation phrase
        </Typography.Title>
        <Form.Item name={'presentationPhrase'}>
          <Input
            placeholder={'Enter the presentation phrase'}
            required
            allowClear
            style={{
              width: '100%',
              height: '50px',
            }}
          ></Input>
        </Form.Item>
        <Typography.Title level={5}>
          Company Location
        </Typography.Title>
        <Form.Item name={'location'}>
          <Input
            placeholder={'Enter the location of your company'}
            required
            allowClear
            style={{
              width: '100%',
              height: '50px',
            }}
          ></Input>
        </Form.Item>
        <Typography.Title level={5}>
          Site contact phone number
        </Typography.Title>
        <Form.Item name={'phoneNumber'}>
          <Input
            placeholder={'Enter the phone number of your site'}
            required
            allowClear
            style={{
              width: '100%',
              height: '50px',
            }}
          ></Input>
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
            Save
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default SiteSettings;