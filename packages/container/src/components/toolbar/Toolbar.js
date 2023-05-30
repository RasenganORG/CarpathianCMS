import { Alert, Button, Card, Col, Layout, Menu, Modal, Row, Space, Tooltip, Typography } from 'antd';
import {
  DoubleLeftOutlined,
  DoubleRightOutlined,
  EditOutlined,
  PlusCircleOutlined,
  UserOutlined,
} from '@ant-design/icons';
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import AddNewPageForm from '../pages/AddNewPageForm';
import Sider from 'antd/es/layout/Sider';
import MenuButton from '../layouts/toolbarLayouts/MenuButton';
import classes from './Toolbar.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { pagesActions } from '../../redux/pagesSlice';
import { checkPermissionByRole } from '../../utils/checkPermissionByRole';
import { checkPermissionBySpecialPermission } from '../../utils/checkPermissionBySpecialPermission';
import useAuth from '../hooks/use-auth';
import { useCurrentRole } from '../guards/RoleBasedGuard';

const Toolbar = () => {
  const [leaveModalIsOpened, setLeaveModalIsOpened] = useState(false);
  const [newPageModalIsOpened, setNewPageModalIsOpened] = useState(false);
  const [menuItems, setMenuItems] = useState([])
  const [collapsed, setCollapsed] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isEdit = window.location.pathname.split('/').findIndex((word) => word === 'edit' || word === 'content') !== -1;
  const isEditContent = window.location.pathname.split('/').findIndex((word) => word === 'content') !== -1;
  const { pageid = '' } = useParams();
  const userId = useAuth().user.localId
  const role = useCurrentRole()

  const currentPage = window.location.pathname.split('/')[1];

  let specialPermissions = useSelector(state => state.pages.pagesList
    .find(page => page.data.metadata.href === currentPage)
    ?.data.metadata.specialPermissions)


  const onExitEdit = () => {
    navigate(`${pageid}`);
    setLeaveModalIsOpened(false);
  };

  const onAddNewPage = () => {
    setNewPageModalIsOpened(true);
  };


  const preview =
    <MenuButton
      title={'Preview'}
      tooltipTitle={'Preview your website'}
      onClick={() => setLeaveModalIsOpened(true)}
    />;

  const content =
    <MenuButton
      title={'Contents'}
      tooltipTitle={'Edit the content of your page'}
      onClick={() => navigate(`${pageid}/content`)}
    />;


  const editPage = <MenuButton
    title={isEdit ? 'Edit Page' : 'Edit'}
    tooltipTitle={'Edit your current page'}
    onClick={() => navigate(`${pageid}/edit`)}
  />;

  const menuEditPreview = !isEdit ? {
      key: '2',
      icon: <EditOutlined
        style={{
          display: 'inline',
          fontSize: '170%',
        }}
      />,
      label: editPage,
    } :
    {
      key: '3',
      icon: <img
        src={'https://img.icons8.com/ios-filled/30/000000/uchiha-eyes.png'}
        style={{
          display: 'inline',
          fontSize: '170%',
        }}
      />,
      label: preview,
    };

  const menuEdit = isEdit ? {
    key: '2',
    icon: <EditOutlined
      style={{
        display: 'inline',
        fontSize: '170%',
      }}
    />,
    label: editPage,
  } : null;

  const menuContent = isEdit ? {
    key: '4',
    icon: <img
      src={'https://img.icons8.com/ios/30/000000/content.png'}
      style={{
        display: 'inline',
        fontSize: '170%',
      }}
    />,
    label: content,
  } : null;

  const menuAddPage = {
    key: '1',
    icon: <PlusCircleOutlined
      style={{
        display: 'inline',
        fontSize: '170%',
      }}
    />,
    label:
      <MenuButton
        title={'Add Page'}
        tooltipTitle={'Add a new page'}
        onClick={onAddNewPage}
      />,
  };




  //used to dynamically create the toolbar based on role or special role for a particular page

  useEffect(() => {
    const hasAdminRolePermissions = checkPermissionByRole(['admin'],role)
    const hasEditorRolePermissions = checkPermissionByRole(['admin','editor'],role)
    const hasAdminRoleSpecialPermissions = checkPermissionBySpecialPermission(specialPermissions,['admin'],userId)
    const hasEditorRoleSpecialPermissions = checkPermissionBySpecialPermission(specialPermissions,['admin','editor'],userId)


    if(isEdit){
      setMenuItems([menuEditPreview])
      if(hasEditorRoleSpecialPermissions || hasEditorRolePermissions){
        setMenuItems(current => [...current,menuContent])
        setMenuItems(current => [...current,menuEdit])
      }
      if( hasAdminRolePermissions){
        setMenuItems(current => [...current,menuAddPage])
      }
    } else{
      setMenuItems([menuEditPreview])
      if(hasAdminRolePermissions){
        setMenuItems(current => [...current,menuAddPage])
      }
    }

  },[specialPermissions,userId,role,isEdit])



  return (
    <div>
      <Modal
        visible={leaveModalIsOpened}
        onOk={onExitEdit}
        onCancel={() => setLeaveModalIsOpened(false)}
        okText={'Leave'}
        cancelText={'Stay'}
      >
        <Typography.Title level={3}>
          Are you sure you want to leave?
        </Typography.Title>
        <Typography.Title level={5}>
          Your work won't be saved.
        </Typography.Title>
      </Modal>
      <AddNewPageForm
        setNewPageModalIsOpened={setNewPageModalIsOpened}
        newPageModalIsOpened={newPageModalIsOpened} />
      <Layout>

        <Sider
          theme={'light'}
          style={{
            top: 200,
            left: 10,
            paddingRight: 20,
            width: '250px',
            position: 'fixed',
          }}
          collapsible
          trigger={null}
          collapsed={collapsed}
          onCollapse={value => setCollapsed(value)}
        >
          {React.createElement(collapsed ? DoubleRightOutlined : DoubleLeftOutlined, {
            className: classes.trigger,
            onClick: () => setCollapsed(!collapsed),
          })}
          <Menu
            mode='inline'
            items={menuItems}
          />
        </Sider>
      </Layout>
    </div>
  );
};

export default Toolbar;
