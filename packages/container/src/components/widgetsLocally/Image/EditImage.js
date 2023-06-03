import TextEditor from '../../editor/TextEditor';
import React, { useEffect, useState } from 'react';
import { Space, Switch } from 'antd';
import DragAndDropImage from '../../upload/DragAndDropImage';

export default function EditImage({ value, onChange }) {
  const [file, setFile] = useState([])

  const onChangeImage = (src, originalFilename,newFilename) => {
    onChange({ ...value, src: src, originalFilename:originalFilename, newFilename:newFilename });
  };

  const onChangeSwitch = (val) => {
    onChange({...value, enablePreview: val })
  }

  useEffect(() => {
    setFile([{
      src:value.src,
      originalFilename:value.originalFilename,
      newFilename:value.newFilename,
    }])
  },[value])


  return (
    <Space
      direction={'vertical'}
      size={18}
    >
      <DragAndDropImage
        onAdd={onChangeImage}
        defaultFilelist={file}
        multiple={false}
      />
      <Switch
        defaultChecked={value.enablePreview}
        onChange={onChangeSwitch}
        checkedChildren={'Preview Enabled'}
        unCheckedChildren={'Preview Disabled'}
      />
    </Space>

  );
}

