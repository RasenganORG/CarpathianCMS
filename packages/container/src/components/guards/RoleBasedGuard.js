import PropTypes from 'prop-types';
import { Alert, Modal } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import React, { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { PATHS } from '../../routes/paths';
import { notificationActions } from '../../redux/notificationSlice';

// ----------------------------------------------------------------------

RoleBasedGuard.propTypes = {
  accessibleRoles: PropTypes.array,
  children: PropTypes.node,
};

export const useCurrentRole = () => {
  // Logic here to get current user role
  const role = useSelector(state => state.user.role);
  return role;
};

export default function RoleBasedGuard({ accessibleRoles, children }) {
  const currentRole = useCurrentRole();
  const navigate = useNavigate();
  const dispatch = useDispatch();


  if (!accessibleRoles.includes(currentRole)) {

    useEffect(() => {
      dispatch(notificationActions.openNotification({
          message: 'Error',
          description: 'Not enough permissions',
          type: 'error',
        },
      ));
    }, []);
    return (
      <div>
        <Modal
          visible={true}
          onCancel={() => navigate(-1)}
          onOk={() => navigate(PATHS.auth.login)}
          cancelText={'Go back'}
          okText={'Go to Login'}
        >
          <div>
            You do not have permission to access this page.
          </div>
        </Modal>
      </div>
    );
  }

  return <>{children}</>;
}

