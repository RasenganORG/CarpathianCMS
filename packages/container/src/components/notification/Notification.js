import React, { useEffect } from 'react';
import { notification, Typography } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { notificationActions } from '../../redux/notificationSlice';
import { CaretDownOutlined, CheckCircleOutlined, CloseCircleOutlined, DownCircleOutlined } from '@ant-design/icons';


const Notification = ({ children }) => {
  const config = useSelector(state => state.notification.config);
  const dispatch = useDispatch();

  const openNotification = (config) => {
    if (config.type === 'success') {
      notification.open({
        ...config,
        message: (<Typography.Text style={{
          color: 'rgb(243,243,243)',
          fontSize: '18px',
        }}>
          {config.message}
        </Typography.Text>),
        placement: 'bottomLeft',
        icon: <CheckCircleOutlined
          style={{
            fontSize: '30px',
            color: 'rgb(243,243,243)',
          }}
        />,
        closeIcon: <CaretDownOutlined
          style={{
            fontSize: '20px',
            color: 'rgb(243,243,243)',
          }}
        />,
        duration: 100,
        style: {
          backgroundColor: 'rgba(73, 160, 120, 0.90)',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          borderRadius: '1rem',
          fontSize: '20px',
        },
      });
    }
    if (config.type === 'error') {
      notification.open({
        ...config,
        message: (<Typography.Text style={{
          color: 'rgb(243,243,243)',
          fontSize: '20px',
        }}>

          {config.message}
        </Typography.Text>),
        description: (<Typography.Text style={{
          color: 'rgb(243,243,243)',
          fontSize: '15px',
        }}>

          {config.description}
        </Typography.Text>),
        placement: 'bottomLeft',
        icon: <CloseCircleOutlined
          style={{
            fontSize: '30px',
            color: 'rgb(243,243,243)',
          }}
        />,
        closeIcon: <CaretDownOutlined
          style={{
            fontSize: '20px',
            color: 'rgb(243,243,243)',
          }}
        />,
        duration: 100,
        style: {
          backgroundColor: 'rgba(229, 56, 59, 0.90)',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          borderRadius: '1rem',
          fontSize: '20px',
        },
      });

    }
    dispatch(notificationActions.resetNotification());
  };

  useEffect(() => {
    if (config.message)
      openNotification(config);
  }, [config]);


  return (
    children
  );
};

export default Notification;