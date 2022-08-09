import React from 'react';
import { Button } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { userActions } from '../../redux/userSlice';
import useAuth from '../hooks/use-auth';
import { PoweroffOutlined } from '@ant-design/icons';

const LogoutButton = () => {
  const { isAuthenticated } = useAuth();
  const dispatch = useDispatch();


  const onLogOutButtonClicked = () => {
    if (isAuthenticated) {
      dispatch(userActions.logout());
    }
  };

  return (
    <div>
      <Button
        type={'primary'}
        icon={<PoweroffOutlined />}
        onClick={onLogOutButtonClicked}>
        Log Out
      </Button>
    </div>

  );
};

export default LogoutButton;
