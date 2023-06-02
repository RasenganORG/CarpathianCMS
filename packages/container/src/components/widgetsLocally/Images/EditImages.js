import TextEditor from '../../editor/TextEditor';
import React, { useEffect, useState } from 'react';
import { Space, Switch } from 'antd';
import DragAndDropImage from '../../upload/DragAndDropImage';

export default function EditImages({ value, onChange }) {
  const [defaultFilelist, setDefaultFilelist] = useState([])

  const onChangeImage = (list) => {
    let newListImages = [];
    for (let file of value.listImages) {
      newListImages.push(file);
    }

    for(let img of list) {
      const newImg = { src: img.src, originalFilename: img.originalFilename, newFilename: img.newFilename };
      newListImages.push(newImg);
      console.log('newObj', { ...value, listImages: newListImages });
    }

    onChange({ ...value, listImages: newListImages });
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
        onChangeImage={onChangeImage}
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

