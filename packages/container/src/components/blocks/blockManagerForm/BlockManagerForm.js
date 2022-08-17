import { Button, Form, Input, Modal } from 'antd';
import PropTypes from 'prop-types';
import React, { useState } from 'react';
import Paragraph from '../../widgets-locally/Paragraph';
import BlockFrame from '../edit/BlockFrame';
import EditBlock from '../edit/EditBlock';
import { useForm } from 'antd/es/form/Form';

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

  console.log(fields)


  const startEditBlock = (blockId) => {
    setEditBlockModalVisible(true)
    setSelectedBlock(blockId)
  }

  const onEditBlockFinished = (blockId, blockData) => {
    form.setFieldValue(blockId, blockData)
  }

  return (
    <div>

      <EditBlock
        blockId={selectedBlock}
        editBlockModalVisible={editBlockModalVisible}
        setEditBlockModalVisible={setEditBlockModalVisible}
        onEditFinished={onEditBlockFinished}
      />
      {fields.map(field => {
        return (
          <BlockFrame
            key={field.name}
            id={field.name}
            name={field.value.metadata.title}
            onClick={startEditBlock}
          >
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