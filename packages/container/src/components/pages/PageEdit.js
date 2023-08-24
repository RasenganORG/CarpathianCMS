import React, { useEffect, useState } from 'react';
import { Col, Menu, Row } from 'antd';
import BlocksManager from '../blocks/BlocksManager';
import { useDispatch, useSelector } from 'react-redux';
import { pagesActions } from '../../redux/pagesSlice';
import EditPageMetadata from './edit/EditPageMetadata';
import PageSettings from './edit/PageSettings';
import { checkPermissionByRole } from '../../utils/checkPermissionByRole';
import { checkPermissionBySpecialPermission } from '../../utils/checkPermissionBySpecialPermission';
import useAuth from '../hooks/use-auth';
import { useCurrentRole } from '../guards/RoleBasedGuard';




export default () => {
  const pages = useSelector(state => state.pages.pagesList);
  const dispatch = useDispatch();
  const [currentMenu, setCurrentMenu] = useState('block-editor');
  const [items, setItems] = useState([])

  const userId = useAuth().user.localId
  const role = useCurrentRole()

  const currentPage = window.location.pathname.split('/')[1];

  let specialPermissions = useSelector(state => state.pages.pagesList
    .find(page => page.data.metadata.href === currentPage)
    ?.data.metadata.specialPermissions)


  //used for sending a signal to navBar to refresh. Activated when for some reason pages weren't loaded
  useEffect(() => {
    if (pages.length === 0) {
      dispatch(pagesActions.refreshNavBar());
    }
  }, [pages]);


  useEffect(() => {
    const hasAdminRolePermissions = checkPermissionByRole(['admin'],role)
    const hasAdminRoleSpecialPermissions = checkPermissionBySpecialPermission(specialPermissions,['admin'],userId)


    if(hasAdminRolePermissions || hasAdminRoleSpecialPermissions) {
      setItems([{ label: 'Blocks Editor', key: 'block-editor', disabled: pages.length === 0 },
        { label: 'Page Metadata', key: 'page-metadata', disabled: pages.length === 0 },
        { label: 'Page Settings', key: 'page-settings', disabled: pages.length === 0 }]);
    }
    else{
      setItems([{ label: 'Blocks Editor', key: 'block-editor', disabled: pages.length === 0 },
        { label: 'Page Metadata', key: 'page-metadata', disabled: pages.length === 0 }]);
    }
  },[role,userId,specialPermissions])




  return (
    <Row gutter={[20, 50]}>
      <Col offset={3} span={18}>
        <Menu
          mode='horizontal'
          selectedKeys={[currentMenu]}
          onClick={(k) => setCurrentMenu(k.key)}
          items={items}
          style={{
            marginBottom: '2rem',
          }}
        />
        {currentMenu === 'block-editor' && <BlocksManager />}
        {currentMenu === 'page-metadata' && (<EditPageMetadata />)}
        {currentMenu === 'page-settings' && (<PageSettings />)}
      </Col>

    </Row>
  );
}
