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


const ApplicationLayout = () => {
  const navBarAllSettings = useSelector(state => state.pages.navBar)
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
      settingsArray.push(...navBarAllSettings);
      accountArray.push(accountSettings.find(navSetting => navSetting.key === 'logout'));
    } else {
      accountArray.push(accountSettings.find(navSetting => navSetting.key === 'auth'));
    }

    setNavBarLeftSettings(settingsArray);
    setNavBarRightSettings(accountArray);

  }, [isAuthenticated,navBarAllSettings]);

  useEffect(() => {
    if (br === 'sm' || br === 'xs' || isMobile === true) {
      setLayoutOrientation('vertical');
      setDisplayLogoutMenu(false);
    } else {
      setLayoutOrientation('horizontal');
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
          items={navBarLeftSettings}
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