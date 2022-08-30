import React, { useEffect} from 'react';
import { notification } from 'antd';
import { useSelector } from 'react-redux';


const Notification = ({ children }) => {
  const config = useSelector(state => state.notification.config);

  const openNotification = (config) => {
    notification.info({
      message: config.message,
      description: config.description,
      placement: 'topLeft',
    });
  };

  useEffect(() => {
    openNotification(config);
  }, [config]);


  return (
    children
  );
};

export default Notification;