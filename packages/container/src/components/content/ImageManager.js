import { Button, Image, message, Modal, Space, Switch, Table, Typography } from 'antd';
import React, { useEffect, useState } from 'react';
import { deleteImage, getImagesByPage } from '../../services/pages/PagesService';
import { useSelector } from 'react-redux';
import { formatDate } from '../../utils/date';
import { DeleteOutlined, DownloadOutlined } from '@ant-design/icons';
import LoadingScreen from '../loading/LoadingScreen';


export const ImageManager = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const selectedPage = useSelector(state => state.pages.selectedPage);
  const [modalDisplayed, setModalDisplayed] = useState(false);
  const [imageToBeDeleted, setImageToBeDeleted] = useState(undefined);


  const columns = [
    {
      title: 'Image',
      dataIndex: 'url',
      key: 'url',
      render: (item) => {
        return (
          <Image
            width={100}
            height={100}
            src={item}
            preview={true}
            fallback='data:image/png;base64,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'
          />);
      },
    },
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      width: '30%',
      sorter: {
        compare: (a, b) => {
          if (a.name.toLowerCase() < b.name.toLowerCase()) {
            return -1;
          }
          if (a.name.toLowerCase() > b.name.toLowerCase()) {
            return 1;
          }
          return 0;
        },
        multiple: 1,
      },
    },
    {
      title: 'Time Created',
      dataIndex: 'timeCreated',
      width: '10%',
      key: 'timeCreated', sorter: {
        compare: (a, b) => {
          a = new Date(a.timeCreated);
          b = new Date(b.timeCreated);
          if (a < b) {
            return -1;
          }
          if (a > b) {
            return 1;
          }
          return 0;
        },
        multiple: 1,
      },

    },
    {
      title: 'Type',
      dataIndex: 'contentType',
      width: '10%',
      key: 'contentType',
      sorter: {
        compare: (a, b) => {
          if (a.name.toLowerCase() < b.name.toLowerCase()) {
            return -1;
          }
          if (a.name.toLowerCase() > b.name.toLowerCase()) {
            return 1;
          }
          return 0;
        },
        multiple: 1,
      },
    },
    {
      title: 'Size',
      dataIndex: 'size',
      width: '10%',
      key: 'size',
      sorter: {
        compare: (a, b) => {
          a = Number(a.size.split(' ')[0]);
          b = Number(b.size.split(' ')[0]);
          return a - b;
        },
        multiple: 3,
      },
    },

    {
      title: 'Actions',
      dataIndex: 'action',
      width: '15%',
      key: 'action',
      render: (img) => {
        return (
          <Space
            direction='vertical'
            size='middle'
            style={{ display: 'flex', alignItems: 'center' }}>
            <Button
              icon={<DeleteOutlined />}
              onClick={() => {
                setModalDisplayed(true);
                setImageToBeDeleted(img.fullName);
                console.log(img);
              }}
            >
              Delete
            </Button>
            <a href={img.downloadUrl}>
              <Button
                type='primary'
                shape='round'
                icon={<DownloadOutlined />}
              >
                Download
              </Button>
            </a>
          </Space>
        );
      },
    },
  ];


  function bytesToMegabytes(bytes) {
    return String(Math.floor(bytes / 1048576 * 100) / 100) + ' MB';
  }

  // todo delete image url from used blocks
  const removeImageFromData = (imageToBeDeleted) => {
    let newData = [];
    for (let img of data) {
      if (img.action.fullName !== imageToBeDeleted) {
        newData.push(img);
      }
    }
    console.log(newData);
    setData(newData);
    setLoading(false);
  };

  const deleteSelectedImage = async () => {
    if (imageToBeDeleted) {
      setLoading(true);
      setModalDisplayed(false);
      const res = await deleteImage(selectedPage, imageToBeDeleted);
      if (res.type === 'success') {
        message.success('image deleted successfully.');
        removeImageFromData(imageToBeDeleted);
      } else {
        message.error('image deletion failed.');
      }
      setImageToBeDeleted(undefined);
    }
  };


  const loadData = async () => {
    if (selectedPage) {
      const res = await getImagesByPage(selectedPage);
      const dataTable = [];
      if (res.type === 'success') {
        message.success('images fetched successfully.');
        if (res.object.length > 0) {
          res.object.forEach(img => {
            const newFilename = String(img.name.split('/').slice(-1));
            const [, ...originalFilename] = newFilename.split('_');
            const obj = {
              ...img,
              name: originalFilename.join('_'),
              fullName: newFilename,
              timeCreated: formatDate(img.timeCreated),
              size: bytesToMegabytes(img.size),
              contentType: img.contentType ? img.contentType.split('/')[1] : String(originalFilename)?.split('.').slice(-1),
              url: img.url,
              key: img.url,
            };
            console.log(obj);
            dataTable.push({ ...obj, action: obj });
          });
        }
        setData(dataTable);
        setLoading(false);
      }
      if (res.type === 'error') {
        message.error('Error while fetching images.');
      }
    }
  };

  useEffect(() => {
    loadData();
  }, [selectedPage]);

  return (
    <>
      <Table
        columns={columns}
        dataSource={data}
        loading={loading}
      />
      <Modal
        visible={modalDisplayed}
        title={''}
        onOk={() => deleteSelectedImage()}
        onCancel={() => setModalDisplayed(false)}
        cancelText={'Cancel'}
        okText={'Permanently Delete'}
      >
        <Typography.Title level={5}>
          Do you want to permanently remove this image?
        </Typography.Title>
      </Modal>
    </>
  );
};

export default ImageManager;