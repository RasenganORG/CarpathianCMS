import React from 'react';
import { Avatar, List } from 'antd';


export default function ListBlock({ content, isEdit, id }) {
  return (
    <div>
      <List
        itemLayout="horizontal"
        dataSource={content.listData}
        renderItem={(item, index) => (
          <List.Item>
            <List.Item.Meta
              avatar={<Avatar src={content.isDisplayingAvatars ? item.avatar.imageUrl: null } />}
              title={content.isDisplayingTitle ? item.title : null }
              description={content.isDisplayingContent ? item.text : null }
            />
          </List.Item>
        )}
      />
    </div>
  );
}
