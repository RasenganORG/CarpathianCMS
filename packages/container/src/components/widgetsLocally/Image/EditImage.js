import TextEditor from '../../editor/TextEditor';
import React from 'react';
import { Space, Switch } from 'antd';
import DragAndDropImage from '../../upload/DragAndDropImage';

export default function EditImage({ value, onChange }) {
  const src = value.src;

  const onChangeImage = (src, originalFilename,newFilename) => {
    onChange({ ...value, src: src, originalFilename:originalFilename, newFilename:newFilename });
  };

  const onChangeSwitch = (val) => {
    onChange({...value, enablePreview: val })
  }

  return (
    <Space
      direction={'vertical'}
      size={18}
    >
      <DragAndDropImage
        onChangeImage={onChangeImage}
        defaultSrc={src}
        originalFilename={value.originalFilename}
        newFilename={value.newFilename}/>
      <Switch
        defaultChecked={value.enablePreview}
        onChange={onChangeSwitch}
        checkedChildren={'Preview Enabled'}
        unCheckedChildren={'Preview Disabled'}
      />
    </Space>

  );
}

