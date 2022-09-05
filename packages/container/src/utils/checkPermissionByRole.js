export const checkPermissionByRole = (accessibleRoles, currentRole) => {
  console.log(accessibleRoles, currentRole)
  if(accessibleRoles.includes(currentRole)){
    return true
  }
  return false
}