import useAuth from '../components/hooks/use-auth';

export const checkPermissionBySpecialPermission = (specialPermissionsDict, accessibleRoles, userId) => {
  if(specialPermissionsDict !== undefined) {
    for (let [_userId, permissions] of Object.entries(specialPermissionsDict)) {
      if (userId === _userId) {
        if (permissions.some(permission => accessibleRoles.includes(permission))) {
          return true;
        }
      }
    }
  }
  return false
}