import { Table } from 'antd';
import { useEffect, useState } from 'react';
import DropdownUserOptions from '../dropdowns/DropdownUserOptions';
import React from 'react'
import { getUsers } from '../../services/user/UsersService';


const columns = [
  {
    key: '1',
    title: 'Local Id',
    dataIndex: 'id',
  },
  {
    key: '2',
    title: 'First Name',
    dataIndex: 'firstName',
  },
  {
    key: '3',
    title: 'Last Name',
    dataIndex: 'lastName',
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
  },
  {
    key: '6',
    title: 'Role',
    dataIndex: 'role',
  },
  {
    key:'7',
    title: 'Actions',
    render: (payload) => {
      return <DropdownUserOptions payload={payload}/>;
    }
  }
];



const UserList = () => {
  const [dataSource, setDataSource] = useState([]);
  const [loading, setLoading] = useState(false);

  const [selectedRowKeys, setSelectedRowKeys] = useState([]);

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
        const data = await getUsers()
        data.forEach((row) => {
          row['key'] = row.id
        })

        console.log("data", data)

        setDataSource(data);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    }

    fetchData();

  }, []);
  //todo error in console for unique key prop

  return (
    <>
      <Table
        dataSource={dataSource}
        columns={columns}
        loading={loading}
        rowSelection={rowSelection}
      >

      </Table>
    </>
  );
};

export default UserList;