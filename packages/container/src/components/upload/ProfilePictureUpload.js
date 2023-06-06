import { Modal, Upload } from 'antd';
import ImgCrop from 'antd-img-crop';
import { useEffect, useState } from 'react';
import React from 'react';

const getBase64 = (file) =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });

const ProfilePictureUpload = ({onAdd, defaultFilelist, onRemoveImage}) => {
  const [fileList, setFileList] = useState([]);
  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState('');
  const [previewTitle, setPreviewTitle] = useState('');

  useEffect(() => {
    setFileList(defaultFilelist)
  }, [defaultFilelist])


  const onChange = ({ fileList: newFileList }) => {
    if(newFileList.length > 0) {
      console.log('newFileList', newFileList);
      onAdd(newFileList[0].originFileObj);
      setFileList(newFileList);
    }
  };

  const props = {
    onRemove: (file) => {
      if(file.status === 'success'){
        onRemoveImage(file)
      }
      setFileList([])
    },
    beforeUpload: (file) => {
      console.log("file", file)
      return false;
    },
    fileList,
  };
  const handleCancel = () => setPreviewOpen(false);

  const handlePreview = async (file) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj);
      console.log(file);
    }
    setPreviewImage(file.url || file.preview);
    setPreviewOpen(true);
    setPreviewTitle(file.name || file.url.substring(file.url.lastIndexOf('/') + 1));
  };


  return (
    <>
      <ImgCrop rotationSlider>
        <Upload
          {...props}
          listType='picture-card'
          fileList={fileList}
          onChange={onChange}
          multiple={false}
          onPreview={handlePreview}
          action=''
        >
          {fileList.length < 1 && '+ Upload'}
        </Upload>
      </ImgCrop>
      <Modal
        visible={previewOpen}
        title={previewTitle}
        footer={null}
        onCancel={handleCancel}>
        <img
          alt='example'
          style={{
            width: '100%',
          }}
          src={previewImage}
        />
      </Modal>
    </>


  );
};
export default ProfilePictureUpload;