import { Breadcrumb, Button, Layout, Menu } from 'antd';
import 'antd/dist/antd.css';
import { Content, Footer, Header } from 'antd/es/layout/layout';
import React, { useEffect, useState } from 'react';
import { Link, Outlet, useLocation, useNavigate } from 'react-router-dom';
import LogoutButton from '../auth/LogoutButton';
import useAuth from '../hooks/use-auth';
import { PATHS } from '../../routes/paths';
import useBreakpoint from '../hooks/use-breakpoint';
import useIsMobile from '../hooks/use-is-mobile';
import { useSelector } from 'react-redux';


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
  },
  {
    key: 'account',
    label: <Link to={'account'}>My account</Link>,
  },
];


const ApplicationLayout = () => {
  const pages = useSelector(state => state.pages.pagesList);
  const [selectedMenu, setSelectedMenu] = useState();
  const [navBarLeftSettings, setNavBarLeftSettings] = useState([]);
  const [navBarRightSettings, setNavBarRightSettings] = useState([]);
  const [displayLogoutMenu, setDisplayLogoutMenu] = useState(true);
  const [layoutOrientation, setLayoutOrientation] = useState('horizontal');
  const { isAuthenticated } = useAuth();
  const location = useLocation();
  const br = useBreakpoint();
  const isMobile = useIsMobile();


  useEffect(() => {
    let settingsArray = [];
    let accountArray = [];
    if (isAuthenticated) {
      settingsArray.push(...navBarBasicSettings);
      accountArray.push(accountSettings.find(navSetting => navSetting.key === 'logout'));
    } else {
      accountArray.push(accountSettings.find(navSetting => navSetting.key === 'auth'));
    }

    setNavBarLeftSettings(settingsArray);
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

  useEffect(() => {
    let navBar = [];
    pages.map((page) => {
      console.log(page)
      let pageNavBar = {
        key:page.data.metadata.href,
        label: <Link to={page.data.metadata.href}>{page.data.metadata.title}</Link>
      };
      navBar.push(pageNavBar);
    });
    navBar.push(...navBarBasicSettings);
    setNavBarLeftSettings(navBar);

  }, [pages]);
  console.log(pages)


  return (
    <Layout>
      <Header
        style={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'space-between',
        }}>
        <Menu
          theme='dark'
          mode='horizontal'
          items={navBarLeftSettings}
          onSelect={(e) => setSelectedMenu(e)}
          selectedKeys={[`${location.pathname.split('/')[1]}`]}
          style={{
            marginLeft: '10%',
            width: '100%',
          }}
        />
        {displayLogoutMenu &&
          <Menu
            theme='dark'
            mode={'inline'}
            items={navBarRightSettings}
            onSelect={(e) => setSelectedMenu(e)}
          />}
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
    </Layout>);
};

export default ApplicationLayout;