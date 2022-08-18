import React, { useState } from 'react';
import { Button, Modal, Space, Tooltip, Typography } from 'antd';
import { DeleteTwoTone, EditTwoTone } from '@ant-design/icons';
import PropTypes from 'prop-types';

BlockFrame.requiredProps = {
  children: PropTypes.node,
  id: PropTypes.string,
  onClickEdit: PropTypes.func,
  name: PropTypes.string,
  onClickDelete:PropTypes.func,
};

export default function BlockFrame({ children, id, onClickEdit, name, onClickDelete }) {
  return (
    <div
      style={{
        marginBottom: '2rem',
        padding: '1rem',
        backgroundColor: '#FCFEFF ',
      }}
    >
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
        }}
      >
        <Typography.Title level={5}>
          {name}
        </Typography.Title>
        <Space>
          <BlockEditButton onClick={onClickEdit} id={id} />
          <BlockDeleteButton onClick={onClickDelete} id={id} />
        </Space>
      </div>
      {children}
    </div>
  );
}

const BlockEditButton = ({ onClick, id }) => {

  return (
    <Tooltip title={'Edit the current block'}>
      <Button
        shape={'circle'}
        icon={<EditTwoTone />}
        onClick={() => onClick(id)}
      />
    </Tooltip>
  );
};

const BlockDeleteButton = ({ onClick, id }) => {
  const [modalDisplayed, setModalDisplayed] = useState(false);


  return (
    <div>
      <Modal
        visible={modalDisplayed}
        title={''}
        onOk={() => onClick(id)}
        onCancel={() => setModalDisplayed(false)}
        cancelText={'Cancel'}
        okText={'Delete'}
      >
        <Typography.Title level={5}>
          Are you sure you want to delete this block?
        </Typography.Title>
      </Modal>
      <Tooltip title={'Delete this block'}>
        <Button
          shape={'circle'}
          icon={<DeleteTwoTone />}
          onClick={() => setModalDisplayed(true)}
        />
      </Tooltip>
    </div>
  );
};