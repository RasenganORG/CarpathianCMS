import { DesktopOutlined } from '@ant-design/icons';
import React from 'react';
import { Button } from 'antd';
import { pagesActions } from '../redux/pagesSlice';
import { checkPermissionByRole } from './checkPermissionByRole';

export const createNavBar = (navbarJson, dispatch, navigate, user) => {
  let navBarComp = [];
  for (let page of Object.entries(navbarJson)) {
    let children = [];
    if (Object.keys(page[1].children).length !== 0) {
      children = createNavBar(page[1].children, dispatch, navigate, user);
    }
    let hasPermission = true;
    if (page[1].metadata.visibility === 'specific-roles') {
      hasPermission = checkPermissionByRole(page[1].metadata.accessibleRoles, user.role);
    }
    if (page[1].metadata.visibility === 'link-only') {
      hasPermission = false
    }

    if (hasPermission === true) {
      navBarComp.push({
        key: page[0],
        id: page[0],
        name: `${page[1].metadata.title}`,
        label:
          <Button
            className={'nav-bar-button'}
            type={'text'}
            style={{
              color: 'white',
            }}
            onClick={() => {
              navigate(`${page[1].metadata.href}`);
              dispatch(pagesActions.setSelectedPage(page[0]));
            }}
          >
            {page[1].metadata.title}
          </Button>,
        icon: <DesktopOutlined />,
        children: children.length > 0 ? children : null,
      });
    }
  }
  return navBarComp;
};
