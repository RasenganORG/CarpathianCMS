import { InboxOutlined, UploadOutlined } from '@ant-design/icons';
import { Button, message, Upload } from 'antd';
import { useEffect, useState } from 'react';
import React from 'react'
import Dragger from 'antd/es/upload/Dragger';
import { useSelector } from 'react-redux';
import classes from './DragAndDropImage.module.css'
const DragAndDropImage = ({onChangeImage,defaultSrc,filename}) => {
  const [fileList, setFileList] = useState([]);
  const [uploading, setUploading] = useState(false);
  const selectedPage = useSelector(state => state.pages.selectedPage);

  useEffect(() => {
    if(defaultSrc){
      console.log(defaultSrc)
      setFileList([{
        uid:1,
        status:'success',
        url:defaultSrc,
        name:filename,
        thumbUrl:defaultSrc,
      }])
    }
  },[])



  const handleUpload = () => {
    const formData = new FormData();
    fileList.forEach((file) => {
      formData.append('filename', file.file);
    });
    setUploading(true);
    // You can use any AJAX library you like
    fetch(`http://localhost:5000/pages/addImage/123/${selectedPage}`, {
      method: 'POST',
      body: formData,
    })
      .then((res) => res.json())
      .then((res) => {
        message.success('upload successfully.');

        setFileList([{
          uid:1,
          status:'success',
          url:res.imageUrl,
          name:res.originalFilename,
          thumbUrl:res.imageUrl,
        }])

        onChangeImage(res.imageUrl, res.originalFilename)

      })
      .catch(() => {
        message.error('upload failed.');
      })
      .finally(() => {
        setUploading(false);
      });
  };


  const props = {
    onRemove: (file) => {
      const index = fileList.indexOf(file);
      const newFileList = fileList.slice();
      newFileList.splice(index, 1);
      setFileList(newFileList);
    },
    beforeUpload: (file) => {
      console.log(file)
      setFileList([{
        uid:1,
        status:'done',
        file:file,
        name:file.name,
        thumbUrl:'',
      }]);
      return false;
    },
    fileList,
  };


  return (
    <>
      <Dragger
        {...props}
        defaultFileList={[...fileList]}
        listType="picture"
        className={classes.uploadListInline}
      >
        <p>Click or drop images</p>
      </Dragger>
      <Button
        type="primary"
        onClick={handleUpload}
        disabled={fileList.length === 0}
        loading={uploading}
        style={{
          marginTop: 16,
        }}
      >
        {uploading ? 'Uploading' : 'Start Upload'}
      </Button>
    </>
  );
};
export default DragAndDropImage;

