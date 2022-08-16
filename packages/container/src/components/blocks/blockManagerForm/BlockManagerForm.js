import { Button, Form, Input } from 'antd';
import PropTypes from 'prop-types';
import React from 'react';

BlockManagerForm.requiredProps = {
  onChange: PropTypes.func,
  fields: PropTypes.array,
  form: PropTypes.any,
  onFinish: PropTypes.func,
  children: PropTypes.node,
};

export default function BlockManagerForm({ onChange, fields, form, onFinish, children }) {
  console.log(fields);
  return (
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
          name={field.name[0]} />);
      })}
      {children}
      <Form.Item>
        <Button htmlType={'submit'}>
          Save changes
        </Button>
      </Form.Item>
    </Form>
  );
}