import PropTypes from 'prop-types';
import { Alert, Modal } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { PATHS } from '../../routes/paths';
import { useCurrentRole } from './RoleBasedGuard';
import useAuth from '../hooks/use-auth';
import useCheckPermissionAdvanced from '../hooks/use-check-permission-advanced';

// ----------------------------------------------------------------------

RoleWithSpecialPermissionsGuard.propTypes = {
  accessibleRoles: PropTypes.array,
  onlyForEditors: PropTypes.bool,
  children: PropTypes.node,
};


export default function RoleWithSpecialPermissionsGuard({ defaultAccessibleRoles, onlyForEditors, children }) {
  const navigate = useNavigate();
  const currentPage = window.location.pathname.split('/')[1];
  let is404 = currentPage === '404';

  const [hasRolePermission, hasSpecialPermission, isPublicOrLinkOnly] = useCheckPermissionAdvanced(defaultAccessibleRoles,onlyForEditors)

  //console.log("Role")
  //console.log(hasRolePermission, hasSpecialPermission, isPublicOrLinkOnly, onlyForEditors);


  if ((
    ((hasRolePermission || hasSpecialPermission) && onlyForEditors) ||
    (isPublicOrLinkOnly && !onlyForEditors) ||
    ((hasRolePermission || hasSpecialPermission) && !onlyForEditors)
    ) && is404 === false) {
    return <>{children}</>;
  } else {

    return (
      <div>
        <Modal
          open={true}
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

}

