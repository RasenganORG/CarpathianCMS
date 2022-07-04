import { Avatar, Button, List } from 'antd';
import React from 'react';
import { CloseOutlined } from '@ant-design/icons';

const data = [
  {
    title: 'Ant Design Title 1',
  },
  {
    title: 'Ant Design Title 2',
  },
  {
    title: 'Ant Design Title 3',
  },
  {
    title: 'Ant Design Title 4',
  },
];

const ListDemo = () => (
  <div>
    <List
      itemLayout='horizontal'
      dataSource={data}
      renderItem={(item) => (
        <List.Item
          extra={<CloseOutlined />}
        >
          <List.Item.Meta
            avatar={<Avatar src='https://joeschmoe.io/api/v1/random' />}
            title={<a href='https://ant.design'>{item.title}</a>}
            description='Ant Design, a design language for background applications, is refined by Ant UED Team'
          />
        </List.Item>
      )}
    />
    <br/>
    <Button >
      Add a List Item
    </Button>
  </div>
);

export default ListDemo;