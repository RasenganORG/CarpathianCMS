import { Menu } from 'antd';
import Icon, {
  AppstoreOutlined,
  AreaChartOutlined, AuditOutlined,
  MailOutlined,
  PlayCircleOutlined,
  SettingOutlined,
} from '@ant-design/icons';
import { ReactComponent as NewsIcon } from '../../resources/icons/icons8-news.svg'
import { ReactComponent as Support } from '../../resources/icons/icons8-support.svg'
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Navbar = () => {
  const [selectedMenu,setSelectedMenu] = useState();
  const navigate = useNavigate();

  useEffect(()=> {
    if(selectedMenu) {
      if(selectedMenu.key == 'techNews' || selectedMenu.key == 'software') {
        navigate(`${selectedMenu.key}`);
      }
      console.log(selectedMenu);

    }
  },[selectedMenu])

  return (
    <div style={{
      marginTop:70,
    }}>
      <Menu
        mode='horizontal'
        defaultSelectedKeys={['techNews']}
        onSelect={(e) => setSelectedMenu(e)}>
        <Menu.Item key='techNews' icon={<Icon component={NewsIcon}/>}>
          Tech News
        </Menu.Item>
        <Menu.Item key='software' icon={<AreaChartOutlined />}>
          Software
        </Menu.Item>
        <Menu.Item key='pcBuilder' icon={<Icon component={Support}/>}>
          Pc Builder
        </Menu.Item>
        <Menu.Item key='gaming' icon={<PlayCircleOutlined />}>
          Gaming
        </Menu.Item>
        <Menu.Item key='forumRules' icon={<AuditOutlined />}>
          Forum Rules
        </Menu.Item>
        <Menu.SubMenu key='pcComponentDiscussion' title='Pc Components Discussion' icon={<SettingOutlined />}>
          <Menu.Item key='gpu' >
            GPU
          </Menu.Item>
          <Menu.Item key='cpu' >
            CPU
          </Menu.Item>
          <Menu.Item key='motherboard' >
            Motherboard
          </Menu.Item>
          <Menu.Item key='cases' >
            Cases
          </Menu.Item>
          <Menu.Item key='ram' >
            RAM
          </Menu.Item>
          <Menu.Item key='peripheral' >
            Peripheral
          </Menu.Item>
        </Menu.SubMenu>
      </Menu>
    </div>
  );
};
export default Navbar;