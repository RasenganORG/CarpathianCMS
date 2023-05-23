import { Outlet } from 'react-router-dom';
import React from 'react';
import Toolbar from '../toolbar/Toolbar';
import VisibleByRoleWithSpecialPermissionsGuard from '../guards/VisibleByRoleWithSpecialPermissionsGuard';
import useAuth from '../hooks/use-auth';

const PageLayout = () => {
  const userId= useAuth().user.localId


  return (
    <div>
      <VisibleByRoleWithSpecialPermissionsGuard accessibleRoles={['admin','editor']}  userId={userId}>
        <Toolbar />
      </VisibleByRoleWithSpecialPermissionsGuard>
      <Outlet />
    </div>
  )
};

export default PageLayout;
