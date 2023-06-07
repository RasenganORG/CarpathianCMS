import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import {  Modal} from 'antd';
import { useForm } from 'antd/es/form/Form';
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


  // takes the values of the block from blockManagerForm so that a user can edit a block multiple times before saving it to the backend ant thus to redux
  const block = blockId !== undefined && blocksManagerForm?.getFieldValue(blockId) !== null  ?
    (Object.keys(blocksManagerForm?.getFieldValue(blockId)).length !== 0 ? blocksManagerForm?.getFieldValue(blockId) : undefined) : undefined;


  // This is the form in which all the data associated with a block is edited
  const [blockForm] = useForm();
  const values = blockForm.getFieldValue('data')


  // when the modal becomes visible it sets the default values of the fields in form with what it is given from the block manager form
  useEffect(() => {
    if (block && editBlockModalVisible === true) {
      blockForm.setFieldValue('title', block.metadata.title);
      blockForm.setFieldValue('titleDisplayed', block.metadata.titleDisplayed);
      blockForm.setFieldValue('description', block.metadata.description);
      blockForm.setFieldValue('data', block.data);
    }
  }, [block, editBlockModalVisible]);

  // when the form is submitted the object is formatted and sent to the blockManagerForm to store the new value of the block
  const onFinishForm = (data) => {
    if(typeof data.data === 'object') {
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
    }
  };

  useEffect(() => {
    const values = blockForm.getFieldValue('data')

  }, [blockForm])

  // this is called when ok button in modal is pressed and the form is submitted manually
  const onEditBlockFinish = () => {
    blockForm.submit();
    setEditBlockModalVisible(false);
  };


  return (
    <Modal
      open={editBlockModalVisible}
      title={'Edit block'}
      onOk={onEditBlockFinish}
      cancelText={'Back'}
      onCancel={() => setEditBlockModalVisible(false)}
      maskClosable={false}
      width={'70%'}
      destroyOnClose
      afterClose={() => blockForm.resetFields()}
    >
      <EditBlockForm
        block={block}
        blockForm={blockForm}
        onFinishForm={onFinishForm}
      />
    </Modal>

  );
}