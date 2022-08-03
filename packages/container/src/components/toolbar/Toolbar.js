import { Alert, Button, Card, Col, Modal, Row, Space, Tooltip, Typography } from 'antd';
import { EditOutlined, PlusCircleOutlined } from '@ant-design/icons';
import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import AddNewPageForm from '../pages/AddNewPageForm';

const Toolbar = () => {
  const [leaveModalIsOpened, setLeaveModalIsOpened] = useState(false);
  const [newPageModalIsOpened, setNewPageModalIsOpened] = useState(false)

  const navigate = useNavigate();
  const isEdit = window.location.pathname.split('/').findIndex((word) => word === 'edit') !== -1;
  const { pageid = '' } = useParams();


  const onExitEdit = () => {
    navigate(`${pageid}`);
    setLeaveModalIsOpened(false);
  };

  const onAddNewPage = () => {
    setNewPageModalIsOpened(true);
  };


  const preview = <Button
    type={'text'}
    onClick={() => setLeaveModalIsOpened(true)}
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
              marginRight: 20,
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
  </Button>;

  const editPage = <Button
    type={'text'}
    onClick={() => navigate(`${pageid}/edit`)
    }
  >
    <Tooltip title={'Edit your current page'}>
      <Row>
        <Col span={12}>
          <EditOutlined
            style={{
              display: 'inline',
              fontSize: '200%',
              marginRight: 20,
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
  </Button>;


  return (
    <div>
      <Modal
        visible={leaveModalIsOpened}
        onOk={onExitEdit}
        onCancel={() => setLeaveModalIsOpened(false)}
        okText={'Leave edit page'}
        cancelText={'Cancel'}
      >
        <Typography.Title level={3}>
          Are you sure you want to leave?
        </Typography.Title>
        <Typography.Title level={5}>
          Your work will be automatically saved upon leaving this page.
        </Typography.Title>
      </Modal>
      <AddNewPageForm
        setNewPageModalIsOpened={setNewPageModalIsOpened}
        newPageModalIsOpened={newPageModalIsOpened} />
      <Card
        style={{
          top: 200,
          left: 10,
          paddingRight: 20,
          width: '220px',
          position: 'fixed',
        }}
      >
        <Space
          size={'large'}
          direction={'vertical'}
          style={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            width: '100%',
          }}>
          {isEdit && preview}
          {!isEdit && editPage}

          <Button
            type={'text'}
            onClick={onAddNewPage}
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
                      marginRight: 20,
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
    </div>
  );
};

export default Toolbar;