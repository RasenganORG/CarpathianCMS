import { Alert, Button, Card, Form, Input, Modal, Typography, Upload } from 'antd';
import { FacebookFilled, GoogleOutlined, InstagramFilled, TwitterOutlined, UploadOutlined } from '@ant-design/icons';
import { useState } from 'react';
import React from 'react'

const SocialMedia = () => {
  const [modalOpened, setModalOpened] = useState(false);

  function onFinishForm(data) {
    console.log(data);
  }

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <Card
        style={{
          marginBottom: 30,
        }}
      >
        <Typography>
          Here you will complete the default links for your social media account.
          Whenever you want to add a reference to a social media account, these will be suggested.
        </Typography>
      </Card>
      <Form
        onFinish={onFinishForm}
        style={{
          width: '50%',
        }}
      >
        <Typography.Title level={5}>
          <FacebookFilled /> Facebook Account Link
        </Typography.Title>
        <Form.Item name={'facebook'}>
          <Input
            placeholder={'Enter the link to your facebook account'}
            required
            allowClear
            style={{
              width: '100%',
              height: '50px',
            }}
          ></Input>
        </Form.Item>
        <Typography.Title level={5}>
          <InstagramFilled /> Instagram Account Link
        </Typography.Title>
        <Form.Item name={'instagram'}>
          <Input
            placeholder={'Enter the link to your instagram account'}
            required
            allowClear
            style={{
              width: '100%',
              height: '50px',
            }}
          ></Input>
        </Form.Item>
        <Typography.Title level={5}>
          <GoogleOutlined /> Gmail Account Link
        </Typography.Title>
        <Form.Item name={'gmail'}>
          <Input
            placeholder={'Enter the link to your Gmail account'}
            required
            allowClear
            style={{
              width: '100%',
              height: '50px',
            }}
          ></Input>
        </Form.Item>
        <Typography.Title level={5}>
          <TwitterOutlined /> Twitter Account Link
        </Typography.Title>
        <Form.Item name={'location'}>
          <Input
            placeholder={'Enter the link to your Twitter account'}
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
            onClick={() => setModalOpened(true)}
          >
            Add link
          </Button>
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
      {modalOpened &&
        <Modal title='Basic Modal' open={modalOpened} onOk={() => setModalOpened(false)}
               onCancel={() => setModalOpened(false)}>
          <Form
            onFinish={onFinishForm}
            style={{
              width: '400px',
            }}
          >
            <Typography.Title level={5}>
              Platform Name
            </Typography.Title>
            <Form.Item name={'platformName'}>
              <Input
                placeholder={'Enter the name of the platform'}
                required
                allowClear
                style={{
                  width: '100%',
                  height: '50px',
                }}
              ></Input>
            </Form.Item>
            <Typography.Title level={5}>
              Account Link
            </Typography.Title>
            <Form.Item name={'accountLink'}>
              <Input
                placeholder={'Enter the link to your account'}
                required
                allowClear
                style={{
                  width: '100%',
                  height: '50px',
                }}
              >
              </Input>
            </Form.Item>
            <Typography.Title level={5}>
              Platform icon
            </Typography.Title>
            <Form.Item name={'platformIcon'}>
              <Upload>
                <Button icon={<UploadOutlined />}>Click to Upload</Button>
              </Upload>
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
                Add now
              </Button>
            </Form.Item>
          </Form>
        </Modal>}
    </div>
  );
};

export default SocialMedia;