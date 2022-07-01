import { Button, Row, Col } from 'antd';
import 'antd/dist/antd.css';
import Toolbar from '../toolbar/Toolbar';


const SiteEdit = () => {

  return(
    <Row>
      <Col span={3}>
        <Toolbar/>
      </Col>
    </Row>
  )
}

export default SiteEdit;