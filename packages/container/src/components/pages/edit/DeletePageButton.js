import { Button, Divider, Input, Modal, Tooltip, Typography } from 'antd';
import React, { useEffect, useState } from 'react';
import { deletePage as deletePageApi } from '../../../services/pages/PagesService';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { notificationActions } from '../../../redux/notificationSlice';
import { pagesActions } from '../../../redux/pagesSlice';

const DeletePageButton = () => {
  const [modalIsOpened, setModalIsOpened] = useState(false);
  const [confirmationValue, setConfirmationValue] = useState('');
  const selectedPage = useSelector(state => state.pages.selectedPage);
  const currentPage = useSelector(state => state.pages.pagesList.find((p) => p.id === selectedPage));
  const [buttonDisabled, setButtonDisabled] = useState(true);
  const dispatch = useDispatch();

  const navigate = useNavigate();

  const deletePage = async () => {
    const res = await deletePageApi(selectedPage);
    console.log(res);
    setModalIsOpened(false);
    if (res.data.type === 'success') {
      navigate('/account');
      dispatch(notificationActions.openNotification({
        message: 'Page deleted successfully',
        description: '',
        type: 'success',
      }));
      dispatch(pagesActions.refreshNavBar())
    }
    else{
      dispatch(notificationActions.openNotification({
        message: 'Error while trying to delete the page',
        description: '',
        type: 'error',
      }));
    }
  };

  // enables Delete button only when the input is correct
  useEffect(() => {
    if (confirmationValue === `delete/${currentPage.data.metadata.href}`)
      setButtonDisabled(false);
    else
      setButtonDisabled(true);
  }, [confirmationValue]);

  return (
    <div>
      <Modal
        visible={modalIsOpened}
        okText={'Delete Page'}
        cancelText={'Cancel'}
        title={'Delete page'}
        onCancel={() => setModalIsOpened(false)}
        onOk={() => deletePage()}
        okButtonProps={{
          disabled: buttonDisabled,
          danger: true,
        }}
        destroyOnClose={true}
      >
        <Typography>Are you sure you want to delete this page? </Typography>
        <div
          style={{
            display: 'flex',
            justifyContent: 'row',
          }}>
          <Typography style={{ marginRight: '5px' }}>All of it's content will be</Typography>
          <Typography.Text strong type={'danger'}> permanently deleted.</Typography.Text>
        </div>
        <Divider />
        <div
          style={{
            display: 'flex',
            justifyContent: 'row',
            marginBottom: '1rem',
            marginTop: '2rem',
          }}>
          <Typography.Text>Please type: </Typography.Text>
          <Typography.Text
            strong={true}
            keyboard={true}
          > delete/{currentPage.data.metadata.href}</Typography.Text>
          <Typography.Text> to confirm.</Typography.Text>

        </div>
        <Input
          value={confirmationValue}
          onChange={(t) => setConfirmationValue(t.target.value)}
        />

      </Modal>
      <Tooltip title={'This page will pe deleted and all of it\'s data will pe permanently lost'}>
        <Button
          type='primary'
          danger
          onClick={() => setModalIsOpened(true)}
        >
          Delete Page
        </Button>
      </Tooltip>
    </div>
  );
};

export default DeletePageButton;
