import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import * as Yup from 'yup';
import {
  Button,
  Checkbox,
  Col,
  ConfigProvider,
  Form,
  Input,
  Modal,
  Row,
  Select,
  Switch,
  Tooltip,
  Typography,
} from 'antd';
import { InfoCircleOutlined, InfoCircleTwoTone } from '@ant-design/icons';
import { Option } from 'antd/es/mentions';
import FormItem from 'antd/es/form/FormItem';
import { pagesActions } from '../../redux/pagesSlice';
import { addNewPage } from '../../services/pages/PagesService';
import slugify from '../../utils/slugify';

const formItemLayout = {
  labelCol: {
    xs: { span: 24 },
    md: { span: 24, offset: 6 },
  },
  wrapperCol: {
    xs: { span: 24 },
    md: { span: 12, offset: 6},
  },
};
const formSwitchLayout = {
  labelCol: {
    xs: { span: 24 },
    md: { span: 6, offset: 6 },
  },
  wrapperCol: {
    xs: { span: 24 },
    md: { span: 12},
  },
};


const AddNewPageForm = ({ setNewPageModalIsOpened, newPageModalIsOpened }) => {
  const [parentOfValue, setParentOfValue] = useState('none');
  const [createPageButtonLoading, setCreatePageButtonLoading] = useState(false);
  const [generateCustomHref, setGenerateCustomHref] = useState(false);

  const [form] = Form.useForm();
  let title = Form.useWatch('title',form)

  const dispatch = useDispatch();
  const pages = useSelector(state => state.pages.pagesList);

  const hrefHelp = generateCustomHref ? <a href={'https://ahrefs.com/seo/glossary/url-slug'} target="_blank">How to create a href?</a> : null


  const onFinishForm = async () => {
    try {
      let data = await form.validateFields();

      setCreatePageButtonLoading(true);
      data.parent = parentOfValue;
      data = {
        metadata: data,
      };
      if (generateCustomHref === false || data.metadata.href === '') {
        data.metadata.href = slugify(data.metadata.title);
      }
      console.log(data);

      const res = await addNewPage(data);
      dispatch(pagesActions.createNewPage(res));
      setCreatePageButtonLoading(false);
      setNewPageModalIsOpened(false);
    } catch (error) {
      console.log(error);
    }

  };

  useEffect(() => {
    form.validateFields(['href']);
  }, [generateCustomHref, form]);

  useEffect(() => {
    if(title && !generateCustomHref)
      form.setFieldValue('href', slugify(title))
  }, [title, generateCustomHref])


  return (
    <Modal
      visible={newPageModalIsOpened}
      onCancel={() => setNewPageModalIsOpened(false)}
      width={700}
      maskClosable={false}
      footer={[
        <Button key='back' onClick={() => setNewPageModalIsOpened(false)}>
          Cancel
        </Button>,
      ]}
    >
      <Form form={form} {...formItemLayout}
      >
        <Form.Item
          name='title'
          label={'Title'}
          labelAlign={'left'}
          tooltip={{
            icon:<InfoCircleOutlined />,
            title:'This is the title that is going to be publicly visible',
            placement:'right'
          }}
          rules={[
            {
              required: true,
              message: 'Please input the title of your page',
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
          name={'generateCustomHref'}
          label={'Create a custom href'}
          labelAlign={'left'}
          {...formSwitchLayout}
          tooltip={{
            icon:<InfoCircleOutlined />,
            title:'Choose whether you want us to generate a href based on your title or if you want to customize it',
            placement:'right'
          }}
        >
          <Switch
            checkedChildren='custom'
            unCheckedChildren='auto'
            onChange={(val) => {
              setGenerateCustomHref(val);
            }}
          />
        </Form.Item>

        <Form.Item
          name='href'
          labelAlign={'left'}
          label={'Href'}
          hasFeedback

          tooltip={{
            icon:<InfoCircleOutlined />,
            title:'This is the route associated with this page that will pe ' +
              'displayed in the browser searchbar and in links. It has to respect a certain format ',
            placement:'right'
          }}
          extra={hrefHelp}
          rules={[
            {
              required: generateCustomHref,
              message: 'Please input a valid custom href',
              pattern:'^[a-z0-9]+(?:-[a-z0-9]+)*$',
            },
          ]}
        >
          <Input
            placeholder={'Enter the href of the page'}
            allowClear
            disabled={!generateCustomHref}
            style={{
              width: '100%',
              height: '50px',
            }}
          ></Input>
        </Form.Item>

        <Form.Item
          name={'parent'}
          labelAlign={'left'}
          label={'Parent'}
          tooltip={{
            icon:<InfoCircleOutlined />,
            title:'Choose if you want this page to be a subpage of a certain page. If not, choose none',
            placement:'right'
          }}
        >
          <Select
            style={{
              width: '100%',
              height: '50px',
            }}
            defaultValue={'none'}
            onChange={(value) => setParentOfValue(value)}
          >
            <Select.Option value={'none'} key={'none'}>None</Select.Option>
            {
              pages.map((page) => {
                return <Select.Option value={page.data.metadata.title}
                                      key={page.data.metadata.title}>{page.data.metadata.title}</Select.Option>;
              })
            }
          </Select>
        </Form.Item>

        <Form.Item>
          <Button
            block
            type={'primary'}
            htmlType={'submit'}
            style={{
              backgroundColor: 'aliceblue',
              color: 'black',
            }}
            onClick={onFinishForm}
            size={'large'}
            loading={createPageButtonLoading}
            disabled={createPageButtonLoading}
          >
            Create page
          </Button>
        </Form.Item>
      </Form>

    </Modal>

  )
    ;

};

export default AddNewPageForm;