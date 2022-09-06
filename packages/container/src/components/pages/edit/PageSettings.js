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
import VisibilityManager from '../../visibility/VisibilityManager';
import UserPermission from '../../searchUser/SearchUser';

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



const PageSettings = () => {
  const [buttonLoading, setButtonLoading] = useState(false);

  const [form] = useForm();
  const dispatch = useDispatch();
  const selectedPage = useSelector(state => state.pages.selectedPage);
  const currentPage = useSelector(state => state.pages.pagesList.find((p) => p.id === selectedPage));
  const [visibilityFormItem, setVisibilityFormItem] = useState(currentPage.data.metadata.visibility);

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
          <VisibilityManager
            visibilityFormItem={visibilityFormItem}
            setVisibilityFormItem={setVisibilityFormItem}
          />

          <UserPermission form={form}/>

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
