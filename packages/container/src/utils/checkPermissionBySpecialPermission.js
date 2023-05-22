import useAuth from '../components/hooks/use-auth';

export const checkPermissionBySpecialPermission = (specialPermissionsDict, userId) => {
  console.log("check",userId, specialPermissionsDict)
  for (let [_userId, permissions] of Object.entries(specialPermissionsDict)) {
    if (userId === _userId) {
      if (permissions.some(permission => ['admin', 'editor'].includes(permission))) {
        return true;
      }
    }
  }
  return false
}