import { Breadcrumb, Button, Layout, Menu } from 'antd';
import 'antd/dist/antd.css';
import { Content, Footer, Header } from 'antd/es/layout/layout';
import React, { useEffect, useMemo, useReducer, useState } from 'react';
import { Link, Outlet, useLocation, useNavigate } from 'react-router-dom';
import LogoutButton from '../../auth/LogoutButton';
import useAuth from '../../hooks/use-auth';
import { PATHS } from '../../../routes/paths';
import useBreakpoint from '../../hooks/use-breakpoint';
import useIsMobile from '../../hooks/use-is-mobile';
import { useDispatch, useSelector } from 'react-redux';
import useCheckPermission from '../../hooks/use-check-permission';
import Sider from 'antd/es/layout/Sider';
import { DesktopOutlined, MenuFoldOutlined, MenuUnfoldOutlined, PoweroffOutlined } from '@ant-design/icons';
import classes from './ApplicationLayout.module.css'
import { pagesActions } from '../../../redux/pagesSlice';
import { createNavBar } from '../../../utils/createNavBar';
import { getNavBar } from '../../../services/pages/PagesService';


const accountSettings = [
  {
    key: 'auth',
    label: <Link to={PATHS.auth.login}>Log In</Link>,
  },
  {
    key: 'logout',
    label: <LogoutButton />,
  },
];

const navBarBasicSettings = [
  {
    key: 'settings',
    label: <Link to={{ pathname: 'settings' }}>Settings</Link>,
    icon: <DesktopOutlined />,

  },
  {
    key: 'account',
    label: <Link to={'account'}>My account</Link>,
    icon: <DesktopOutlined />,
  },
];

const retrieveNavBar = async () => {
  const navbar = getNavBar()
  // console.log(navbar)
  // const navBar = createNavBar(navbar)
  return navbar
}

const ApplicationLayout = (factory, deps) => {
  const [selectedMenu, setSelectedMenu] = useState();
  const pages = useSelector(state => state.pages.pagesList);
  const navBar = useSelector(state => state.pages.navBar);
  const [navBarLeftSettings, setNavBarLeftSettings] = useState([]);
  const [navBarRightSettings, setNavBarRightSettings] = useState([]);
  const [displayLogoutMenu, setDisplayLogoutMenu] = useState(true);
  const [layoutOrientation, setLayoutOrientation] = useState('horizontal');
  const accessToSettings = useCheckPermission(['admin']);
  const [collapsed, setCollapsed] = useState(false);


  const dispatch = useDispatch()
  const { isAuthenticated } = useAuth();
  const location = useLocation();
  const br = useBreakpoint();
  const isMobile = useIsMobile();


  useEffect(() => {
    let settingsArray = [];
    let accountArray = [];

    if (isAuthenticated) {
      accountArray.push(accountSettings.find(navSetting => navSetting.key === 'logout'));
    } else {
      accountArray.push(accountSettings.find(navSetting => navSetting.key === 'auth'));
    }

    if (isAuthenticated && accessToSettings) {
      settingsArray.push(...navBarBasicSettings);

    }

    dispatch(pagesActions.pushToNavBar(settingsArray));
    setNavBarRightSettings(accountArray);


  }, [isAuthenticated]);


  useEffect(() => {
    if (br === 'sm' || br === 'xs' || isMobile === true) {
      setLayoutOrientation('vertical');
      setDisplayLogoutMenu(false);
    } else {
      setLayoutOrientation('horizontal');
      setDisplayLogoutMenu(true);
    }
  }, [br, isMobile]);



  const navBarHorizontal = (
    <Header
      style={{
        display: 'flex',
        flexDirection: 'row',
      }}>
      <Menu
        theme='dark'
        mode='horizontal'
        items={navBar}
        onSelect={(e) => setSelectedMenu(e)}
        selectedKeys={[`${location.pathname.split('/')[1]}`]}
        style={{
          marginLeft: '10%',
          width: '80%',
        }}
      />
      {displayLogoutMenu &&
        <Menu
          theme='dark'
          mode={'inline'}
          items={navBarRightSettings}
          onSelect={(e) => setSelectedMenu(e)}
          style={{
            marginLeft: '10%',
            width: '20%',
          }}
        />}
    </Header>
  );

  const navBarVertical = (
    <Sider collapsible collapsed={collapsed} onCollapse={value => setCollapsed(value)} trigger={null}>
      <div style={{
        height: '32px',
        margin: '16px',
        background: 'rgba(237,249,253,0.3)',
      }}>LOGO
      </div>
      <Menu
        theme='dark'
        items={navBarLeftSettings}
        onSelect={(e) => setSelectedMenu(e)}
        selectedKeys={[`${location.pathname.split('/')[1]}`]}
      />
      {displayLogoutMenu &&
        <Menu
          theme='dark'
          mode={'inline'}
          items={navBarRightSettings}
          onSelect={(e) => setSelectedMenu(e)}
        />}
    </Sider>

  );

  return (
    <Layout
      style={{
        minHeight: '100vh',
      }}
    >
      {layoutOrientation === 'vertical' ? navBarVertical : navBarHorizontal}

      <Layout
        style={{ background: '#fff' }}>
        <Header
          style={{
            padding: 0,
            background: '#fff'
          }}
        >
          {React.createElement(collapsed ? MenuUnfoldOutlined : MenuFoldOutlined, {
            className: classes.trigger,
            onClick: () => setCollapsed(!collapsed),
          }) && layoutOrientation === 'vertical'}
        </Header>
        <Content
          style={{
            padding: '0 5%',
          }}
        >

          <Outlet />
        </Content>
        <Footer
          style={{
            textAlign: 'center',
          }}
        >
          My footer
        </Footer>
      </Layout>
    </Layout>

  )
    ;
};

export default ApplicationLayout;