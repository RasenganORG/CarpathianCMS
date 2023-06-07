import { Button, Divider, Form, Input, InputNumber, Modal, Popconfirm, Select, Table, Typography } from 'antd';
import { useEffect, useState } from 'react';
import DropdownUserOptions from '../dropdowns/DropdownUserOptions';
import React from 'react';
import { deleteUser, getUsers, patchUser } from '../../services/user/UsersService';
import { userActions } from '../../redux/userSlice';
import { notificationActions } from '../../redux/notificationSlice';
import { useDispatch } from 'react-redux';


const UserList = () => {
  const [loading, setLoading] = useState(false);
  const isEditing = (record) => record.key === editingKey;
  const [modalVisible, setModalVisible] = useState(false);
  const [form] = Form.useForm();
  const [data, setData] = useState([]);
  const [editingKey, setEditingKey] = useState('');
  const [deletingKey, setDeletingKey] = useState('');
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const dispatch = useDispatch();
  const [confirmationValue, setConfirmationValue] = useState('');
  const [buttonDisabled, setButtonDisabled] = useState(true);


  const edit = (record) => {
    form.setFieldsValue({
      name: '',
      id: '',
      ...record,
    });
    setEditingKey(record.key);
  };

  const save = async (key) => {
    try {
      const row = await form.validateFields();
      const id = editingKey;
      const newData = [...data];


      const res = await patchUser(id, row);
      if (res.type === 'success') {
        dispatch(userActions.updateUser(newData));
        dispatch(notificationActions.openNotification({
          message: 'User updated successfully',
          description: '',
          type: 'success',
        }));
      } else {
        dispatch(notificationActions.openNotification({
          message: 'Error while updating user',
          description: '',
          type: 'error',
        }));
      }

      const index = newData.findIndex((item) => key === item.key);
      if (index > -1) {
        const item = newData[index];
        newData.splice(index, 1, {
          ...item,
          ...row,
        });
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

  const cancel = () => {
    setEditingKey('');
  };

  const handleDelete = async (key) => {

    const res = await deleteUser(key);

    if (res.type === 'success') {
      const newData = data.filter((item) => item.key !== key);
      setData(newData);

      dispatch(userActions.updateUser(newData));
      dispatch(notificationActions.openNotification({
        message: 'User delete successfully',
        description: '',
        type: 'success',
      }));
    } else {
      dispatch(notificationActions.openNotification({
        message: 'Error while deleting user',
        description: '',
        type: 'error',
      }));
    }

    setConfirmationValue('')
    setDeletingKey(undefined);
    setModalVisible(false);
  };


  const onSelectChange = (newSelectedRowKeys) => {
    setSelectedRowKeys(newSelectedRowKeys);
  };

  const rowSelection = {
    selectedRowKeys,
    onChange: onSelectChange,
    selections: [
      Table.SELECTION_ALL,
      Table.SELECTION_NONE,
      {
        key: 'odd',
        text: 'Select Odd Row',
        onSelect: (changableRowKeys) => {
          let newSelectedRowKeys = [];
          newSelectedRowKeys = changableRowKeys.filter((_, index) => {
            if (index % 2 !== 0) {
              return false;
            }
            return true;
          });
          setSelectedRowKeys(newSelectedRowKeys);
        },
      },
      {
        key: 'even',
        text: 'Select Even Row',
        onSelect: (changableRowKeys) => {
          let newSelectedRowKeys = [];
          newSelectedRowKeys = changableRowKeys.filter((_, index) => {
            if (index % 2 !== 0) {
              return true;
            }
            return false;
          });
          setSelectedRowKeys(newSelectedRowKeys);
        },
      },
    ],
  };

  useEffect(() => {
    async function fetchData() {
      setLoading(true);
      try {
        const response = await fetch('https://jsonplaceholder.typicode.com/users');
        const data = await getUsers();
        data.forEach((row) => {
          row['key'] = row.id;
        });

        console.log('data', data);

        setData(data);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    }

    fetchData();

  }, []);


  const columns = [
    {
      key: '2',
      title: 'First Name',
      dataIndex: 'firstName',
      editable: true,
    },
    {
      key: '3',
      title: 'Last Name',
      dataIndex: 'lastName',
      editable: true,
    },
    {
      key: '4',
      title: 'Email',
      dataIndex: 'email',
    },
    {
      key: '5',
      title: 'Phone',
      dataIndex: 'phone',
      editable: true,
    },
    {
      key: '6',
      title: 'Role',
      dataIndex: 'role',
      editable: true,
    },
    {
      key: 8,
      title: 'Edit',
      dataIndex: 'edit',
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
    {
      key: '7',
      title: 'Delete',
      dataIndex: 'delete',
      render: (_, record) =>
        data.length >= 1 ? (
          <Button title='Sure to delete?' onClick={() => {
            setDeletingKey(record.key);
            setModalVisible(true);
          }}>
            <a>Delete</a>
          </Button>
        ) : null,
    },
  ];


  const mergedColumns = columns.map((col) => {
    if (!col.editable) {
      return col;
    }

    return {
      ...col,
      onCell: (record) => ({
        record,
        inputType: col.dataIndex === 'role' ? 'select' : 'text',
        dataIndex: col.dataIndex,
        title: col.title,
        editing: isEditing(record),
      }),
    };
  });





  // enables Delete button only when the input is correct
  useEffect(() => {
    if (confirmationValue === `delete/${data.find(item => item.id === deletingKey)?.email}`)
      setButtonDisabled(false);
    else
      setButtonDisabled(true);
  }, [confirmationValue]);


  return (
    <>
      <Form form={form} component={false}>
        <Table
          components={{
            body: {
              cell: EditableCell,
            },
          }}
          dataSource={data}
          columns={mergedColumns}
          loading={loading}
          rowSelection={rowSelection}
          rowClassName='editable-row'
          bordered
        />
      </Form>

      <Modal
        open={modalVisible}
        okText={'Delete User'}
        cancelText={'Cancel'}
        title={'Delete User'}
        onCancel={() => setModalVisible(false)}
        onOk={() => handleDelete(deletingKey)}
        okButtonProps={{
          disabled: buttonDisabled,
          danger: true,
        }}
        destroyOnClose={true}
      >
        <Typography>Are you sure you want to delete this page? </Typography>
        <div
          style={{
            display: 'flex',
            justifyContent: 'row',
          }}>
          <Typography style={{ marginRight: '5px' }}>All of it's content will be</Typography>
          <Typography.Text strong type={'danger'}> permanently deleted.</Typography.Text>
        </div>
        <Divider />
        <div
          style={{
            display: 'flex',
            justifyContent: 'row',
            marginBottom: '1rem',
            marginTop: '2rem',
          }}>
          <Typography.Text>Please type: </Typography.Text>
          <Typography.Text
            strong={true}
            keyboard={true}
          > delete/{data.find(item => item.id === deletingKey)?.email}</Typography.Text>
          <Typography.Text> to confirm.</Typography.Text>

        </div>
        <Input
          value={confirmationValue}
          onChange={(t) => setConfirmationValue(t.target.value)}
        />

      </Modal>


    </>
  );
};

export default UserList;

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
  let inputNode = inputType === 'number' ? <InputNumber /> : <Input />;
  if (inputType === 'select') {
    inputNode = (
      <Form.Item
        name={dataIndex}
        rules={[
          {
            required: true,
            message: `Please select a ${title}!`,
          },
        ]}
        style={{ margin: 0 }}
      >
        <Select>
          <Option value='admin'>Admin</Option>
          <Option value='editor'>Editor</Option>
          <Option value='user'>User</Option>
        </Select>
      </Form.Item>
    );
  }

  return (
    <td {...restProps}>
      {editing ? (
        <Form.Item
          name={dataIndex}
          style={{ margin: 0 }}
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
