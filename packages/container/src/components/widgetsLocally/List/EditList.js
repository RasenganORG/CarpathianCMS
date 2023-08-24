import React, { useEffect, useState } from 'react';
import { Avatar, Button, Input, List, Skeleton, Space, Switch, Typography } from 'antd';
import { v4 as uuidv4 } from 'uuid';
import DragAndDropImage from '../../upload/DragAndDropImage';
import ImageUpload from '../../upload/ImageUpload';

export default function EditList({ value, onChange }) {
  const [listData, setListData] = useState([]);
  const [editingItem, setEditingItem] = useState({});
  const [isDisplayingAvatars, setIsDisplayingAvatars] = useState(Boolean(value.isDisplayingAvatars));
  const [isDisplayingContent, setIsDisplayingContent] = useState(Boolean(value.isDisplayingContent));
  const [isDisplayingTitle, setIsDisplayingTitle] = useState(Boolean(value.isDisplayingTitle));

  useEffect(() => {
    let arr = [];
    for (let item of value.listData) {
      arr.push(item);
    }
    setListData(arr);
  }, []);


  const onChangeList = (newData) => {
    onChange({ ...value,
      listData: newData,
      isDisplayingAvatars: isDisplayingAvatars,
      isDisplayingTitle: isDisplayingTitle,
      isDisplayingContent: isDisplayingContent
    });
  };

  useEffect(() => {
    onChangeList(listData);
  }, [listData, isDisplayingAvatars, isDisplayingTitle, isDisplayingContent]);

  const onChangeSwitchAvatar = (val) => {
    setIsDisplayingAvatars(val);
  };

  const onChangeSwitchTitle = (val) => {
    setIsDisplayingTitle(val);
  };

  const onChangeSwitchContent = (val) => {
    setIsDisplayingContent(val);
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

  const addToListData = (itemToBeAdded = undefined) => {
    if (itemToBeAdded === undefined) {
      itemToBeAdded = editingItem;
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
  };

  const editButtonClicked = (item) => {
    if (item.id !== editingItem.id || JSON.stringify(editingItem) === '{}') {
      setEditingItem(item);
    } else {
      addToListData();
    }
  };

  const onAvatarAdded = (item, photo) => {
    if( JSON.stringify(editingItem) !== '{}'){
      item = editingItem
    }
    const newItem = JSON.parse(JSON.stringify(item));
    newItem.avatar = photo;
    addToListData(newItem);
  };

  const onDeleteItem = itemToBeDeleted => {
    setListData((prevState) => {
      const arr = [];
      for (let item of prevState) {
        if (item.id !== itemToBeDeleted.id) {
          arr.push(item);
        }
      }
      return arr;
    });
  };

  return (
    <Space
      direction={'vertical'}
      size={18}
    >
      <Space direction={'horizontal'}>
        <Switch
          defaultChecked={isDisplayingAvatars}
          onChange={onChangeSwitchAvatar}
          checkedChildren={'Displaying Avatars'}
          unCheckedChildren={'Not Displaying Avatars'}
        />
        <Switch
          defaultChecked={isDisplayingTitle}
          onChange={onChangeSwitchTitle}
          checkedChildren={'Displaying Title'}
          unCheckedChildren={'Not Displaying Title'}
        />
        <Switch
          defaultChecked={isDisplayingContent}
          onChange={onChangeSwitchContent}
          checkedChildren={'Displaying Content'}
          unCheckedChildren={'Not Displaying Content'}
        />
      </Space>
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
                  <Typography> Edit </Typography>
                  :
                  <Typography> Save </Typography>}
              </Button>,
              <Button
                onClick={() => setEditingItem({})}
                hidden={item.id !== editingItem.id || JSON.stringify(editingItem) === '{}'}>Cancel</Button>,
              <div style={{
                display: isDisplayingAvatars ? 'block' : 'none',
                minWidth:'15rem'
              }}>
                <ImageUpload onAdd={(imageUrl, originalFilename, newFilename) => onAvatarAdded(item, {
                  imageUrl,
                  originalFilename,
                  newFilename,
                })}
                             defaultFilelist={[item.avatar]}
                             multiple={false} />
              </div>,
              <Button
                onClick={() => onDeleteItem(item)}
              >
                Delete item
              </Button>
            ]}
          >
            <Skeleton avatar title={false} loading={item.loading} active>
              <List.Item.Meta
                avatar={
                  <div style={{
                    display: isDisplayingAvatars ? 'block' : 'none',
                  }}>
                    <Avatar src={item.avatar.imageUrl} /></div>}
                title={isDisplayingTitle ? item.title : null}
                description={isDisplayingContent? item.text : null}
              />
              {item.id !== editingItem.id ?
                <></>
                :
                <Space
                  size={'large'}
                >
                  <div
                    style={{
                      display: isDisplayingTitle ? 'block' : 'none',
                    }}>

                    <Input
                      style={{ minWidth: '15rem' }}
                      placeholder='Title of the List Item'
                      addonBefore={'Title: '}
                      value={editingItem?.title}
                      onChange={(value) => setEditingItem((prevState) => {
                        return { ...prevState, title: value.target.value };
                      })}
                    />
                  </div>
                  <div
                    style={{
                      display: isDisplayingContent ? 'block' : 'none',
                    }}>

                    <Input
                      style={{ minWidth: '15rem' }}
                      placeholder='Content of the List Item'
                      addonBefore={'Content: '}
                      value={editingItem?.text}
                      onChange={(value) => setEditingItem((prevState) => {
                        return { ...prevState, text: value.target.value };
                      })}
                    />
                  </div>
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

