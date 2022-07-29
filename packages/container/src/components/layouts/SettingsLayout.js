import { Breadcrumb, Layout, Menu } from 'antd';
import Sider from 'antd/es/layout/Sider';
import { Content } from 'antd/es/layout/layout';
import React, { useEffect, useState } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import {
  GlobalOutlined,
  IdcardOutlined,
  SettingTwoTone,
  SmileOutlined,
  UnorderedListOutlined,
  UserOutlined,
} from '@ant-design/icons';

const menuSettingsConfig = [
  {
    key: 'siteSettings',
    icon: <SettingTwoTone />,
    label: 'Site Settings',
    children: [
      {
        key: 'social-media',
        label: 'Social Media',
        icon: <SmileOutlined />,
      },
      {
        key: 'site-settings',
        label: 'Site Settings',
        icon: <GlobalOutlined />,
      },
    ],
  },
  {
    key: 'userSettings',
    icon: <UserOutlined />,
    label: 'User ApplicationLayout',
    children: [
      {
        key: 'edit-roles',
        label: 'Edit roles',
        icon: <IdcardOutlined />,
      },
      {
        key: 'user-list',
        label: 'User list',
        icon: <UnorderedListOutlined />,
      },
    ],
  },
];

const SettingsLayout = () => {
  const [selectedSetting, setSelectedSetting] = useState();
  const navigate = useNavigate();

  useEffect(() => {
    if (selectedSetting) {
      //navigate(selectedSetting.key);
    }
  }, [selectedSetting]);

  return (
    <div
      style={{
        width: '100%',
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
          backgroundColor: 'whitesmoke',
        }}
      >
        <Sider className='site-layout-background' width={200}>
          <Menu
            mode='inline'
            defaultSelectedKeys={['siteSettings']}
            defaultOpenKeys={['siteSettings', 'userSettings']}
            style={{
              height: '100%',
            }}
            items={menuSettingsConfig}
            onSelect={(e) => setSelectedSetting(e)}
          />
        </Sider>
        <Content
          style={{
            padding: '0 24px',
            minHeight: 600,
            width: '100%',
          }}
        >
          <Outlet />
        </Content>
      </Layout>
    </div>
  );

};

export default SettingsLayout;