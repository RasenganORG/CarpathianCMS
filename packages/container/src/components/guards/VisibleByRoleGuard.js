import PropTypes from 'prop-types';
import { Alert, Modal } from 'antd';
import { useSelector } from 'react-redux';
import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { PATHS } from '../../routes/paths';

// ----------------------------------------------------------------------

VisibleByRoleGuard.propTypes = {
  accessibleRoles: PropTypes.array,
  currentPage: PropTypes.string,
  children: PropTypes.node,
};

const useCurrentRole = () => {
  // Logic here to get current user role
  const role = useSelector(state => state.user.role);
  return role;
};

export default function VisibleByRoleGuard({ accessibleRoles,currentPage, children }) {
  const currentRole = useCurrentRole();
  const specialPermissions = useSelector(state => state.pages.pagesList.find(page => page.data.metadata.href === currentPage)?.data.metadata.specialPermissions)

  //todo

console.log("specialPermissions:", specialPermissions)
  if (accessibleRoles.includes(currentRole)) {
    return <>{children}</>
  }

}

