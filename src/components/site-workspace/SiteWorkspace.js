import { Button, Row, Col } from 'antd';
import 'antd/dist/antd.css';
import Toolbar from '../toolbar/Toolbar';
import SiteEdit from './SiteEdit';


const SiteWorkspace = () => {

  return (
    <div>
      <Toolbar />
      <Row>
        <Col span={4}>
        </Col>
        <Col span={20}>
          <SiteEdit />
        </Col>
      </Row>
    </div>
  );
};

export default SiteWorkspace;