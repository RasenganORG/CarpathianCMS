import React, { useEffect, useState } from 'react';
import DeletePageButton from './DeletePageButton';
import { Button, Col, Form, Input, Modal, Row, Select, Typography } from 'antd';
import { useForm } from 'antd/es/form/Form';
import { pagesActions } from '../../../redux/pagesSlice';
import { useDispatch, useSelector } from 'react-redux';
import { updatePage } from '../../../services/pages/PagesService';
import { notificationActions } from '../../../redux/notificationSlice';
import VisibilityManager from '../../visibility/VisibilityManager';
import PermissionsWizard from './permission/PermissionsWizard';
import FormItem from 'antd/es/form/FormItem';

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
  const [permissionModalVisibility, setPermissionModalVisibility] = useState(false);

  const [form] = useForm();
  const dispatch = useDispatch();
  const selectedPage = useSelector(state => state.pages.selectedPage);
  const currentPage = useSelector(state => state.pages.pagesList.find((p) => p.id === selectedPage));
  const [visibilityFormItem, setVisibilityFormItem] = useState(currentPage.data.metadata.visibility);


  const onFinishForm = async () => {
    try {
      setButtonLoading(true);
      let data = await form.validateFields();


      if (visibilityFormItem === 'specific-roles') {
        data = {
          metadata: {
            ...currentPage.data.metadata,
            visibility: data.visibility,
            accessibleRoles: data.accessibleRoles,
            specialPermissions: data.specialPermissions,
          },
          blocks: currentPage.data.blocks,
        };
      } else {
        data = {
          metadata: { ...currentPage.data.metadata,
            visibility: data.visibility,
            accessibleRoles: [],
            specialPermissions:data.specialPermissions,
          },
          blocks: currentPage.data.blocks,
        };
      }

      console.log('PageSettings final:', data);


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
    form.setFieldValue('accessibleRoles', currentPage?.data.metadata.accessibleRoles);
    form.setFieldValue('specialPermissions', currentPage?.data.metadata.specialPermissions)
    form.setFieldValue('visibility', currentPage?.data.metadata.visibility);
  }, [currentPage]);



  return (

    <Row>
      <Col offset={2} span={22}>
        <Form
          form={form}
          {...formItemLayout}
          initialValues={{
            visibility: 'public',
            specialPermissions: {},
          }}
          onFinish={onFinishForm}
        >
          <VisibilityManager
            visibilityFormItem={visibilityFormItem}
            setVisibilityFormItem={setVisibilityFormItem}
          />
          <FormItem
            name={'specialPermissions'}>
            <div></div>
          </FormItem>

          <Button
            onClick={() => setPermissionModalVisibility(true)}
            style={{ marginBottom: '2rem' }}>
            Edit users permissions
          </Button>

          <Modal
            visible={permissionModalVisibility}
            onOk={() => setPermissionModalVisibility(false)}
            onCancel={() => setPermissionModalVisibility(false)}
            okText={null}
            cancelText={'Close'}
            destroyOnClose={true}
            width={'70%'}
          >
            <PermissionsWizard form={form} />
          </Modal>

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
