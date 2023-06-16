import { Card, Form, Input, Button, message, Space, Modal } from 'antd';
import React from 'react';
import { changePassword } from '../../services/user/UsersService';
import { useDispatch, useSelector } from 'react-redux';
import { userActions } from '../../redux/userSlice';

export default function ModalChangePassword({modalVisible, setModalVisible}) {
  const [form] = Form.useForm();
  const idToken = useSelector(state => state.user.idToken)
  const email = useSelector(state => state.user.email)
  const dispatch = useDispatch()

  const onFinish = async (values) => {
    try {
      const data = {
        newPassword: values.newPassword,
        oldPassword: values.oldPassword,
        idToken:idToken,
        email:email
      }
      const res = await changePassword(data)
      console.log(res)
      if(res.code === "ERR_BAD_REQUEST"){
        message.error('Error!');
      }
      else{
        dispatch(userActions.idToken(res.object))
        message.success('Update success!');
      }
      form.resetFields();
      setModalVisible(false)
    } catch (error) {
      message.error('Error!');
      console.error(error);
    }
  };


  return (
    <Modal
      open={modalVisible}
      onCancel={() => setModalVisible(false)}
    >
      <Card style={{ padding: '1rem' }}>
        <Form
          form={form}
          name='change-password'
          onFinish={onFinish}
          layout='vertical'
          initialValues={{
            oldPassword: '',
            newPassword: '',
            confirmNewPassword: '',
          }}
        >
          <Space direction='vertical' size='middle' style={{ width: '100%' }}>
            <Form.Item
              name='oldPassword'
              label={'Old password'}
              rules={[
                { required: true, message: 'Old Password is required' },
              ]}
            >
              <Input.Password />
            </Form.Item>

            <Form.Item
              name='newPassword'
              label={'New password'}
              rules={[
                { required: true, message: 'New Password is required' },
                { min: 6, message: 'Password must be at least 6 characters' },
              ]}
            >
              <Input.Password />
            </Form.Item>

            <Form.Item
              name='confirmNewPassword'
              label={'Confirm new password'}
              dependencies={['newPassword']}
              rules={[
                { required: true, message: 'Please confirm your password!' },
                ({ getFieldValue }) => ({
                  validator(_, value) {
                    if (!value || getFieldValue('newPassword') === value) {
                      return Promise.resolve();
                    }
                    return Promise.reject(new Error('The two passwords that you entered do not match!'));
                  },
                }),
              ]}
            >
              <Input.Password />
            </Form.Item>

            <Form.Item>
              <Button type='primary' htmlType='submit'>
                Submit
              </Button>
            </Form.Item>
          </Space>
        </Form>
      </Card>
    </Modal>
  );
}
