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


const navBarAllSettings = [
  {
    key: 'settings',
    label: <Link to={{ pathname: 'settings', state: { prevPath: location.pathname } }}>Settings</Link>,
  },
  {
    key: 'siteWorkspace',
    label: <Link to={'siteWorkspace'}>Site</Link>,
  },
  {
    key: 'account',
    label: <Link to={'account'}>My account</Link>,
  },
];

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


const ApplicationLayout = () => {
  const [selectedMenu, setSelectedMenu] = useState();
  const [navBarSettings, setNavBarSettings] = useState([]);
  const [navBarAccountSettings, setNavBarAccountSettings] = useState([]);
  const [displayLogoutMenu, setDisplayLogoutMenu] = useState(true);
  const { isAuthenticated } = useAuth();
  const location = useLocation()
  const br = useBreakpoint();
  const isMobile = useIsMobile();


  useEffect(() => {
    let settingsArray = [];
    let accountArray = [];
    if (isAuthenticated) {
      settingsArray.push(...navBarAllSettings);
      accountArray.push(accountSettings.find(navSetting => navSetting.key === 'logout'));
    } else {
      accountArray.push(accountSettings.find(navSetting => navSetting.key === 'auth'));
    }

    setNavBarSettings(settingsArray);
    setNavBarAccountSettings(accountArray);

  }, [isAuthenticated]);

  useEffect(() => {
    if (br === 'sm' || br === 'xs' || isMobile === true) {
      setDisplayLogoutMenu(false);
    } else {
      setDisplayLogoutMenu(true);
    }
  }, [br, isMobile]);



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
          items={navBarSettings}
          onSelect={(e) => setSelectedMenu(e)}
          selectedKeys={[`${location.pathname.split('/')[1]}`]}
          style={{
            marginLeft: '10%',
            width: '30%',
          }}
        />
        {displayLogoutMenu &&
          <Menu
            theme='dark'
            mode={'inline'}
            items={navBarAccountSettings}
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