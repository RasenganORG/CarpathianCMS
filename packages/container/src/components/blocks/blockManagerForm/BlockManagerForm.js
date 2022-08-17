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
};

export default function BlockManagerForm({ fields, form, onFinish, children, startEditBlock }) {


  return (
    <div>

      {fields.map(field => {
        return (
          <BlockFrame
            key={field.name[0]}
            id={field.name[0]}
            name={field.value.metadata.title}
            onClick={startEditBlock}
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