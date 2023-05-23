export const checkPermissionByRole = (accessibleRoles, currentRole) => {
  if(accessibleRoles.includes(currentRole)){
    return true
  }
  return false
}