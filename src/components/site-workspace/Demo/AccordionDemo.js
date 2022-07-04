import { Button, Collapse } from 'antd';
import React from 'react';
import { EditTwoTone } from '@ant-design/icons';

const { Panel } = Collapse;
const text = `Demo content`;

const App = () => {
  const onChange = (key) => {
    console.log(key);
  };

  return (
    <div>
      <Collapse defaultActiveKey={['1']} onChange={onChange}>
        <Panel header='This is panel header 1' key='1' extra={<EditTwoTone />}>
          <p>{text}</p>
        </Panel>
        <Panel header='This is panel header 2' key='2' extra={<EditTwoTone />}>
          <p>{text}</p>
        </Panel>
        <Panel header='This is panel header 3' key='3' extra={<EditTwoTone />}>
          <p>{text}</p>
        </Panel>
      </Collapse>
      <Button style={{
        marginTop:20,
      }}>
        Add a Panel
      </Button>
    </div>
  );
};

export default App;