import { Button, Col, Divider, Form, Input, Modal, Radio, Row, Table, Typography } from 'antd';
import React, { useEffect, useState } from 'react';
import AddNewColumnForm from './AddNewColumnForm';
import ModifyDataColumnsForm from './ModifyDataColumnsForm';

let columns = [
  {
    title: 'Name',
    dataIndex: 'col1',
  },
  {
    title: 'Age',
    dataIndex: 'col2',
  },
  {
    title: 'Address',
    dataIndex: 'col3',
  },
];
let data = [
  {
    key: '1',
    col1: 'John Brown',
    col2: 32,
    col3: 'New York No. 1 Lake Park',
  },
  {
    key: '2',
    col1: 'Jim Green',
    col2: 42,
    col3: 'London No. 1 Lake Park',
  },
  {
    key: '3',
    col1: 'Joe Black',
    col2: 32,
    col3: 'Sidney No. 1 Lake Park',
  },
  {
    key: '4',
    col1: 'Disabled User',
    col2: 99,
    col3: 'Sidney No. 1 Lake Park',
  },
]; // rowSelection object indicates the need for row selection

const rowSelection = {
  onChange: (selectedRowKeys, selectedRows) => {
    console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
  },
  getCheckboxProps: (record) => ({
    disabled: record.name === 'Disabled User',
    // Column configuration not to be checked
    name: record.name,
  }),
};

const Temp = () => {
  const [selectionType, setSelectionType] = useState('checkbox');
  const [showAddANewLineModal, setShowAddANewLineModal] = useState(false);
  const [showModifyDataColumnsModal, setShowModifyDataColumnsModal] = useState(false);
  const [tabelColumns, setTabelColumns] = useState(columns);
  const [tempColumns, setTempColumns] = useState(columns)
  const [tabelData, setTabelData] = useState(data)

  useEffect(()=>{
    setTabelColumns(tempColumns)
  },[tempColumns])


  const handleAddANewLine = () => {
    setShowAddANewLineModal(true);
  };

  const handleOkAddANewLine = () => {
    setShowAddANewLineModal(false);
  };

  const handleCancelAddANewLine = () => {
    setShowAddANewLineModal(false);
  };

  const onFinishAddANewLineForm = (data) => {
    console.log(data);
  };

  const handleModifyDataColumns = () => {
    setShowModifyDataColumnsModal(true);
  };

  const handleOkModifyDataColumns = () => {
    setShowModifyDataColumnsModal(false);
    console.log('here')
  };

  const handleCancelModifyDataColumns = () => {
    setShowModifyDataColumnsModal(false);
    setTempColumns(columns)
  };


  const addANewLineForm = (
    <Form
      onFinish={onFinishAddANewLineForm}
      style={{
        width: '400px',
      }}
    >
      <Typography.Title level={5}>
        Name
      </Typography.Title>
      <Form.Item name={'name'}>
        <Input
          placeholder={'Enter name'}
          required
          allowClear
          style={{
            width: '100%',
            height: '50px',
          }}
        ></Input>
      </Form.Item>
      <Typography.Title level={5}>
        Age
      </Typography.Title>
      <Form.Item name={'age'}>
        <Input
          placeholder={'Enter age'}
          required
          allowClear
          style={{
            width: '100%',
            height: '50px',
          }}
        ></Input>
      </Form.Item>
      <Typography.Title level={5}>
        Address
      </Typography.Title>
      <Form.Item name={'address'}>
        <Input
          placeholder={'Enter address'}
          required
          allowClear
          style={{
            width: '100%',
            height: '50px',
          }}
        ></Input>
      </Form.Item>
    </Form>);


  return (
    <div>
      <Radio.Group
        onChange={({ target: { value } }) => {
          setSelectionType(value);
        }}
        value={selectionType}
      >
        <Radio value='checkbox'>Checkbox</Radio>
        <Radio value='radio'>Radio</Radio>
      </Radio.Group>

      <Button
        onClick={handleAddANewLine}
        type={'primary'}
        style={{
          marginRight: 30,
        }}>
        Add a new line
      </Button>

      <Button
        onClick={handleModifyDataColumns}
        style={{
          '&:hover': {
            color: 'red !important',
            backgroundColor: 'red !important',
          },
        }}

      >
        Modify data columns
      </Button>

      <Divider />

      <Table
        rowSelection={{
          type: selectionType,
          ...rowSelection,
        }}
        columns={tabelColumns}
        dataSource={tabelData}
      />
      {console.log(tabelColumns)}

      <Modal visible={showAddANewLineModal} onOk={handleOkAddANewLine} onCancel={handleCancelAddANewLine}>
        {addANewLineForm}
      </Modal>
      <Modal visible={showModifyDataColumnsModal} onOK={handleOkModifyDataColumns}
             onCancel={handleCancelModifyDataColumns}>
        <ModifyDataColumnsForm
          tempColumns={tempColumns}
          setTabelColumns={setTabelColumns}
          visible={showModifyDataColumnsModal} />
      </Modal>
    </div>
  );
};

export default Temp;