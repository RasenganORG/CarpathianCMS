import { Button, Form } from 'antd';
import PropTypes from 'prop-types';
import React from 'react';
import Paragraph from '../widgetsLocally/Paragraph/Paragraph';
import BlockFrame from './editBlock/BlockFrame';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import DraggableList from '../draggable-list/DraggableList';


BlockManagerForm.requiredProps = {
  fields: PropTypes.array,
  form: PropTypes.any,
  onFinish: PropTypes.func,
  children: PropTypes.node,
  startEditBlock: PropTypes.func,
  onDeleteBlock: PropTypes.func,
  formIsUpdated: PropTypes.number,
  revertChanges: PropTypes.func,
  updateBlocksPlaces: PropTypes.func,
};

export default function BlockManagerForm(
  {
    fields,
    form,
    onFinish,
    children,
    startEditBlock,
    onDeleteBlock,
    formIsUpdated,
    revertChanges,
    updateBlocksPlaces,
  }) {



  return (
    <div>

      <DraggableList
        fields={fields}
        onDeleteBlock={onDeleteBlock}
        startEditBlock={startEditBlock}
        updateBlocksPlaces={updateBlocksPlaces}
      />

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
          >
            <div></div>
          </Form.Item>);
        })}
        {children}
        { (fields.length > 0 || formIsUpdated !== 0) &&
        (<Form.Item>
          <Button htmlType={'submit'} type={'primary'}>
            Save changes
          </Button>
        </Form.Item>)
        }

        {formIsUpdated > 0 && <Form.Item>
          <Button htmlType={'reset'} onClick={revertChanges}>
            Revert changes
          </Button>
        </Form.Item>}
      </Form>
    </div>
  );
}
