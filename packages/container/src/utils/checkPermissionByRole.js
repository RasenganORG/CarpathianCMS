export const checkPermissionByRole = (accessibleRoles, currentRole) => {
  console.log("Permission:",accessibleRoles, currentRole)
  if(accessibleRoles.includes(currentRole)){
    return true
  }
  return false
}