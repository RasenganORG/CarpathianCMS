import TextEditor from '../../editor/TextEditor';
import React from 'react';
import { Button, List, Skeleton, Space, Switch } from 'antd';

export default function EditList({ value, onChange }) {
  const listData = []
  for(let item of value.listData){
    listData.push(item)
  }

  const onChangeList = (newData) => {
    onChange({ ...value, listData: newData });
  };

  const onChangeSwitch = (val) => {
    onChange({...value, borderIsVisible: val })
  }

  const onAddListItem = () => {
    let listItem = {
      title:'',
      description:'',
      avatar:'',
      text:'',
    }
    listData.push(listItem)
    onChangeList(listData)
  }

  return (
    <Space
      direction={'vertical'}
      size={18}
    >
      <List
        className="demo-loadmore-list"
        itemLayout="horizontal"
        dataSource={listData}
        renderItem={(item) => (
          <List.Item
            actions={[<a key="list-loadmore-edit">edit</a>, <a key="list-loadmore-more">more</a>]}
          >
            <Skeleton avatar title={false} loading={item.loading} active>
              <List.Item.Meta
                // avatar={<Avatar src={item.picture.large} />}
                title={item.title}
                description={item.description}
              />
              <div>content</div>
            </Skeleton>
          </List.Item>
        )}
      />
      <Button
        onClick={onAddListItem}
      >
        Add List Item
      </Button>
    </Space>

  );
}

