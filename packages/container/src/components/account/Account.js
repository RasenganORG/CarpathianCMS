import { Button, Form, Input, Typography } from 'antd';
import 'antd/dist/antd.css';
import { useNavigate } from 'react-router-dom';
import ImageUpload from '../upload/ImageUpload';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useForm } from 'antd/es/form/Form';
import { addUserImage, deleteUserImage, patchUser } from '../../services/user/UsersService';
import { userActions } from '../../redux/userSlice';
import { notificationActions } from '../../redux/notificationSlice';
import ProfilePictureUpload from '../upload/ProfilePictureUpload';
import ModalChangePassword from './ModalChangePassword';
import { KeyOutlined } from '@ant-design/icons';


const Account = () => {
  const [fileList, setFileList] = useState([])
  const [modalVisible, setModalVisible] = useState(false)
  const navigate = useNavigate();
  const email = useSelector(state => state.user.email)
  const firstName = useSelector(state => state.user.firstName)
  const lastName = useSelector(state => state.user.lastName)
  const phone = useSelector(state => state.user.phone)
  const profilePictureUrl = useSelector(state => state.user.profilePictureUrl)
  const profilePictureName = useSelector(state => state.user.profilePictureName)
  const localId = useSelector(state => state.user.localId)
  const [loading, setLoading] = useState(false)
  const [imagesToBeDeleted, setImagesToBeDeleted] = useState([])
  const dispatch= useDispatch()

  const [form] = useForm()

  const deletingImages = async () => {
    for (let img of imagesToBeDeleted) {
      const resDelete = await deleteUserImage(localId, img);
      if (resDelete.type === 'error') {
        dispatch(notificationActions.openNotification({
          message: 'Error while deleting the old profile picture',
          description: '',
          type: 'error',
        }));
      }
    }
    setImagesToBeDeleted([])
  }

  async function onFinishForm(data) {
    setLoading(true)
    let newData = {}
    const formData = new FormData();

    if(typeof data.profilePicture === 'object') {
      formData.append('filename', data.profilePicture);
      await deletingImages()
      const resImage = await addUserImage(localId, formData);
      setFileList([{
        name:resImage.originalFilename,
        thumbUrl: resImage.imageUrl,
        status: 'success',
        uid:resImage.originalFilename,
        url:resImage.imageUrl,
      }])
      newData = {
        email:data.email,
        firstName:data.firstName,
        lastName:data.lastName,
        phone:data.phone,
        profilePictureUrl:resImage.imageUrl,
        profilePictureName:resImage.originalFilename
      }
    }else{
      if(imagesToBeDeleted.length > 0) {
        await deletingImages();
        newData = {
          email: data.email,
          firstName: data.firstName,
          lastName: data.lastName,
          phone: data.phone,
          profilePictureUrl: '',
          profilePictureName: '',
        };
      }else{
        newData = {
          email: data.email,
          firstName: data.firstName,
          lastName: data.lastName,
          phone: data.phone,
          profilePictureUrl: profilePictureUrl,
          profilePictureName: profilePictureName,
        };
      }
    }


    const res = await patchUser(localId, newData)
    if(res.type === 'success'){
      dispatch(userActions.updateUser(newData))
      dispatch(notificationActions.openNotification({
        message: 'User updated successfully',
        description: '',
        type: 'success',
      }));
    }
    else{
      dispatch(notificationActions.openNotification({
        message: 'Error while updating user',
        description: '',
        type: 'error',
      }));
    }
    setLoading(false)

  }

  useEffect(() => {
    if(email){
      form.setFieldValue('email', email)
    }
    if(firstName){
      form.setFieldValue('firstName', firstName)
    }
    if(lastName){
      form.setFieldValue('lastName', lastName)
    }
    if(phone){
      form.setFieldValue('phone', phone)
    }

  },[email, firstName, lastName,phone])

  useEffect(() => {
    if(profilePictureName && profilePictureUrl) {
      setFileList([{
        name: profilePictureName,
        thumbUrl: profilePictureUrl,
        uid: profilePictureName,
        url: profilePictureUrl,
        status:'success',
      }]);
    }
  },[profilePictureUrl,profilePictureName])

  const onRemoveImage = (file) =>{
    setImagesToBeDeleted((prevState) => [...prevState, file.name])
    if(form.getFieldValue('profilePicture')){
      form.setFieldValue('profilePicture', undefined);
    }
  }




  return (
    <div
      style={{
        display:'flex',
        justifyContent:'center',
        marginTop:60
      }}
    >
      <Form
        onFinish={onFinishForm}
        form={form}
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
          Phone
        </Typography.Title>
        <Form.Item name={'phone'}>
          <Input
            placeholder={'Update your phone'}
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
        <Form.Item name={'profilePicture'}>
          <ProfilePictureUpload
            onAdd={(file) => {form.setFieldValue('profilePicture',file)}}
            onRemoveImage={(file) => onRemoveImage(file)}
            defaultFilelist={fileList}
          />
        </Form.Item>

        <Button
          type="primary"
          icon={<KeyOutlined />}
          size="large"
          onClick={() => setModalVisible(true)}
          style={{
            backgroundColor: '#1890ff',
            borderColor: '#1890ff',
            color: '#fff',
            fontSize: '16px',
            padding: '10px 30px',
            borderRadius: '5px',
            boxShadow: '0px 8px 15px rgba(0, 0, 0, 0.1)',
            marginBottom:40,
            paddingBottom:40,
          }}
        >
          Change Password
        </Button>
        <Form.Item>
          <Button
            block
            type={'primary'}
            htmlType={'submit'}
            loading={loading}
            disabled={loading}
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
      <ModalChangePassword
        modalVisible={modalVisible}
        setModalVisible={setModalVisible}
      />
    </div>
  );
};

export default Account;