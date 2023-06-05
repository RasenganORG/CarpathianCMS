import React, { useEffect, useState } from 'react';
import { Avatar, Button, Input, List, Skeleton, Space, Switch, Typography } from 'antd';
import { v4 as uuidv4 } from 'uuid';
import DragAndDropImage from '../../upload/DragAndDropImage';
import ImageUpload from '../../upload/ImageUpload';

export default function EditList({ value, onChange }) {
  const [listData, setListData] = useState([]);
  const [editingItem, setEditingItem] = useState({});
  const [isDisplayingAvatars, setIsDisplayingAvatars] = useState(Boolean(value.isDisplayingAvatars));

  console.log('listData', listData);

  useEffect(() => {
    let arr = [];
    for (let item of value.listData) {
      arr.push(item);
    }
    setListData(arr);
  }, []);


  const onChangeList = (newData) => {
    onChange({ ...value, listData: newData });
  };

  useEffect(() => {
    onChangeList(listData);
  }, [listData]);

  const onChangeSwitch = (val) => {
    onChange({ ...value, isDisplayingAvatars: val });
    setIsDisplayingAvatars(val);
  };

  const onAddListItem = () => {
    let listItem = {
      id: uuidv4(),
      title: '',
      description: '',
      avatar: {
        imageUrl: '',
        newFilename: '',
        originalFilename: '',
      },
      text: '',
    };
    setListData((prevState) => {
      return [...prevState, listItem];
    });
    onChangeList(listData);
  };

  const addToListData = (itemToBeAdded= undefined) => {
    if(itemToBeAdded === undefined){
      itemToBeAdded = editingItem
    }

    setListData((prevState) => {
      const arr = [];
      for (let item of prevState) {
        if (item.id !== itemToBeAdded.id) {
          arr.push(item);
        } else {
          arr.push(itemToBeAdded);
        }
      }
      return arr;
    });

    setEditingItem({});
  }

  const editButtonClicked = (item) => {
    if (item.id !== editingItem.id || JSON.stringify(editingItem) === '{}') {
      console.log('aaaa')
      setEditingItem(item);
    } else {
      addToListData()
    }
  };

  const onAvatarAdded = (item, photo) => {
    const newItem = JSON.parse(JSON.stringify(item))
    console.log('photo added', item, photo);
    newItem.avatar = photo;
    addToListData(newItem)
  };

  return (
    <Space
      direction={'vertical'}
      size={18}
    >
      <Switch
        defaultChecked={value.isDisplayingAvatars}
        onChange={onChangeSwitch}
        checkedChildren={'Displaying Avatars'}
        unCheckedChildren={'Not Displaying Avatars'}
      />
      <List
        className='demo-loadmore-list'
        itemLayout='vertical'
        dataSource={listData}
        renderItem={(item) => (
          <List.Item
            actions={[
              <Button
                key='list-loadmore-edit'
                onClick={() => editButtonClicked(item)}>
                {(item.id !== editingItem.id || JSON.stringify(editingItem) === '{}') ?
                  <Typography> Edit  </Typography>
                  :
                  <Typography> Save  </Typography>}
              </Button>,
              <Button
                onClick={() => setEditingItem({})}
                hidden={item.id !== editingItem.id || JSON.stringify(editingItem) === '{}'}>Cancel</Button>,
              <div style={{
                display: isDisplayingAvatars ? 'block' : 'none',
              }}>
                <ImageUpload onAdd={(imageUrl, originalFilename, newFilename) => onAvatarAdded(item, {
                  imageUrl,
                  originalFilename,
                  newFilename,
                })}
                             defaultFilelist={[item.avatar]}
                             multiple={false} />
              </div>,
            ]}
          >
            <Skeleton avatar title={false} loading={item.loading} active>
              <List.Item.Meta
                avatar={
                  <div style={{
                    display: isDisplayingAvatars ? 'block' : 'none',
                  }}>
                    <Avatar src={item.avatar.imageUrl} /></div>}
                title={item.title}
                description={item.text}
              />
              {item.id !== editingItem.id ?
                <></>
                :
                <Space
                  size={'large'}
                >
                  <Input
                    style={{ minWidth: '15rem' }}
                    placeholder='Title of the List Item'
                    addonBefore={'Title: '}
                    value={editingItem?.title}
                    onChange={(value) => setEditingItem((prevState) => {
                      return { ...prevState, title: value.target.value };
                    })}
                  />
                  <Input
                    style={{ minWidth: '15rem' }}
                    placeholder='Content of the List Item'
                    addonBefore={'Content: '}
                    value={editingItem?.text}
                    onChange={(value) => setEditingItem((prevState) => {
                      return { ...prevState, text: value.target.value };
                    })}
                  />
                </Space>
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

