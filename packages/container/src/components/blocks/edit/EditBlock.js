import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Form, Input, Modal, Switch } from 'antd';
import { InfoCircleOutlined } from '@ant-design/icons';
import TextArea from 'antd/es/input/TextArea';
import { useSelector } from 'react-redux';
import { useForm } from 'antd/es/form/Form';
import TextEditor from '../../editor/TextEditor';

EditBlock.requiredProps = {
  blockId: PropTypes.string,
  editBlockModalVisible: PropTypes.bool,
  setEditBlockModalVisible: PropTypes.func,
  onEditFinished: PropTypes.func,
};

const formItemLayout = {
  labelCol: {
    xs: { span: 24 },
    md: { span: 16, offset: 4 },
  },
  wrapperCol: {
    xs: { span: 24 },
    md: { span: 16, offset: 4 },
  },
};

const formSwitchLayout = {
  labelCol: {
    xs: { span: 24 },
    md: { span: 16, offset: 4 },
  },
  wrapperCol: {
    xs: { span: 24 },
    md: { span: 2, offset: 4 },
  },
};

export default function EditBlock({ blockId, editBlockModalVisible, setEditBlockModalVisible, onEditFinished }) {
  const [titleDisplayed, setTitleDisplayed] = useState(true);
  const selectedPage = useSelector(state => state.pages.selectedPage);
  const block = useSelector(state => state.pages.pagesList.find(page => page.id === selectedPage)?.data?.blocks.find(block => block.id === blockId));
  const [form] = useForm();


  useEffect(() => {
    if (block && editBlockModalVisible === true) {
      form.setFieldValue('title', block.metadata.title);
      form.setFieldValue('titleDisplayed', block.metadata.titleDisplayed);
      form.setFieldValue('description', block.metadata.description);
      form.setFieldValue('data', block.data);
    }
  }, [block, editBlockModalVisible]);

  const onFinishForm = (data) => {
    const formattedData = {
      data: data.data,
      id: blockId,
      metadata:{
        description: data.description,
        pageId:block.metadata.pageId,
        title: data.title,
        titleDisplayed: data.titleDisplayed,
        type: block.metadata.type
      }
    }
    onEditFinished(blockId, formattedData)
  };

  const onEditBlockFinish = () => {
    form.submit();
    setEditBlockModalVisible(false);
  };


  return (
    <Modal
      visible={editBlockModalVisible}
      title={'Edit block'}
      onOk={onEditBlockFinish}
      cancelText={'Back'}
      onCancel={() => setEditBlockModalVisible(false)}
      maskClosable={false}
      width={'70%'}
      destroyOnClose
      afterClose={() => form.resetFields()}
    >
      <Form
        form={form}
        {...formItemLayout}
        onFinish={onFinishForm}
        style={{
          width: '100%',
        }}
        initialValues={{
          titleDisplayed: false,
          title: '',
          description: '',
          content: '',
        }}
      >
        <Form.Item
          name='title'
          label={'Title'}
          labelAlign={'left'}
          tooltip={{
            icon: <InfoCircleOutlined />,
            title: 'This is the title of the current block and can be displayed at the beginning of the block ',
            placement: 'right',
          }}
          rules={[
            {
              required: true,
              message: 'Please input a valid title',
            },
          ]}
          hasFeedback
        >
          <Input
            placeholder={'Enter the title of the page'}
            allowClear
            style={{
              width: '100%',
              height: '50px',
            }}
          ></Input>
        </Form.Item>

        <Form.Item
          name={'titleDisplayed'}
          labelAlign={'left'}
          label={'Display title'}
          {...formSwitchLayout}
          tooltip={{
            icon: <InfoCircleOutlined />,
            title: 'Choose whether this title is going to be displayed or not',
            placement: 'right',
          }}
        >
          <Switch
            defaultChecked={block?.metadata.titleDisplayed}
            checkedChildren='displayed'
            unCheckedChildren='hidden'
            onChange={(val) => {
              setTitleDisplayed(val);
            }}
          />
        </Form.Item>

        <Form.Item
          name='description'
          labelAlign={'left'}
          label={'Description'}
          hasFeedback
          tooltip={{
            icon: <InfoCircleOutlined />,
            title: 'This can be used to describe what is this block intended for or for other useful cases. Is not publicly visible',
            placement: 'right',
          }}

        >
          <TextArea
            rows={5}
            placeholder={'Enter the description of the block'}
            allowClear
            style={{
              width: '100%',
              height: '90px',
            }}
          />
        </Form.Item>

        <Form.Item
          name='data'
          labelAlign={'left'}
          label={'Data'}
          hasFeedback
          tooltip={{
            icon: <InfoCircleOutlined />,
            title: 'This is the data of the paragraph',
            placement: 'right',
          }}

        >
          <TextEditor
            placeholder={'Enter the content'}
            height={'200px'}
          />
        </Form.Item>

      </Form>
    </Modal>

  );
}