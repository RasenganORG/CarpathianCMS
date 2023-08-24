import { Form, Input, Switch } from 'antd';
import { InfoCircleOutlined } from '@ant-design/icons';
import TextArea from 'antd/es/input/TextArea';
import TextEditor from '../../editor/TextEditor';
import React, { useState } from 'react';
import EditParagraph from '../../widgetsLocally/Paragraph/EditParagraph';
import EditImage from '../../widgetsLocally/Image/EditImage';
import EditList from '../../widgetsLocally/List/EditList';
import EditImages from '../../widgetsLocally/Images/EditImages';

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

export default function EditBlockForm({ block, blockForm, onFinishForm }) {
  const [titleDisplayed, setTitleDisplayed] = useState(true);


  return (
    <div>
      <Form
        form={blockForm}
        {...formItemLayout}
        onFinish={(data) => {
          onFinishForm(data);
        }}
        style={{
          width: '100%',
        }}
        initialValues={{
          titleDisplayed: false,
          title: '',
          description: '',
          data: '',
        }}
      >
        <Form.Item
          name={'title'}
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
          valuePropName={'checked'}

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
          name={'description'}
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
            name={'data'}
            labelAlign={'left'}
            label={'Data'}
            hasFeedback
            tooltip={{
              icon: <InfoCircleOutlined />,
              title: 'This is the data of the paragraph',
              placement: 'right',
            }}
          >
            <div>
              {block.metadata.type === 'paragraph' &&
                <EditParagraph
                  value={blockForm.getFieldValue('data')}
                  onChange={(data) => blockForm.setFieldValue('data', data)}
                />}
              {block.metadata.type === 'image' &&
                <EditImage
                  value={blockForm.getFieldValue('data')}
                  onChange={(data) => blockForm.setFieldValue('data', data)}
                />}
              {block.metadata.type === 'list' &&
                <EditList
                  value={blockForm.getFieldValue('data')}
                  onChange={(data) => {
                    blockForm.setFieldValue('data', data);
                  }}
                />}
              {block.metadata.type === 'images' &&
                <EditImages
                  blockForm={blockForm}
                  value={blockForm.getFieldValue('data')}
                  onChange={(data) =>blockForm.setFieldValue('data', data)}
                />}
            </div>
          </Form.Item>

      </Form>

    </div>
  );
};