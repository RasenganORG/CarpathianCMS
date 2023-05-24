import { Outlet } from 'react-router-dom';
import React from 'react';
import Toolbar from '../toolbar/Toolbar';
import VisibleByRoleWithSpecialPermissionsGuard from '../guards/VisibleByRoleWithSpecialPermissionsGuard';
import useAuth from '../hooks/use-auth';

const PageLayout = () => {

  return (
    <div>
      <VisibleByRoleWithSpecialPermissionsGuard
        defaultAccessibleRoles={['admin','editor']}
        onlyForEditors={true}>
        <Toolbar />
      </VisibleByRoleWithSpecialPermissionsGuard>
      <Outlet />
    </div>
  )
};

export default PageLayout;
