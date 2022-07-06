import Toolbar from '../toolbar/Toolbar';
import TableDemo from './Demo/TableDemo';
import { Button, Card, Col, Modal, Row, Space } from 'antd';
import UploadImage from '../upload/UploadImage';
import UploadImages from '../upload/UploadImages';
import { CloseOutlined } from '@ant-design/icons';
import TextArea from 'antd/es/input/TextArea';
import ListDemo from './Demo/ListDemo';
import CommentsDemo from './Demo/CommentsDemo';
import AccordionDemo from './Demo/AccordionDemo';
import TabDemo from './Demo/TabDemo';
import AddWidgets from './AddWidgets';
import classes from '../../styles.css'
import FormsDemo from './Demo/FormsDemo';

const WidgetDemo = () => {

  return (
    <div>
      <Toolbar isEdit={true} />
      <Space
        direction={'vertical'}
        size={20}
        style={{
          width: '100%',
        }}>
        <Row>
          <Col span={16}>
            <Card
              hoverable={true}
              title={'Table'}
              extra={<CloseOutlined />}>
              <TableDemo />
            </Card>
          </Col>
        </Row>
        <Row>
          <Col span={16}>
            <Card
              hoverable={true}
              title={'Upload an image'}
              extra={<CloseOutlined />}>
              <UploadImage />
            </Card>
          </Col>
        </Row>
        <Row>
          <Col span={16}>
            <Card
              hoverable={true}
              title={'Upload multiple images'}
              extra={<CloseOutlined />}>
              <UploadImages />
            </Card>
          </Col>
        </Row>
        <Row>
          <Col span={16}>
            <Card
              hoverable={true}
              title={'Write a paragraph'}
              extra={<CloseOutlined />}>
              <TextArea rows={5} />
            </Card>
          </Col>
        </Row>
        <Row>
          <Col span={16}>
            <Card
              hoverable={true}
              title={'Add a List of Objects'}
              extra={<CloseOutlined />}>
              <ListDemo />
            </Card>
          </Col>
        </Row>
        <Row>
          <Col span={16}>
            <Card
              hoverable={true}
              title={'Comment Widget'}
              extra={<CloseOutlined />}>
              <CommentsDemo />
            </Card>
          </Col>
        </Row>
        <Row>
          <Col span={16}>
            <Card
              hoverable={true}
              title={'Accordion Widget'}
              extra={<CloseOutlined />}>
              <AccordionDemo />
            </Card>
          </Col>
        </Row>

        <Row>
          <Col span={16}>
            <Card
              hoverable={true}
              title={'Tab Widget'}
              extra={<CloseOutlined />}>
              <TabDemo />
            </Card>
          </Col>
        </Row>


        <Row>
          <Col span={16}>
            <Card
              hoverable={true}
              title={'Create form Widget'}
              extra={<CloseOutlined />}>
              <FormsDemo />
            </Card>
          </Col>
        </Row>

        <Row>
          <Col span={16}>
            <Card
              hoverable
            >
              <AddWidgets />
            </Card>
          </Col>
        </Row>
      </Space>
    </div>
  );
};

export default WidgetDemo;

//todo tabs, accordion,table, fileUpload, input textarea, list, calendar, comments