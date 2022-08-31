import React, { useEffect, useState } from 'react';
import DeletePageButton from './DeletePageButton';
import { Button, Col, Form, Row, Select } from 'antd';
import { InfoCircleOutlined } from '@ant-design/icons';
import { useForm } from 'antd/es/form/Form';
import { pagesActions } from '../../../redux/pagesSlice';
import { useDispatch, useSelector } from 'react-redux';
import slugify from '../../../utils/slugify';
import { updatePage } from '../../../services/pages/PagesService';
import { notificationActions } from '../../../redux/notificationSlice';

const formItemLayout = {
  labelCol: {
    xs: { span: 24 },
    md: { span: 24,  },
  },
  wrapperCol: {
    xs: { span: 24 },
    md: { span: 12, },
  },
};

const visibilityOptions = [
  {
    value: 'public',
    label: 'Public',
  },
  {
    value: 'link-only',
    label: 'Link Only',
  },
  {
    value: 'specific-roles',
    label: 'Specific Roles',
  },
  {
    value: 'invitation only',
    label: 'Invitation Only',
  },
];


const PageSettings = () => {
  const [buttonLoading, setButtonLoading] = useState(false);

  const [form] = useForm();
  const dispatch = useDispatch()
  const selectedPage = useSelector(state => state.pages.selectedPage)
  const currentPage = useSelector(state => state.pages.pagesList.find((p) => p.id === selectedPage));

  const onFinishForm = async () => {
    try {
      setButtonLoading(true)
      let data = await form.validateFields();

      data = {
        metadata: { ...currentPage.data.metadata, visibility:data.visibility },
        blocks: currentPage.data.blocks,
      };

      await updatePage({
        id: currentPage.id,
        data: data,
      }, currentPage.id);

      dispatch(pagesActions.refreshNavBar());
      dispatch(notificationActions.openNotification({
        message:'Settings updated successfully',
        description:'',
        type:'success'
      }))
      setButtonLoading(false)

    } catch (error) {
      dispatch(notificationActions.openNotification({
        message:'Error while trying to update the settings',
        description:'',
        type:'error'
      }))
    }

  };

  useEffect(() => {
    if(currentPage){
      form.setFieldValue('visibility', currentPage.data.metadata.visibility )
    }
  }, [currentPage])


  return (

    <Row>
      <Col offset={2} span={22}>
        <Form
          form={form}
          {...formItemLayout}
          initialValues={{
            visibility: 'public',
          }}
          onFinish={onFinishForm}
        >
          <Form.Item
            name={'visibility'}
            labelAlign={'left'}
            label={'Visibility'}
            tooltip={{
              icon: <InfoCircleOutlined />,
              title: 'Choose what type of visibility you want this page to have',
              placement: 'right',
            }}
            rules={[
              {
                required: true,
              },
            ]}
          >
            <Select
              style={{
                width: '100%',
                height: '50px',
              }}
            >
              {
                visibilityOptions.map((opt) => {
                  return (
                    <Select.Option
                      value={opt.value}
                      key={opt.value}>
                      {opt.label}
                    </Select.Option>);
                })
              }
            </Select>
          </Form.Item>
          <Form.Item>
            <Button
              htmlType={'submit'}
              type={'primary'}
              size={'large'}
              loading={buttonLoading}
              disabled={buttonLoading}
            >
              Save changes
            </Button>
          </Form.Item>
        </Form>
      </Col>
      <Col span={12} offset={2}
        style={{
          marginTop:'3rem',
        }}
      >
          <DeletePageButton />
      </Col>
    </Row>
  );
};

export default PageSettings;
