import { Button, Row, Col } from 'antd';
import 'antd/dist/antd.css';
import Toolbar from '../toolbar/Toolbar';
import Site from './SiteEdit';


const SiteWorkspace = () => {

  return (
    <div>
      <Row>
        <Col span={4}>
        </Col>
        <Col span={20}>
          <Site />
        </Col>
      </Row>
    </div>
  );
};

export default SiteWorkspace;