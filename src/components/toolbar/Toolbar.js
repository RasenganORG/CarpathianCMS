import { Button, Card, Col, Row, Space, Tooltip, Typography } from 'antd';
import { EditOutlined, PlusCircleOutlined } from '@ant-design/icons';

const Toolbar = () => {

  return (
    <Card
      style={{
        width: '100%',
        minWidth: '170px',
      }}
    >
      <Space
        size={'large'}
        style={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
        }}>
        <Button
          type={'text'}
        >
          <Tooltip title={'Edit your current page'}>
            <Row>
              <Col span={12}>
                <EditOutlined
                  style={{
                    display: 'inline',
                    fontSize: '200%',
                    marginRight:20
                  }}
                />
              </Col>
              <Col span={12}>
                <Typography>
                  Edit Page
                </Typography>
              </Col>
            </Row>
          </Tooltip>
        </Button>
        <Button
          type={'text'}
        >
          <Tooltip
            title={'Add a new page'}
            style={{
              display: 'flex',
              flexDirection: 'row',
            }}
          >
            <Row>
              <Col span={12}>
                <PlusCircleOutlined
                  style={{
                    display: 'inline',
                    fontSize: '200%',
                    marginRight:20
                  }}
                />
              </Col>
              <Col span={12}>
                <Typography>
                  Add Page
                </Typography>
              </Col>
            </Row>
          </Tooltip>
        </Button>
      </Space>

    </Card>
  );
};

export default Toolbar;