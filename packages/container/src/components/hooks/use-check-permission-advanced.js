import RoleBasedGuard, { useCurrentRole } from '../guards/RoleBasedGuard';
import PropTypes from 'prop-types';
import useAuth from './use-auth';
import { useSelector } from 'react-redux';

RoleBasedGuard.propTypes = {
  accessibleRoles: PropTypes.array,
};

const useCheckPermissionAdvanced = ( accessibleRoles ) => {

  const currentRole = useCurrentRole();
  const userId = useAuth().user.localId;
  const currentPage = window.location.pathname.split('/')[1];

  let accessibleSpecificRoles = useSelector(state => state.pages.pagesList
    .find(page => page.data.metadata.href === currentPage)
    ?.data.metadata.accessibleRoles);

  let specialPermissions = useSelector(state => state.pages.pagesList
    .find(page => page.data.metadata.href === currentPage)
    ?.data.metadata.specialPermissions);


  let visibility = useSelector(state => state.pages.pagesList
    .find(page => page.data.metadata.href === currentPage)
    ?.data.metadata.visibility);


  let isPublicOrLinkOnly = visibility === 'public' || visibility === 'link-only';
  let hasSpecialPermission = false;
  let hasRolePermission = accessibleRoles.includes(currentRole);


  if(visibility === 'specific-roles'){
    hasRolePermission = accessibleSpecificRoles.includes(currentRole)
  }


  if (specialPermissions === undefined) {
    specialPermissions = {};
  }

  if (Object.keys(specialPermissions).length > 0 && userId) {

    if (specialPermissions[userId]) {
      accessibleRoles.map(role => specialPermissions[userId].includes(role) ? hasSpecialPermission = true : null);
    }
  }
  return [hasRolePermission, hasSpecialPermission, isPublicOrLinkOnly]
};

export default useCheckPermissionAdvanced;