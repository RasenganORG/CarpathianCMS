import { InboxOutlined, UploadOutlined } from '@ant-design/icons';
import { Button, message, Modal, Typography, Upload } from 'antd';
import { useEffect, useState } from 'react';
import React from 'react'
import Dragger from 'antd/es/upload/Dragger';
import { useSelector } from 'react-redux';
import classes from './DragAndDropImage.module.css'
import { deleteImage } from '../../services/pages/PagesService';
const DragAndDropImage = ({onChangeImage,defaultSrc,originalFilename,newFilename}) => {
  const [fileList, setFileList] = useState([]);
  const [uploading, setUploading] = useState(false);
  const selectedPage = useSelector(state => state.pages.selectedPage);
  const [modalDisplayed, setModalDisplayed] = useState(false);
  const [imageToBeDeleted, setImageToBeDeleted] = useState({});


  console.log("fileList", fileList)

  useEffect(() => {
    if(defaultSrc){
      console.log(defaultSrc)
      setFileList([{
        uid:1,
        status:'success',
        url:defaultSrc,
        name:originalFilename,
        newFilename:newFilename,
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
          newFilename:res.newFilename,
          thumbUrl:res.imageUrl,
        }])

        onChangeImage(res.imageUrl, res.originalFilename, res.newFilename)

      })
      .catch(() => {
        message.error('upload failed.');
      })
      .finally(() => {
        setUploading(false);
      });
  };

  const deleteSelectedImage = async () => {

    const res = await deleteImage(selectedPage, imageToBeDeleted.newFilename)
    if (res.type === 'success') {
      message.success('image deleted successfully.');
      removeFromBLock()
    } else {
      message.error('image deletion failed.');
      setImageToBeDeleted({})
    }
  }

  const removeFromBLock = () => {
    onChangeImage('', '', '')
    setImageToBeDeleted({})
    setFileList([])
    setModalDisplayed(false)
  }


  const props = {
    onRemove: (file) => {
      const index = fileList.indexOf(file);
      console.log("file to be deleted", fileList[index])

      setModalDisplayed(true)
      setImageToBeDeleted(fileList[index])
    },
    beforeUpload: (file) => {
      console.log("file to be uploaded", file)
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
      <Modal
        visible={modalDisplayed}
        title={''}
        onOk={() => deleteSelectedImage()}
        onCancel={() => removeFromBLock()}
        cancelText={'Keep in Contents'}
        okText={'Permanently Delete'}
      >
        <Typography.Title level={5}>
          Do you want to permanently remove this image or would you like to keep it in the contents folder.
          The image will be removed from this block.
        </Typography.Title>
      </Modal>
    </>
  );
};
export default DragAndDropImage;

