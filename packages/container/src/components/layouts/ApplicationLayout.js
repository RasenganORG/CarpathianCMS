import { Breadcrumb, Button, Layout, Menu } from 'antd';
import 'antd/dist/antd.css';
import { Content, Footer, Header } from 'antd/es/layout/layout';
import React, { useEffect, useState } from 'react';
import { Link, Outlet, useLocation, useNavigate } from 'react-router-dom';
import LogoutButton from '../auth/LogoutButton';
import useAuth from '../hooks/use-auth';
import { PATHS } from '../../routes/paths';


const navBarAllSettings = [
  {
    key: 'settings',
    label: <Link to={{pathname:'settings', state:{prevPath: location.pathname}}}>Settings</Link>
  },
  {
    key: 'siteWorkspace',
    label: <Link to={'siteWorkspace'}>Site</Link>,
  },
  {
    key: 'account',
    label: <Link to={'account'}>My account</Link>,
  },
  {
    key: 'auth',
    label: <Link to={PATHS.auth.login}>Log In</Link>
  },
  {
    key:'logout',
    label: <LogoutButton/>
  }
];



const ApplicationLayout = () => {
  const [selectedMenu,setSelectedMenu] = useState();
  const [navBarSettings, setNavBarSettings] = useState([])
  const { isAuthenticated } = useAuth()


  useEffect(() => {
    let settingsArray = []
    if(!isAuthenticated)
      settingsArray.push(navBarAllSettings.find( navSetting => navSetting.key === "auth"))
    else
      settingsArray.push(...navBarAllSettings.filter(navSetting => navSetting.key !== "auth"))

    setNavBarSettings(settingsArray)

  },[isAuthenticated])


  return (
    <Layout
    >
      <Header style={{
        display:'flex',
        flexDirection:'row-reverse',
      }}>
        <Menu
          theme='dark'
          mode='horizontal'
          items={navBarSettings}
          onSelect={(e) => setSelectedMenu(e)}
          style={{
            width:'30%'
          }}
        />
      </Header>
      <Content
        style={{
          padding: '0 5%',
          backgroundColor:'whitesmoke',
        }}
      >
        <Outlet/>
      </Content>
      <Footer
        style={{
          textAlign: 'center',
          backgroundColor:'whitesmoke'
        }}
      >
        My footer
      </Footer>
    </Layout>);
};

export default ApplicationLayout;