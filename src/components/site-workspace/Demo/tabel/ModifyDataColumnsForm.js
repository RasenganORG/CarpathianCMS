import { Button, Form, Input } from 'antd';
import React, { useState } from 'react';
import { useEffect } from 'react';


const composeColumnDict = (columns) => {
  let dict = {};
  for (let col of columns) {
    dict[col.dataIndex] = col.title;
  }
  return dict;
};

const ModifyDataColumnsForm = ({tempColumns, setTabelColumns}) => {
  const [formInitialValues, setFormInitialValues] = useState(composeColumnDict(tempColumns))


  const onFinishModifyDataColumnsForm = (data) => {
    console.log(data, tempColumns)
    let newColumns = tempColumns
    for(let col of newColumns){
      if(col.title === ''){
        col.title = data[col.dataIndex]
      }
    }
    setTabelColumns(newColumns)
  };

  const handeAddNewColumn = () => {
    let columns1 = tempColumns
    columns1.push({
      title: '',
      dataIndex: `col${columns1.length+1}`
    })
    setFormInitialValues(composeColumnDict(columns1))
  };

  useEffect(() => {
    console.log('here')
  }, [])

  return(
    <Form
      onFinish={onFinishModifyDataColumnsForm}
      style={{
        width: '400px',
      }}
      initialValues={formInitialValues}
    >
      {tempColumns.map((item) => {
        return (
          <Form.Item
            name={item.dataIndex}
            key={item.dataIndex}
          >
            <Input
              required
              allowClear
              style={{
                width: '100%',
                height: '50px',
              }}
            />
          </Form.Item>);
      })}

      <Button
        onClick={() => handeAddNewColumn()}
        style={{
          marginBottom: 10,
        }}>
        Add new column
      </Button>

      <Form.Item>
        <Button htmlType={'submit'}>Save</Button>
      </Form.Item>
    </Form>
  )
}

export default ModifyDataColumnsForm;