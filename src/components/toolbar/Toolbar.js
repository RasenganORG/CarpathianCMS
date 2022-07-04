import { Button, Card, Col, Row, Space, Tooltip, Typography } from 'antd';
import { EditOutlined, PlusCircleOutlined } from '@ant-design/icons';

const Toolbar = ({isEdit}) => {

  const preview= <Button
    type={'text'}
  >
    <Tooltip
      title={'Preview your website'}
      style={{
        display: 'flex',
        flexDirection: 'row',
      }}
    >
      <Row>
        <Col span={12}>
          <img
            src={'https://img.icons8.com/ios-filled/30/000000/uchiha-eyes.png'}
            style={{
              display: 'inline',
              fontSize: '200%',
              marginRight:20
            }}
          />
        </Col>
        <Col span={12}>
          <Typography.Title level={4}>
            Preview
          </Typography.Title>
        </Col>
      </Row>
    </Tooltip>
  </Button>

  const editPage = <Button
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
          <Typography.Title level={4}>
            Edit Page
          </Typography.Title>
        </Col>
      </Row>
    </Tooltip>
  </Button>

  return (
    <Card
      style={{
        top:200,
        left:10,
        width: '180px',
        position:'fixed'
      }}
    >
      <Space
        size={'large'}
        direction={'vertical'}
        style={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          width:'100%'
        }}>
        {isEdit && preview}
        {!isEdit && editPage}

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
                <Typography.Title level={4}>
                  Add Page
                </Typography.Title>
              </Col>
            </Row>
          </Tooltip>
        </Button>

      </Space>

    </Card>
  );
};

export default Toolbar;