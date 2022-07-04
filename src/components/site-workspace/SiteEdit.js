import Navbar from './Navbar';
import Content from './Content';
import { Space } from 'antd';

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
        <Content />
      </Space>
    </div>
  );
};

export default SiteEdit;