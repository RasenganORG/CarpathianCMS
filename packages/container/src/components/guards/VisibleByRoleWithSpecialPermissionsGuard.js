import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import React from 'react';
import useCheckPermissionAdvanced from '../hooks/use-check-permission-advanced';

// ----------------------------------------------------------------------

VisibleByRoleWithSpecialPermissionsGuard.propTypes = {
  accessibleRoles: PropTypes.array,
  currentPage: PropTypes.string,
  userId: PropTypes.string,
  children: PropTypes.node,
};

const useCurrentRole = () => {
  // Logic here to get current user role
  const role = useSelector(state => state.user.role);
  return role;
};


export default function VisibleByRoleWithSpecialPermissionsGuard({ accessibleRoles, userId, children }) {
  const currentRole = useCurrentRole();

  const currentPage = window.location.pathname.split('/')[1];
  let is404 = currentPage === '404'

  const [hasRolePermission, hasSpecialPermission, isPublicOrLinkOnly] = useCheckPermissionAdvanced(accessibleRoles)

  console.log(hasSpecialPermission)


  if ((hasSpecialPermission || hasRolePermission) && is404 === false) {
    return <>{children}</>
  }

}

