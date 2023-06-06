import TextEditor from '../../editor/TextEditor';
import React, { useEffect, useState } from 'react';
import { Form, Space, Switch } from 'antd';
import DragAndDropImage from '../../upload/DragAndDropImage';

export default function EditImages({ value, onChange, blockForm }) {
  const [defaultFilelist, setDefaultFilelist] = useState([])
  const values = blockForm.getFieldValue('data')

  const onAddImages = (list) => {
    let newListImages = [];
    // for (let file of value.listImages) {
    //   newListImages.push(file);
    // }


    for(let img of list) {
      const newImg = {
        src: img.url,
        originalFilename: img.name,
        newFilename: img.newFilename
      };
      newListImages.push(newImg);
    }

    onChange({ ...value, listImages: newListImages });
  };
  const onRemoveImages = (list) => {
    onChange({ ...value, listImages: list });
  };

  const onChangeSwitch = (val) => {
    onChange({...value, enablePreview: val })
  }

  useEffect(() => {
    setDefaultFilelist(value.listImages)
  },[value])

  return (
    <Space
      direction={'vertical'}
      size={18}
    >
      <DragAndDropImage
        onAdd={onAddImages}
        onRemove={onRemoveImages}
        defaultFilelist={defaultFilelist}
        multiple={true}
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

