import { Table } from 'antd';
import { useEffect, useState } from 'react';
import DropdownUserOptions from '../../layouts/Dropdowns/DropdownUserOptions';


const columns = [
  {
    key: '1',
    title: 'ID',
    dataIndex: 'id',
  },
  {
    key: '2',
    title: 'Name',
    dataIndex: 'name',
  },
  {
    key: '3',
    title: 'Username',
    dataIndex: 'username',
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
    title: 'Website',
    dataIndex: 'website',
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
        const data = await response.json();
        data.forEach((row) => {
          row['key'] = row.id
        })

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