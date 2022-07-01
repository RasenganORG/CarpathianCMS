import { Breadcrumb, Button, Layout, Menu } from 'antd';
import 'antd/dist/antd.css';
import { Content, Footer, Header } from 'antd/es/layout/layout';
import Sider from 'antd/es/layout/Sider';
import { SettingTwoTone, UserOutlined,UnorderedListOutlined,IdcardOutlined,GlobalOutlined, SmileOutlined} from '@ant-design/icons';
import React, { useEffect, useState } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';


const navBarSettings = [
  {
    key: 'settings',
    label: 'Settings',
  },
  {
    key: 'siteEdit',
    label: 'Site Edit',
  },
  {
    key: 'account',
    label: 'Account',
  },
];




const ApplicationLayout = () => {
  const [selectedMenu,setSelectedMenu] = useState();
  const navigate = useNavigate();

  useEffect(()=> {
    if(selectedMenu) {
      navigate(`${selectedMenu.key}`);
      console.log(selectedMenu);
    }
  },[selectedMenu])

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