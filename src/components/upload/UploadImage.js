import { Upload } from 'antd';
import ImgCrop from 'antd-img-crop';
import { useState } from 'react';

const UploadImage = () => {
  const [file, setFile] = useState([]);

  const onChange = ({ fileList: newFileList }) => {
    setFile(newFileList);
  };

  const onPreview = async (file) => {
    let src = file.url;

    if (!src) {
      src = await new Promise((resolve) => {
        const reader = new FileReader();
        reader.readAsDataURL(file.originFileObj);

        reader.onload = () => resolve(reader.result);
      });
    }

    const image = new Image();
    image.src = src;
    const imgWindow = window.open(src);
    imgWindow?.document.write(image.outerHTML);
  };

  return (
    <ImgCrop rotate>
      <Upload
        listType="picture-card"
        fileList={file}
        onChange={onChange}
        onPreview={onPreview}
        maxCount={1}
      >
        {file.length === 0 && '+ Upload '}
        {file.length > 0 && '+ Change '}
      </Upload>
    </ImgCrop>
  );
};

export default UploadImage;