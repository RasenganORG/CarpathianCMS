import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import * as Yup from 'yup';
import { Button, Col, ConfigProvider, Form, Input, Modal, Row, Select, Switch, Tooltip, Typography } from 'antd';
import { InfoCircleOutlined } from '@ant-design/icons';
import { Option } from 'antd/es/mentions';
import FormItem from 'antd/es/form/FormItem';
import { pagesActions } from '../../redux/pagesSlice';
import { addNewPage } from '../../services/pages/PagesService';
import slugify from '../../utils/slugify';

const AddNewPageForm = ({ setNewPageModalIsOpened, newPageModalIsOpened }) => {
  const [parentOfValue, setParentOfValue] = useState('none');
  const [createPageButtonLoading, setCreatePageButtonLoading] = useState(false);
  const [generateCustomHref, setGenerateCustomHref] = useState(false);
  const dispatch = useDispatch();
  const pages = useSelector(state => state.pages.pagesList);

  const schema = Yup.object().shape({
    title: Yup.string().required('The title of the page is required'),
    generateCustomHref: Yup.boolean(),
    href: Yup.string(),
    parent: Yup.string(),
  });

  //console.log(schema)

  const yupSync = {
    async validator({ field }, value) {
      await schema.validateSyncAt(field, { [field]: value });
    },
  };

  const onFinishForm = async (data) => {
    setCreatePageButtonLoading(true);
    data.parent = parentOfValue;
    data = {
      metadata: data,
    };
    if(generateCustomHref === false || data.metadata.href === ''){
      data.metadata.href = slugify(data.metadata.title)
    }
    const res = await addNewPage(data);
    dispatch(pagesActions.createNewPage(res));
    setCreatePageButtonLoading(false);
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
        initialValues={{
          generateCustomHref: false,
          href:''
        }}
        style={{
          marginTop: 50,
        }}
      >
        <Form.Item
          name={'title'}
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
          name={'href'}
          rules={[yupSync]}
        >
          <Row>
            <Col offset={6} span={12}>

              <Row>
                <Col span={6}>
                  <Typography.Title level={5}>
                    Page href
                  </Typography.Title>
                </Col>

                <Col span={3}>
                  <Form.Item
                    name={'generateCustomHref'}
                    rules={[yupSync]}>
                    <Switch
                      checkedChildren='custom'
                      unCheckedChildren='auto'
                      onChange={(val) => {
                        setGenerateCustomHref(val);
                      }}
                    />
                  </Form.Item>
                </Col>
              </Row>
              <Input
                placeholder={'Enter the href of the page'}
                allowClear
                disabled={!generateCustomHref}
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
          name={'parent'}
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
                onChange={(value) => setParentOfValue(value)}
              >
                <Select.Option value={'none'} key={'none'}>None</Select.Option>
                {
                  pages.map((page) => {
                    return <Select.Option value={page.data.metadata.title}
                                          key={page.data.metadata.title}>{page.data.metadata.title}</Select.Option>;
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
            loading={createPageButtonLoading}
            disabled={createPageButtonLoading}
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