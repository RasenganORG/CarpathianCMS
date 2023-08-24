import TextEditor from '../../editor/TextEditor';
import React from 'react';
import { Space, Switch } from 'antd';

export default function EditParagraph({ value, onChange }) {
  const text = value.text;

  const onChangeEditor = (text) => {
    onChange({ ...value, text: text });
  };

  const onChangeSwitch = (val) => {
    onChange({...value, borderIsVisible: val })
  }

  return (
    <Space
      direction={'vertical'}
      size={18}
    >
      <Switch
        defaultChecked={value.borderIsVisible}
        onChange={onChangeSwitch}
        checkedChildren={'Border Displayed'}
        unCheckedChildren={'Border Hidden'}
      />
      <TextEditor
        placeholder={'Enter the content'}
        height={'200px'}
        value={text}
        onChange={onChangeEditor}
      />
    </Space>

  );
}

