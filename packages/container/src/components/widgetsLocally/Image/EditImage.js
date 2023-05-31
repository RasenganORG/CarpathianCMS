import TextEditor from '../../editor/TextEditor';
import React from 'react';
import { Space, Switch } from 'antd';
import DragAndDropImage from '../../upload/DragAndDropImage';

export default function EditImage({ value, onChange }) {
  const src = value.src;

  const onChangeImage = (src, filename) => {
    onChange({ ...value, src: src, filename:filename });
  };

  const onChangeSwitch = (val) => {
    onChange({...value, enablePreview: val })
  }

  return (
    <Space
      direction={'vertical'}
      size={18}
    >
      <DragAndDropImage onChangeImage={onChangeImage} defaultSrc={src} filename={value.filename}/>
      <Switch
        defaultChecked={value.enablePreview}
        onChange={onChangeSwitch}
        checkedChildren={'Preview Enabled'}
        unCheckedChildren={'Preview Disabled'}
      />
    </Space>

  );
}

