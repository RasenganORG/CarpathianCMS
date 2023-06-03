import React from 'react';
import { Avatar, List } from 'antd';


export default function ListBlock({ content, isEdit, id }) {
  return (
    <div>
      <List
        itemLayout="horizontal"
        dataSource={content.data}
        renderItem={(item, index) => (
          <List.Item>
            <List.Item.Meta
              avatar={<Avatar src={`https://xsgames.co/randomusers/avatar.php?g=pixel&key=${index}`} />}
              title={item.title}
              description={item.description}
            />
          </List.Item>
        )}
      />
    </div>
  );
}
