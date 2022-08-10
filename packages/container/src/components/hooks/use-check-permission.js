import RoleBasedGuard, { useCurrentRole } from '../guards/RoleBasedGuard';
import PropTypes from 'prop-types';

RoleBasedGuard.propTypes = {
  accessibleRoles: PropTypes.array,
};

const useCheckPermission = ( accessibleRoles ) => {
  const role = useCurrentRole();
  if (accessibleRoles.includes(role)) {
    return true;
  } else {
    return false;
  }
};

export default useCheckPermission;

