import { Breadcrumb, Button, Layout, Menu } from 'antd';
import 'antd/dist/antd.css';
import { Content, Footer, Header } from 'antd/es/layout/layout';
import Sider from 'antd/es/layout/Sider';
import { SettingTwoTone, UserOutlined,UnorderedListOutlined,IdcardOutlined,GlobalOutlined, SmileOutlined} from '@ant-design/icons';
import React from 'react';


const navBarSettings = [
  {
    key: 'goToSite',
    label: 'Site Edit',
  },
  {
    key: 'account',
    label: 'Account',
  },
];


const menuSettingsConfig = [
  {
    key: 'siteSettings',
    icon: <SettingTwoTone />,
    label: 'Site Settings',
    children: [
      {
        key: 'socialMedia',
        label: 'Social Media',
        icon:<SmileOutlined />
      },
      {
        key: 'basicSiteSettings',
        label: 'Site settings',
        icon:<GlobalOutlined />
      },
    ],
  },
  {
    key: 'userSettings',
    icon: <UserOutlined />,
    label: 'User Settings',
    children: [
      {
        key: 'roleSettings',
        label: 'Edit roles',
        icon: <IdcardOutlined />
      },
      {
        key: 'userList',
        label: 'User list',
        icon:<UnorderedListOutlined />
      },
    ],
  },
];

const Settings = () => {

  return (
    <Layout
    >
      <Header style={{
        display:'flex',
        flexDirection:'row-reverse',
      }}>
        <Menu theme='dark' mode='horizontal'  items={navBarSettings} />
      </Header>
      <Content
        style={{
          padding: '0 50px',
          backgroundColor:'whitesmoke'
        }}
      >
        <Breadcrumb
          style={{
            margin: '16px 0',
          }}
        >
          <Breadcrumb.Item>Home</Breadcrumb.Item>
          <Breadcrumb.Item>Settings</Breadcrumb.Item>
        </Breadcrumb>
        <Layout
          style={{
            padding: '24px 0',
            backgroundColor:'whitesmoke'
          }}
        >
          <Sider className='site-layout-background' width={200}>
            <Menu
              mode='inline'
              defaultSelectedKeys={['1']}
              defaultOpenKeys={['sub1']}
              style={{
                height: '100%',
              }}
              items={menuSettingsConfig}
            />
          </Sider>
          <Content
            style={{
              padding: '0 24px', minHeight: 600,
            }}
          >
            <div style={{
              width:'300px'
            }}>
              Settings
            </div>
          </Content>
        </Layout>
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

export default Settings;