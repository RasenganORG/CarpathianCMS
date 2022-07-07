
import { Button, Divider, Form, Input, InputNumber, Modal, Popconfirm, Radio, Table, Typography } from 'antd';
import React, { useState } from 'react';
import ModifyDataColumnsForm from './ModifyDataColumnsForm';
import { useEffect } from 'react';
import AddNewLineForm from './AddNewLineForm';
import Modals from './Modals';
import TableButtons from './TableButtons';

const originData = [
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
];

const EditableCell = ({
                        editing,
                        dataIndex,
                        title,
                        inputType,
                        record,
                        index,
                        children,
                        ...restProps
                      }) => {
  const inputNode = inputType === 'number' ? <InputNumber /> : <Input />;
  return (
    <td {...restProps}>
      {editing ? (
        <Form.Item
          name={dataIndex}
          style={{
            margin: 0,
          }}
          rules={[
            {
              required: true,
              message: `Please Input ${title}!`,
            },
          ]}
        >
          {inputNode}
        </Form.Item>
      ) : (
        children
      )}
    </td>
  );
};

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

const TabelDemo = () => {
  let columns = [
    {
      title: 'name',
      dataIndex: 'col1',
      editable: true,
    },
    {
      title: 'age',
      dataIndex: 'col2',
      editable: true,
    },
    {
      title: 'address',
      dataIndex: 'col3',
      editable: true,
    },
    {
      title: 'operation',
      dataIndex: 'operation',
      render: (_, record) => {
        const editable = isEditing(record);
        return editable ? (
          <span>
            <Typography.Link
              onClick={() => save(record.key)}
              style={{
                marginRight: 8,
              }}
            >
              Save
            </Typography.Link>
            <Popconfirm title='Sure to cancel?' onConfirm={cancel}>
              <a>Cancel</a>
            </Popconfirm>
          </span>
        ) : (
          <Typography.Link disabled={editingKey !== ''} onClick={() => edit(record)}>
            Edit
          </Typography.Link>
        );
      },
    },
  ];

  const [showAddANewLineModal, setShowAddANewLineModal] = useState(false);
  const [showModifyDataColumnsModal, setShowModifyDataColumnsModal] = useState(false);
  const [selectionType, setSelectionType] = useState('checkbox');
  const [tabelColumns, setTabelColumns] = useState(columns);
  const [tabelData, setTabelData] = useState(originData);


  const handleAddANewLine = () => {
    setShowAddANewLineModal(true);
  };

  const handleModifyDataColumns = () => {
    setShowModifyDataColumnsModal(true);
  };


  const [form] = Form.useForm();
  const [data, setData] = useState(originData);
  const [editingKey, setEditingKey] = useState('');


  const isEditing = (record) => record.key === editingKey;

  const edit = (record) => {
    form.setFieldsValue({
      name: '',
      age: '',
      address: '',
      ...record,
    });
    setEditingKey(record.key);
  };

  const cancel = () => {
    setEditingKey('');
  };

  const save = async (key) => {
    try {
      const row = await form.validateFields();
      const newData = [...data];
      const index = newData.findIndex((item) => key === item.key);

      if (index > -1) {
        const item = newData[index];
        newData.splice(index, 1, { ...item, ...row });
        setData(newData);
        setEditingKey('');
      } else {
        newData.push(row);
        setData(newData);
        setEditingKey('');
      }
    } catch (errInfo) {
      console.log('Validate Failed:', errInfo);
    }
  };



  const mergedColumns = columns.map((col) => {
    if (!col.editable) {
      return col;
    }

    return {
      ...col,
      onCell: (record) => ({
        record,
        inputType: col.dataIndex === 'age' ? 'number' : 'text',
        dataIndex: col.dataIndex,
        title: col.title,
        editing: isEditing(record),
      }),
    };
  });


  return (
    <div>
      <TableButtons
        setSelectionType={setSelectionType}
        selectionType={selectionType}
        handleAddANewLine={handleAddANewLine}
        handleModifyDataColumns={handleModifyDataColumns}
      />

      <Divider />
      <Form form={form} component={false}>
        <Table
          rowSelection={{
            type: selectionType,
            ...rowSelection,
          }}
          components={{
            body: {
              cell: EditableCell,
            },
          }}
          bordered
          dataSource={data}
          columns={mergedColumns}
          rowClassName='editable-row'
          pagination={{
            onChange: cancel,
          }}
        />
      </Form>
      <Modals
        setShowModifyDataColumnsModal={setShowModifyDataColumnsModal}
        setShowAddANewLineModal={setShowAddANewLineModal}
        showAddANewLineModal={showAddANewLineModal}
        showModifyDataColumnsModal={showModifyDataColumnsModal}
        setTabelColumns={setTabelColumns}
        tabelColumns={tabelColumns}
      />

    </div>
  );
};

export default TabelDemo;