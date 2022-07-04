import Toolbar from '../toolbar/Toolbar';
import TableDemo from './Demo/TableDemo';
import { Card, Col, Row, Space } from 'antd';
import UploadImage from '../upload/UploadImage';
import UploadImages from '../upload/UploadImages';
import { CloseOutlined } from '@ant-design/icons';
import TextArea from 'antd/es/input/TextArea';
import ListDemo from './Demo/ListDemo';
import CommentsDemo from './Demo/CommentsDemo';
import AccordionDemo from './Demo/AccordionDemo';
import TabDemo from './Demo/TabDemo';

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
              title={'Table'}
              extra={<CloseOutlined />}>
              <TableDemo />
            </Card>
          </Col>
        </Row>
        <Row>
          <Col span={16}>
            <Card
              title={'Upload an image'}
              extra={<CloseOutlined />}>
              <UploadImage />
            </Card>
          </Col>
        </Row>
        <Row>
          <Col span={16}>
            <Card
              title={'Upload multiple images'}
              extra={<CloseOutlined />}>
              <UploadImages />
            </Card>
          </Col>
        </Row>
        <Row>
          <Col span={16}>
            <Card
              title={'Write a paragraph'}
              extra={<CloseOutlined />}>
              <TextArea rows={5} />
            </Card>
          </Col>
        </Row>
        <Row>
          <Col span={16}>
            <Card
              title={'Add a List of Objects'}
              extra={<CloseOutlined />}>
              <ListDemo/>
            </Card>
          </Col>
        </Row>
        <Row>
          <Col span={16}>
            <Card
              title={'Comment Widget'}
              extra={<CloseOutlined />}>
              <CommentsDemo/>
            </Card>
          </Col>
        </Row>
        <Row>
          <Col span={16}>
            <Card
              title={'Comment Widget'}
              extra={<CloseOutlined />}>
              <AccordionDemo/>
            </Card>
          </Col>
        </Row>

        <Row>
          <Col span={16}>
            <Card
              title={'Tab Widget'}
              extra={<CloseOutlined />}>
              <TabDemo/>
            </Card>
          </Col>
        </Row>
      </Space>
    </div>
  );
};

export default WidgetDemo;
//todo tabs, accordion,table, fileUpload, input textarea, list, calendar, comments