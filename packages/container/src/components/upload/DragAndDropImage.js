import { InboxOutlined, UploadOutlined } from '@ant-design/icons';
import { Button, message, Modal, Typography, Upload } from 'antd';
import { useEffect, useState } from 'react';
import React from 'react';
import Dragger from 'antd/es/upload/Dragger';
import { useSelector } from 'react-redux';
import { deleteImage } from '../../services/pages/PagesService';

const DragAndDropImage = ({
                            onAdd,
                            onRemove,
                            defaultFilelist,
                            multiple,
                          }) => {
  const [fileList, setFileList] = useState([]);
  const [uploading, setUploading] = useState(false);
  const selectedPage = useSelector(state => state.pages.selectedPage);
  const [modalDisplayed, setModalDisplayed] = useState(false);
  const [imageToBeDeleted, setImageToBeDeleted] = useState({});




  useEffect(() => {
    if (defaultFilelist.length > 0) {
      if (multiple === false) {
        if (defaultFilelist[0].src) {
          setFileList([{
            uid: defaultFilelist[0].newFilename,
            status: 'success',
            url: defaultFilelist[0].src,
            name: defaultFilelist[0].originalFilename,
            newFilename: defaultFilelist[0].newFilename,
            thumbUrl: defaultFilelist[0].src,
          }]);
        }
      } else {
        const arr = [];
        for (let img of defaultFilelist) {
          arr.push({
              uid: img.newFilename,
              status: 'success',
              url: img.src,
              name: img.originalFilename,
              newFilename: img.newFilename,
              thumbUrl: img.src,
            },
          );
        }
        setFileList(arr);
      }
    }
  }, [defaultFilelist]);


  const handleUpload = async (formData) => {
    // You can use any AJAX library you like
    const res = await fetch(`http://localhost:5000/pages/addImage/123/${selectedPage}`, {
      method: 'POST',
      body: formData,
    })
      .then((res) => res.json())
      .catch(() => {
        message.error('upload failed.');
      });

    message.success('upload successfully.');

    if (multiple === false) {
      setFileList([{
        uid: 1,
        status: 'success',
        url: res.imageUrl,
        name: res.originalFilename,
        newFilename: res.newFilename,
        thumbUrl: res.imageUrl,
      }]);

      onAdd(res.imageUrl, res.originalFilename, res.newFilename);
    } else {

      const newImg = {
        src: res.imageUrl,
        originalFilename: res.originalFilename,
        newFilename: res.newFilename,
      };
      return newImg;
    }

  };

  const deleteSelectedImage = async () => {
    if(imageToBeDeleted.thumbUrl.length > 0) {
      const res = await deleteImage(selectedPage, imageToBeDeleted.newFilename);
      if (res.type === 'success') {
        message.success('image deleted successfully.');
        removeFromBlock();
      } else {
        message.error('image deletion failed.');
        setImageToBeDeleted({});
      }
    }
    else{
      removeFromBlock();
    }
  };

  const removeFromBlock = () => {
    if (multiple === false) {
      onAdd('', '', '');
      setFileList([]);
    } else {

      setFileList((prevState) => {
        const newState = prevState.filter(img =>  img.status !== 'removed');
        return newState;
      });
      let filteredList = [];
      for (let img of fileList) {
        if (img.newFilename !== imageToBeDeleted.newFilename) {
          filteredList.push({
            src: img.url,
            originalFilename: img.name,
            newFilename: img.newFilename,
          });
        }
      }
      onRemove(filteredList);
    }
    setImageToBeDeleted({});
    setModalDisplayed(false);
  };


  const props = {
    onRemove: (file) => {
      const index = fileList.indexOf(file);

      setModalDisplayed(true);
      setImageToBeDeleted(fileList[index]);
    },
    beforeUpload: (file) => {
      if (multiple === false) {
        setFileList([{
          uid: file.uid,
          status: 'new',
          file: file,
          name: file.name,
          thumbUrl: '',
        }]);
      } else {
        setFileList((prevState) => {
            return [...prevState, {
              uid: file.uid,
              status: 'new',
              file: file,
              name: file.name,
              thumbUrl: '',
            }];
          },
        );
      }
      return false;
    },
    fileList,
  };

  const onStartUploadButtonClicked = async () => {
    if (multiple === true) {
      setUploading(true);
      const imagesForForm = [];
      let filteredList = [];
      for (let img of fileList) {
        if (img.status === 'success') {
          filteredList.push(img);
        }
      }

      for (const file of fileList) {
        if (file.status === 'new') {
          const formData = new FormData();
          formData.append('filename', file.file);
          const newImg = await handleUpload(formData);

          filteredList.push({
            uid: newImg.newFilename,
            status: 'success',
            url: newImg.src,
            name: newImg.originalFilename,
            newFilename: newImg.newFilename,
            thumbUrl: newImg.src,
          });
          imagesForForm.push(newImg);
        }
      }

      setFileList(filteredList);
      onAdd(filteredList);
      setUploading(false);
    } else {
      const formData = new FormData();
      fileList.forEach((file) => {
        formData.append('filename', file.file);
      });
      setUploading(true);
      await handleUpload(formData);
      setUploading(false);
    }
  };


  return (
    <>
      <Dragger
        {...props}
        defaultFileList={[...fileList]}
        listType='picture'
      >
        <p>Click or drop images</p>
      </Dragger>
      <Button
        type='primary'
        onClick={onStartUploadButtonClicked}
        disabled={fileList.length === 0}
        loading={uploading}
        style={{
          marginTop: 16,
        }}
      >
        {uploading ? 'Uploading' : 'Start Upload'}
      </Button>
      <Modal
        open={modalDisplayed}
        title={''}
        onCancel={() => {
          setModalDisplayed(false);
          setImageToBeDeleted({})
        }}
        cancelText={'Keep in Contents'}
        okText={''}
        footer={[
          <Button
            onClick={removeFromBlock}
            key={'keep'}
          >
            Keep in Contents
          </Button>,
          <Button
            key={'delete'}
            onClick={deleteSelectedImage}
            type={'primary'}
          >
            Permanently Delete
          </Button>
        ]}
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

