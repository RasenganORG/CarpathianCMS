import TextEditor from '../../editor/TextEditor';
import React, { useEffect, useState } from 'react';
import { Button, Input, List, Skeleton, Space, Switch, Typography } from 'antd';
import { v4 as uuidv4 } from 'uuid';

export default function EditList({ value, onChange }) {
  const [listData, setListData] = useState(value.listData);
  const [editingItem, setEditingItem] = useState({});

  console.log('listData', listData);

  for (let item of value.listData) {
    listData.push(item);
  }

  const onChangeList = (newData) => {
    onChange({ ...value, listData: newData });
  };

  useEffect(() => {
    onChangeList(listData);
  }, [listData]);

  const onChangeSwitch = (val) => {
    onChange({ ...value, borderIsVisible: val });
  };

  const onAddListItem = () => {
    let listItem = {
      id: uuidv4(),
      title: '',
      description: '',
      avatar: '',
      text: '',
    };
    setListData((prevState) => {
      return [...prevState, listItem];
    });
    onChangeList(listData);
  };

  const editButtonClicked = (item) => {
    if(item.id !== editingItem.id || JSON.stringify(editingItem) === '{}'){
      setEditingItem(item)
    }else{
      setEditingItem({})
    }
  }

  return (
    <Space
      direction={'vertical'}
      size={18}
    >
      <List
        className='demo-loadmore-list'
        itemLayout='horizontal'
        dataSource={listData}
        renderItem={(item) => (
          <List.Item
            actions={[
              <Button
                key='list-loadmore-edit'
                onClick={() => editButtonClicked(item)}>
                {(item.id !== editingItem.id || JSON.stringify(editingItem) === '{}') ?
                  <Typography> edit content </Typography>
                  :
                  <Typography> save content </Typography>}
              </Button>,
              <Button key='list-loadmore-delete'>more</Button>,
            ]}
          >
            <Skeleton avatar title={false} loading={item.loading} active>
              <List.Item.Meta
                // avatar={<Avatar src={item.picture.large} />}
                title={item.title}
                description={item.description}
              />
              {item.id !== editingItem.id ?
                <div style={{ minWidth: '7rem' }}>
                  {item.text}
                </div>
                :
                <Input
                  style={{ minWidth: '7rem' }}
                  placeholder='Basic usage'
                  value={editingItem?.text}
                  onChange={(value) => setEditingItem((prevState) => {
                    return { ...prevState, text: value.target.value }
                  })}
                />
              }
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

