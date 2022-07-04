import Navbar from './Navbar';
import { Space } from 'antd';
import {Outlet} from 'react-router-dom'

const SiteEdit = () => {

  return (
    <div>
      <Space
        direction={'vertical'}
        size={60}
        style={{
          width: '100%',
        }}
      >
        <Navbar />
        <Outlet/>
      </Space>
    </div>
  );
};

export default SiteEdit;