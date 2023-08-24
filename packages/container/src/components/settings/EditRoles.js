import { Button, Checkbox, Space, Table } from 'antd';
import { useEffect, useState } from 'react';
import { CloseCircleFilled, CloseCircleTwoTone } from '@ant-design/icons';
import React from 'react'


const columns = [
  {
    key: '1',
    title: 'ID',
    dataIndex: 'id',
  },
  {
    key: '2',
    title: 'Create Pages',
    dataIndex: 'createPages',
  },
  {
    key: '3',
    title: 'Edit Pages',
    dataIndex: 'editPages',
  },
  {
    key: '4',
    title: 'Delete Pages',
    dataIndex: 'deletePages',
  },
  {
    key: '5',
    title: 'Create Content',
    dataIndex: 'createContent',
  },
  {
    key: '6',
    title: 'Edit Content',
    dataIndex: 'editContent',
  },
  {
    key: '7',
    title: 'Delete Content',
    dataIndex: 'deleteContent',
  },
  {
    key: '8',
    title: 'Add or Delete Roles',
    dataIndex: 'addOrDeleteRoles',
  },
  {
    key: '8',
    title: 'Delete',
    render: (payload) => {
      return <CloseCircleTwoTone />
    },
  },
];


const data = [
  {
    key: '1',
    id: 'Admin',
    createPages: <Checkbox value={'id-Admin'} />,
    editPages: <Checkbox value={'editPages-Admin'} />,
    deletePages: <Checkbox value={'deletePages-Admin'} />,
    createContent: <Checkbox value={'createContent-Admin'} />,
    editContent: <Checkbox value={'editContent-Admin'} />,
    deleteContent: <Checkbox value={'deleteContent-Admin'} />,
    addOrDeleteRoles: <Checkbox value={'addOrDeleteRoles-Admin'} />,
  },
  {
    key: '2',
    id: 'Editor',
    createPages: <Checkbox value={'id-Editor'} />,
    editPages: <Checkbox value={'editPages-Editor'} />,
    deletePages: <Checkbox value={'deletePages-Editor'} />,
    createContent: <Checkbox value={'createContent-Editor'} />,
    editContent: <Checkbox value={'editContent-Editor'} />,
    deleteContent: <Checkbox value={'deleteContent-Editor'} />,
    addOrDeleteRoles: <Checkbox value={'addOrDeleteRoles-Editor'} />,
  },
  {
    key: '3',
    id: 'User',
    createPages: <Checkbox value={'id-User'} />,
    editPages: <Checkbox value={'editPages-User'} />,
    deletePages: <Checkbox value={'deletePages-User'} />,
    createContent: <Checkbox value={'createContent-User'} />,
    editContent: <Checkbox value={'editContent-User'} />,
    deleteContent: <Checkbox value={'deleteContent-User'} />,
    addOrDeleteRoles: <Checkbox value={'addOrDeleteRoles-User'} />,
  },
];


const EditRoles = () => {
  const [dataSource, setDataSource] = useState([]);
  console.log(dataSource);

  const onChange = (checkedValues) => {
    console.log('checked = ', checkedValues);
  };


  return (
    <div
      style={{
        width:'100%',
      }}
    >
      <Checkbox.Group
        onChange={onChange}
      >
        <Space
          size={'middle'}
          style={{
            margin:10
          }}
        >
          <Button type={'primary'}>
            Add role
          </Button>
        </Space>
        <Table
          dataSource={data}
          columns={columns}
        >
        </Table>

      </Checkbox.Group>
    </div>
  );
};

export default EditRoles;