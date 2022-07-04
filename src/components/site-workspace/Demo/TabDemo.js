import { Button, Input, Tabs } from 'antd';
import React from 'react';
import { EditTwoTone } from '@ant-design/icons';
import TextArea from 'antd/es/input/TextArea';
import { Typography } from 'antd';

const { TabPane } = Tabs;

const onChange = (key) => {
  console.log(key);
};

const TabDemo = () => (
  <div>
    <Button style={{
      marginBottom: 40,
    }}>
      Add a Tab
    </Button>
    <Tabs defaultActiveKey='1' onChange={onChange}>
      <TabPane tab='Tab 1' key='1' extra={<EditTwoTone />}>
        <TabPaneEdit />
      </TabPane>
      <TabPane tab='Tab 2' key='2' extra={<EditTwoTone />}>
        <TabPaneEdit/>
      </TabPane>
      <TabPane tab='Tab 3' key='3' extra={<EditTwoTone />}>
        <TabPaneEdit/>
      </TabPane>
    </Tabs>

  </div>
);

export default TabDemo;

const TabPaneEdit = () => {
  return (
    <div>
      <Typography.Title level={4}>
        Title
      </Typography.Title>
      <Input placeholder={'Enter a title for the tab'}/>

      <Typography.Title level={4} style={{
        marginTop:20,
      }}>
        Content
      </Typography.Title>
      <TextArea rows={4}/>
    </div>
  )
}