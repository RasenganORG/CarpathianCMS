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
  isForEdit: PropTypes.bool,
  children: PropTypes.node,
};


export default function RoleWithSpecialPermissionsGuard({ accessibleRoles, isForEdit, children }) {
  const navigate = useNavigate();
  const currentPage = window.location.pathname.split('/')[1];
  let is404 = currentPage === '404';

  const [hasRolePermission, hasSpecialPermission, isPublicOrLinkOnly] = useCheckPermissionAdvanced(accessibleRoles)

  console.log(hasRolePermission, hasSpecialPermission, isPublicOrLinkOnly, isForEdit);


  if ((
    ((hasRolePermission || hasSpecialPermission) && isForEdit) ||
    (isPublicOrLinkOnly && !isForEdit) ||
    ((hasRolePermission || hasSpecialPermission) && !isForEdit)) &&
    is404 === false) {
    return <>{children}</>;
  } else {

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

}

