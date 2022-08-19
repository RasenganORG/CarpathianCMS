import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Form, Input, Modal, Switch } from 'antd';
import { InfoCircleOutlined } from '@ant-design/icons';
import TextArea from 'antd/es/input/TextArea';
import { useSelector } from 'react-redux';
import { useForm } from 'antd/es/form/Form';
import TextEditor from '../../editor/TextEditor';
import EditBlockForm from './EditBlockForm';

EditBlock.requiredProps = {
  blockId: PropTypes.string,
  editBlockModalVisible: PropTypes.bool,
  setEditBlockModalVisible: PropTypes.func,
  onEditFinished: PropTypes.func,
  blocksForm: PropTypes.any,
};




export default function EditBlock({
                                    blockId,
                                    editBlockModalVisible,
                                    setEditBlockModalVisible,
                                    onEditFinished,
                                    blocksManagerForm,
                                  }) {
  const block = blockId ? (Object.keys(blocksManagerForm.getFieldValue(blockId)).length !== 0 ? blocksManagerForm.getFieldValue(blockId) : undefined) : undefined;

  const [form] = useForm();

  useEffect(() => {
    if (block && editBlockModalVisible === true) {
      form.setFieldValue('title', block.metadata.title);
      form.setFieldValue('titleDisplayed', block.metadata.titleDisplayed);
      form.setFieldValue('description', block.metadata.description);
      form.setFieldValue('data', block.data);
    }
  }, [block, editBlockModalVisible]);

  const onFinishForm = (data) => {
    const formattedData = {
      data: data.data,
      id: blockId,
      metadata: {
        description: data.description,
        pageId: block.metadata.pageId,
        title: data.title,
        titleDisplayed: data.titleDisplayed,
        place: block.metadata.place,
        type: block.metadata.type,
      },
    };
    onEditFinished(blockId, formattedData);
  };

  const onEditBlockFinish = () => {
    form.submit();
    setEditBlockModalVisible(false);
  };


  return (
    <Modal
      visible={editBlockModalVisible}
      title={'Edit block'}
      onOk={onEditBlockFinish}
      cancelText={'Back'}
      onCancel={() => setEditBlockModalVisible(false)}
      maskClosable={false}
      width={'70%'}
      destroyOnClose
      afterClose={() => form.resetFields()}
    >
      <EditBlockForm
        block={block}
        blockForm={form}
        onFinishForm={onFinishForm}
      />
    </Modal>

  );
}