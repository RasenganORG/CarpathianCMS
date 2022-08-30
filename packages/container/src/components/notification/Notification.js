import React, { useEffect} from 'react';
import { notification } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { notificationActions } from '../../redux/notificationSlice';
import { CheckCircleOutlined, CloseCircleOutlined, DownCircleOutlined } from '@ant-design/icons';


const Notification = ({ children }) => {
  const config = useSelector(state => state.notification.config);
  const dispatch = useDispatch()

  const openNotification = (config) => {
    if(config.type === 'success') {
      notification.open({
        ...config,
        placement: 'bottomLeft',
        icon:<CheckCircleOutlined
          style={{
            fontSize:'32px',
            color:'#72bd15'
          }}
        />,
        closeIcon:<CloseCircleOutlined />,
        style: {
          backgroundColor: 'rgba(187, 223, 254, 0.95)',
          borderRadius: '1rem',
          fontSize: '20px',
        },
      });
    }
    if(config.type === 'error') {
      notification.open({
        ...config,
        placement: 'bottomLeft',
        icon:<CloseCircleOutlined
          style={{
            fontSize:'32px',
            color:'#f7b267'
          }}
        />,
        closeIcon:<CloseCircleOutlined />,
        style: {
          backgroundColor: 'rgba(242, 92, 84, 0.95)',
          borderRadius: '1rem',
          fontSize: '20px',
        },
      });
    }
    dispatch(notificationActions.resetNotification())
  };

  useEffect(() => {
    if(config.message)
      openNotification(config);
  }, [config]);


  return (
    children
  );
};

export default Notification;