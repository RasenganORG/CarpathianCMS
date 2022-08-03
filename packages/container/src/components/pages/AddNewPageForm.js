import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import * as Yup from 'yup';
import { Button, Col, Form, Input, Modal, Row, Select, Tooltip, Typography } from 'antd';
import { InfoCircleOutlined } from '@ant-design/icons';
import { Option } from 'antd/es/mentions';

const AddNewPageForm = ({ setNewPageModalIsOpened, newPageModalIsOpened }) => {

  const dispatch = useDispatch();
  const pages = useSelector(state => state.pages.pagesList);

  const schema = Yup.object().shape({
    pageTitle: Yup.string().required('The title of the page is required'),
    pageHref: Yup.string().required('The href of the page is required'),
    parentOf: Yup.string(),
  });

  const yupSync = {
    async validator({ field }, value) {
      await schema.validateSyncAt(field, { [field]: value });
    },
  };

  const onFinishForm = (data) => {
    console.log(data);
  };

  const onOkAddNewPage = () => {

    setNewPageModalIsOpened(false);
  };


  return (
    <Modal
      visible={newPageModalIsOpened}
      onCancel={() => setNewPageModalIsOpened(false)}
      width={700}
      maskClosable={false}
      footer={[
        <Button key='back' onClick={() => setNewPageModalIsOpened(false)}>
          Cancel
        </Button>,
      ]}
    >
      <Form
        onFinish={onFinishForm}
        style={{
          marginTop: 50,
        }}
      >
        <Form.Item
          name={'pageTitle'}
          rules={[yupSync]}
        >
          <Row>
            <Col offset={6} span={12}>

              <Typography.Title level={5}>
                Page title
              </Typography.Title>
              <Input
                placeholder={'Enter the title of the page'}
                allowClear
                style={{
                  width: '100%',
                  height: '50px',
                }}
              ></Input>
            </Col>
            <Col span={4}>
              <Tooltip placement={'right'} title={'Ceva'}>
                <InfoCircleOutlined
                  style={{
                    fontSize: '20px',
                    marginTop: '2.8rem',
                    marginLeft: '20px',
                    color: '#0DABF4',
                  }} />
              </Tooltip>
            </Col>
          </Row>
        </Form.Item>

        <Form.Item
          name={'pageHref'}
          rules={[yupSync]}
        >
          <Row>
            <Col offset={6} span={12}>

              <Typography.Title level={5}>
                Page href
              </Typography.Title>
              <Input
                placeholder={'Enter the href of the page'}
                allowClear
                style={{
                  width: '100%',
                  height: '50px',
                }}
              ></Input>
            </Col>
            <Col span={4}>
              <Tooltip placement={'right'} title={'Ceva'}>
                <InfoCircleOutlined
                  style={{
                    fontSize: '20px',
                    marginTop: '2.8rem',
                    marginLeft: '20px',
                    color: '#0DABF4',
                  }} />
              </Tooltip>
            </Col>
          </Row>
        </Form.Item>
        <Form.Item
          name={'parentOf'}
          rules={[yupSync]}
        >
          <Row>
            <Col offset={6} span={12}>
              <Typography.Title level={5}>
                Choose the parent page
              </Typography.Title>
              <Select
                style={{
                  width: '100%',
                  height: '50px',
                }}
                defaultValue={'none'}
              >
                  <Select.Option value={'none'} key={'none'}>None</Select.Option>
                  {
                    pages.map((page) => {
                      return <Select.Option value={page.metadata.name}
                                            key={page.metadata.name}>{page.metadata.name}</Select.Option>;
                    })
                  }
              </Select>
            </Col>
            <Col span={4}>
              <Tooltip placement={'right'} title={'If you want to make this page a sub page of another'}>
                <InfoCircleOutlined
                  style={{
                    fontSize: '20px',
                    marginTop: '2.8rem',
                    marginLeft: '20px',
                    color: '#0DABF4',
                  }} />
              </Tooltip>

            </Col>
          </Row>
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
            Create page
          </Button>
        </Form.Item>
      </Form>
    </Modal>

  )
    ;

};

export default AddNewPageForm;