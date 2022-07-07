import { Button, Radio } from 'antd';
import React from 'react';


const TableButtons = (props) => {

  return(
    <div>
      <Radio.Group
        onChange={({ target: { value } }) => {
          props.setSelectionType(value);
        }}
        value={props.selectionType}
      >
        <Radio value='checkbox'>Checkbox</Radio>
        <Radio value='radio'>Radio</Radio>
      </Radio.Group>

      <Button
        onClick={props.handleAddANewLine}
        type={'primary'}
        style={{
          marginRight: 30,
        }}>
        Add a new line
      </Button>

      <Button
        onClick={props.handleModifyDataColumns}
        style={{
          '&:hover': {
            color: 'red !important',
            backgroundColor: 'red !important',
          },
        }}

      >
        Modify data columns
      </Button>
    </div>
  )
}

export default TableButtons;