import { Outlet, useParams } from 'react-router-dom';
import React from 'react';
import Toolbar from '../toolbar/Toolbar';
import RoleBasedGuard from '../guards/RoleBasedGuard';
import VisibleByRoleGuard from '../guards/VisibleByRoleGuard';

const PageLayout = () => {
  const currentPage = window.location.pathname.split('/')[1]


  return (
    <div>
      <VisibleByRoleGuard accessibleRoles={['admin']} currentPage={currentPage}>
        <Toolbar/>
      </VisibleByRoleGuard>
      <Outlet />
    </div>
  );
};

export default PageLayout;
