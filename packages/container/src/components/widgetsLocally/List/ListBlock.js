import React from 'react';
import { Avatar, List } from 'antd';


export default function ListBlock({ content, isEdit, id }) {
  console.log("content", content)
  return (
    <div>
      <List
        itemLayout="horizontal"
        dataSource={content.listData}
        renderItem={(item, index) => (
          <List.Item>
            <List.Item.Meta
              avatar={<Avatar src={item.avatar.imageUrl} />}
              title={item.title}
              description={item.text}
            />
          </List.Item>
        )}
      />
    </div>
  );
}
