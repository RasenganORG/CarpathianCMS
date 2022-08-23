import {  Form, Input, Switch } from 'antd';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { InfoCircleOutlined } from '@ant-design/icons';
import TextArea from 'antd/es/input/TextArea';
import { pagesActions } from '../../../redux/pagesSlice';
import PropTypes from 'prop-types';

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

BlockInitialForm.propTypes = {
  form: PropTypes.any,
}

export default function BlockInitialForm({ form }) {
  const [titleDisplayed, setTitleDisplayed] = useState(true);
  const selectedPage = useSelector(state => state.pages.selectedPage);
  const numberOfBlocks =  useSelector(state => state.pages.pagesList.find(page => page.id === selectedPage)?.data?.blocks.length)

  const dispatch = useDispatch();


  const onFinishForm = async (data) => {
    try {
      let block = {};
      block.metadata = data;
      block.metadata.pageId = selectedPage;
      block.metadata.type = form.getFieldValue('type');
      block.metadata.place = numberOfBlocks + 1
      block.id = form.getFieldValue('id');
      block.data = ''
      dispatch(pagesActions.addBlockToPage({
        block: block,
        pageId: selectedPage,
      }));
    } catch (error) {
      console.log(error);
    }

  };


  return (
    <Form
      form={form}
      {...formItemLayout}
      onFinish={onFinishForm}
      style={{
        width: '100%',
      }}
      initialValues={{
        titleDisplayed: false,
        description:'',
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

    </Form>

  )
    ;

};

