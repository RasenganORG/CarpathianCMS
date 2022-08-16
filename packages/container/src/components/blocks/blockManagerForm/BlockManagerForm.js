import { Button, Form, Input, Modal } from 'antd';
import PropTypes from 'prop-types';
import React, { useState } from 'react';
import Paragraph from '../../widgets-locally/Paragraph';
import BlockFrame from '../edit/BlockFrame';
import EditBlock from '../edit/EditBlock';

BlockManagerForm.requiredProps = {
  onChange: PropTypes.func,
  fields: PropTypes.array,
  form: PropTypes.any,
  onFinish: PropTypes.func,
  children: PropTypes.node,
};

export default function BlockManagerForm({ onChange, fields, form, onFinish, children }) {
  const [editBlockModalVisible, setEditBlockModalVisible] = useState(false)
  const [selectedBlock, setSelectedBlock] = useState()
  console.log(fields);

  const onEditBlockFinish = () => {
    setEditBlockModalVisible(false)
  };

  const startEditBlock = (blockId) => {
    setEditBlockModalVisible(true)
    setSelectedBlock(blockId)
  }

  return (
    <div>
      <Modal
        visible={editBlockModalVisible}
        title={'Edit block'}
        onOk={onEditBlockFinish}
        onCancel={() => setEditBlockModalVisible(false)}
      >
        <EditBlock blockId={selectedBlock}/>
      </Modal>
      {fields.map(field => {
        return (
          <BlockFrame
            key={field.name}
            id={field.name}
            name={field.value.metadata.title}
            onClick={startEditBlock}>
            <Paragraph
              content={field.value.data}
              isEdit={true}
              key={field.name}
              id={field.name}/>
          </BlockFrame>
        );
      })}
      <Form
        name='global_state'
        layout='inline'
        fields={fields}
        onFieldsChange={(_, allFields) => {
          onChange(allFields);
        }}
        form={form}
        onFinish={onFinish}
      >
        {fields.map((field) => {
          return (<Form.Item
            name={field.name} />);
        })}
        {children}
        <Form.Item>
          <Button htmlType={'submit'}>
            Save changes
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
}