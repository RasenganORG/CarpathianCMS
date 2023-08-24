import RoleBasedGuard, { useCurrentRole } from '../guards/RoleBasedGuard';
import PropTypes from 'prop-types';
import useAuth from './use-auth';
import { useSelector } from 'react-redux';

RoleBasedGuard.propTypes = {
  defaultAccessibleRoles: PropTypes.array,
  isForEdit: PropTypes.bool,
};

const useCheckPermissionAdvanced = ( defaultAccessibleRoles, onlyForEditors ) => {

  const currentRole = useCurrentRole();
  const userId = useAuth().user.localId;
  const currentPage = window.location.pathname.split('/')[1];

  let accessibleSpecificRoles = useSelector(state => state.pages.pagesList
    .find(page => page.data.metadata.href === currentPage)
    ?.data.metadata.accessibleRoles);

  let specialPermissionsDict = useSelector(state => state.pages.pagesList
    .find(page => page.data.metadata.href === currentPage)
    ?.data.metadata.specialPermissions);

  if (specialPermissionsDict === undefined) {
    specialPermissionsDict = {};
  }

  let visibility = useSelector(state => state.pages.pagesList
    .find(page => page.data.metadata.href === currentPage)
    ?.data.metadata.visibility);

  let isPublicOrLinkOnly = visibility === 'public' || visibility === 'link-only';


  let hasSpecialPermission = false;
  let hasRolePermission = defaultAccessibleRoles.includes(currentRole);

  if(onlyForEditors === true){
    accessibleSpecificRoles = accessibleSpecificRoles?.filter(role => role !== 'user')
  }

  if(visibility === 'specific-roles'){
    hasRolePermission = accessibleSpecificRoles.includes(currentRole)
  }

  if (Object.keys(specialPermissionsDict).length > 0 && userId) {

    if (specialPermissionsDict[userId]) {
      defaultAccessibleRoles.map(role => specialPermissionsDict[userId].includes(role) ? hasSpecialPermission = true : null);
    }
  }
  return [hasRolePermission, hasSpecialPermission, isPublicOrLinkOnly]
};

export default useCheckPermissionAdvanced;