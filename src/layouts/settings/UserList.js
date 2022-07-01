import { Table } from 'antd';
import { useEffect, useState } from 'react';
import DropdownUserOptions from '../Dropdowns/DropdownUserOptions';


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
  console.log(dataSource)
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function fetchData() {
      setLoading(true);
      try {
        const response = await fetch('https://jsonplaceholder.typicode.com/users');
        const data = await response.json();
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
        pagination={5}
      >

      </Table>
    </>
  );
};

export default UserList;