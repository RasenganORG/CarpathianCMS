import React, { useEffect, useState } from 'react';
import DeletePageButton from './DeletePageButton';
import { Button, Col, Form, Input, Row, Select, Typography } from 'antd';
import { InfoCircleOutlined } from '@ant-design/icons';
import { useForm } from 'antd/es/form/Form';
import { pagesActions } from '../../../redux/pagesSlice';
import { useDispatch, useSelector } from 'react-redux';
import slugify from '../../../utils/slugify';
import { updatePage } from '../../../services/pages/PagesService';
import { notificationActions } from '../../../redux/notificationSlice';
import ClipboardCopy from '../../ClipboardCopy';
import { useLocation } from 'react-router-dom';

const formItemLayout = {
  labelCol: {
    xs: { span: 24 },
    md: { span: 24 },
  },
  wrapperCol: {
    xs: { span: 24 },
    md: { span: 12 },
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
];


const PageSettings = () => {
  const [buttonLoading, setButtonLoading] = useState(false);

  const [form] = useForm();
  const dispatch = useDispatch();
  const selectedPage = useSelector(state => state.pages.selectedPage);
  const currentPage = useSelector(state => state.pages.pagesList.find((p) => p.id === selectedPage));
  const [visibilityFormItem, setVisibilityFormItem] = useState(currentPage.data.metadata.visibility);
  const roles = useSelector(state => state.pages.roles)
  const location = useLocation()
  const link = 'localhost:8080'+ location.pathname.slice(0,location.pathname.search('/edit')) + location.pathname.slice(location.pathname.search('/edit')+ 5)

  const onFinishForm = async () => {
    try {
      setButtonLoading(true);
      let data = await form.validateFields();


      if(visibilityFormItem === "specific-roles") {
        data = {
          metadata: { ...currentPage.data.metadata, visibility: data.visibility, accessibleRoles: data.accessibleRoles },
          blocks: currentPage.data.blocks,
        };
      } else{
        data = {
          metadata: { ...currentPage.data.metadata, visibility: data.visibility, accessibleRoles: [] },
          blocks: currentPage.data.blocks,
        };
      }

      console.log(data)


      await updatePage({
        id: currentPage.id,
        data: data,
      }, currentPage.id);

      dispatch(pagesActions.refreshNavBar());
      dispatch(notificationActions.openNotification({
        message: 'Settings updated successfully',
        description: '',
        type: 'success',
      }));
      setButtonLoading(false);

    } catch (error) {
      dispatch(notificationActions.openNotification({
        message: 'Error while trying to update the settings',
        description: '',
        type: 'error',
      }));
    }

  };

  const visibilityChanged = (value) => {
    setVisibilityFormItem(value);
  };

  useEffect(() => {
    if (currentPage) {
      form.setFieldValue('visibility', currentPage.data.metadata.visibility);
    }
  }, [currentPage]);

  useEffect(() => {
    form.setFieldValue('accessibleRoles',currentPage?.data.metadata.accessibleRoles )
  },[currentPage])




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
              onChange={visibilityChanged}
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
          {currentPage.data.metadata.visibility === 'link-only' && visibilityFormItem === 'link-only' &&
            <ClipboardCopy copyText={link}/>
          }
          <Form.Item
            name={'accessibleRoles'}
            labelAlign={'left'}
            label={'Roles with access:'}
            hidden={visibilityFormItem !== 'specific-roles'}
            tooltip={{
              icon: <InfoCircleOutlined />,
              title: 'Choose what roles will be able to access this page.',
              placement: 'right',
            }}
            dependencies={['visibility']}
            rules={[
              {
                required: visibilityFormItem === 'specific-roles',
                message: 'Please choose at least one role that can access this page',
              },
            ]}
          >
            <Select
              mode='multiple'
              placeholder='Select the roles that can access this page'
              optionLabelProp='label'
              style={{
                width: '100%',
                height: '50px',
              }}
            >
              {roles.map(role => (
                <Select.Option
                  value={role.value}
                  label={role.label}
                  key={role.value}
                >
                  <Typography.Text>
                    {role.label}
                  </Typography.Text>
                </Select.Option>
              ))}

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
             marginTop: '3rem',
           }}
      >
        <DeletePageButton />
      </Col>
    </Row>
  );
};

export default PageSettings;
