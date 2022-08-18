import { Button, Form} from 'antd';
import PropTypes from 'prop-types';
import React from 'react';
import Paragraph from '../../widgets-locally/Paragraph';
import BlockFrame from '../edit/BlockFrame';

BlockManagerForm.requiredProps = {
  fields: PropTypes.array,
  form: PropTypes.any,
  onFinish: PropTypes.func,
  children: PropTypes.node,
  startEditBlock: PropTypes.func,
  onDeleteBlock: PropTypes.func,
  formIsUpdated: PropTypes.number,
  revertChanges: PropTypes.func,
};

export default function BlockManagerForm({ fields, form, onFinish, children, startEditBlock, onDeleteBlock, formIsUpdated, revertChanges }) {




  return (
    <div>

      {fields.map(field => {
        return (
          <BlockFrame
            key={field.name[0]}
            id={field.name[0]}
            name={field.value.metadata.title}
            onClickEdit={startEditBlock}
            onClickDelete={onDeleteBlock}
          >
            <Paragraph
              content={field.value.data}
              isEdit={true}
              key={field.name[0]}
              id={field.name[0]}/>
          </BlockFrame>
        );
      })}
      <Form
        name='block manager form'
        layout='inline'
        fields={fields}
        form={form}
        onFinish={onFinish}
      >
        {fields.map((field) => {
          return (<Form.Item
            name={field.name}
            key={field.name}
          ><div></div></Form.Item>);
        })}
        {children}
        <Form.Item>
          <Button htmlType={'submit'} type={'primary'}>
            Save changes
          </Button>
        </Form.Item>

        {formIsUpdated>0 && <Form.Item>
          <Button htmlType={'reset'} onClick={revertChanges}>
            Revert changes
          </Button>
        </Form.Item>}
      </Form>
    </div>
  );
}