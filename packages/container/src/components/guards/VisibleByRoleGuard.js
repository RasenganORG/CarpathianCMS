import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import React from 'react';


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

  if (accessibleRoles.includes(currentRole)) {
    return <>{children}</>
  }

}

