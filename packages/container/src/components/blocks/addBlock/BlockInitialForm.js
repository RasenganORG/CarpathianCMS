import { Button, Form, Input, Modal, Select, Switch } from 'antd';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { InfoCircleOutlined } from '@ant-design/icons';

const formItemLayout = {
  labelCol: {
    xs: { span: 24 },
    md: { span: 12, offset: 6 },
  },
  wrapperCol: {
    xs: { span: 24 },
    md: { span: 12, offset: 6},
  },
};
const formSwitchLayout = {
  labelCol: {
    xs: { span: 24 },
    md: { span: 24, offset:6},
  },
  wrapperCol: {
    xs: { span: 24 },
    md: { span: 2, offset:6},
  },
};



export default function BlockInitialForm (){
  const [createBlockButtonLoading, setCreateBlockButtonLoading] = useState(false);
  const [titleDisplayed, setTitleDisplayed] = useState(true);

  const [form] = Form.useForm();
  const dispatch = useDispatch();


  const onFinishForm = async () => {
    try {
      let data = await form.validateFields();
      console.log(data)
    } catch (error) {
      console.log(error);
    }

  };



  return (
      <Form
        form={form}
        {...formItemLayout}
        style={{
          width:'100%'
        }}
      >
        <Form.Item
          name='title'
          label={'Title'}
          labelAlign={'left'}
          tooltip={{
            icon:<InfoCircleOutlined />,
            title:'This is the title of the current block and can be displayed at the beginning of the block ',
            placement:'right'
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
            icon:<InfoCircleOutlined />,
            title:'Choose whether this title is going to be displayed or not',
            placement:'right'
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
            icon:<InfoCircleOutlined />,
            title:'This can be used to describe what is this block intended for or for other useful cases. Is not publicly visible',
            placement:'right'
          }}

        >
          <Input
            placeholder={'Enter the description of the block'}
            allowClear
            style={{
              width: '100%',
              height: '50px',
            }}
          ></Input>
        </Form.Item>

      </Form>

  )
    ;

};