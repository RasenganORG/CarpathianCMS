import { Outlet, useParams } from 'react-router-dom';
import React from 'react';
import Toolbar from '../toolbar/Toolbar';
import RoleBasedGuard from '../guards/RoleBasedGuard';
import VisibleByRoleGuard from '../guards/VisibleByRoleGuard';
import ToolbarNew from '../toolbar/Toolbar';

const PageLayout = () => {


  return (
    <div>
      <VisibleByRoleGuard accessibleRoles={['admin']}>
        <ToolbarNew/>
      </VisibleByRoleGuard>
      <Outlet />
    </div>
  );
};

export default PageLayout;
