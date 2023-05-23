import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Button, Col, Form, Input, Modal, Row, Select, Switch } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import slugify from '../../../utils/slugify';
import {  updatePage } from '../../../services/pages/PagesService';
import { pagesActions } from '../../../redux/pagesSlice';
import { InfoCircleOutlined } from '@ant-design/icons';
import { notificationActions } from '../../../redux/notificationSlice';

const formItemLayout = {
  labelCol: {
    xs: { span: 24 },
    md: { span: 24, offset: 6 },
  },
  wrapperCol: {
    xs: { span: 24 },
    md: { span: 12, offset: 6 },
  },
};
const formSwitchLayout = {
  labelCol: {
    xs: { span: 24 },
    md: { span: 6, offset: 6 },
  },
  wrapperCol: {
    xs: { span: 24 },
    md: { span: 12 },
  },
};

const EditPageMetadata = () => {
  const [updatePageButtonLoading, setUpdatePageButtonLoading] = useState(false);
  const [generateCustomHref, setGenerateCustomHref] = useState(false);

  const pages = useSelector(state => state.pages.pagesList);
  const selectedPage = useSelector(state => state.pages.selectedPage);
  const currentPage = useSelector(state => state.pages.pagesList.find((p) => p.id === selectedPage));
  const pageMetadata = currentPage.data.metadata;

  const pathname = useLocation().pathname.split('/')[1] ?? 'none';
  const [form] = Form.useForm();
  let title = Form.useWatch('title', form);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const hrefHelp = generateCustomHref ?
    <a href={'https://ahrefs.com/seo/glossary/url-slug'} target='_blank'>How to create a href?</a> : null;


  const onFinishForm = async () => {
    try {
      let data = await form.validateFields();
      console.log(data)

      data = {
        metadata: {
          ...data,
          visibility:currentPage.data.metadata.visibility,
          accessibleRoles:currentPage.data.metadata.accessibleRoles,
          specialPermissions:currentPage.data.metadata.specialPermissions
        },
        blocks: currentPage.data.blocks,
      };
      if (generateCustomHref === false || data.metadata.href === '') {
        data.metadata.href = slugify(data.metadata.title);
      }



      await updatePage({
        id: currentPage.id,
        data: data,
      }, currentPage.id);
      dispatch(pagesActions.refreshNavBar());
      dispatch(notificationActions.openNotification({
        message:'Page metadata updated successfully',
        description:'',
        type:'success'
      }))
      navigate(`/${data.metadata.href}/edit`);
      setUpdatePageButtonLoading(false);
    } catch (error) {
      dispatch(notificationActions.openNotification({
        message:'Error while updating page metadata',
        description:'',
        type:'error'
      }))
    }

  };

  const getPageByHref = (href) => {
    return pages.find((page) => page.data.metadata.href === href);
  };

  useEffect(() => {
    form.validateFields(['href']);
  }, [generateCustomHref, form]);

  useEffect(() => {
    if (title && !generateCustomHref && generateCustomHref!== undefined)
      form.setFieldValue('href', slugify(title));
  }, [title, generateCustomHref]);

  useEffect(() => {
    const page = getPageByHref(pathname);
    form.setFieldValue('parent', page?.id);
  }, [pathname, pages]);

  useEffect(() => {
    form.setFieldValue('title', pageMetadata?.title);
    form.setFieldValue('href', pageMetadata?.href);
    form.setFieldValue('parent', pageMetadata?.parent);
    form.setFieldValue('generateCustomHref', pageMetadata?.generateCustomHref ?? false);
    setGenerateCustomHref(pageMetadata?.generateCustomHref)
  }, [pageMetadata]);


  return (

    <Row>
      <Col offset={2} span={22}>
        <Form
          form={form}
          {...formItemLayout}
          style={{
            width: '80',
          }}
        >
          <Form.Item
            name='title'
            label={'Title'}
            labelAlign={'left'}
            tooltip={{
              icon: <InfoCircleOutlined />,
              title: 'This is the title that is going to be publicly visible',
              placement: 'right',
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
              icon: <InfoCircleOutlined />,
              title: 'Choose whether you want us to generate a href based on your title or if you want to customize it',
              placement: 'right',
            }}
          >
            <Switch
              checkedChildren='custom'
              unCheckedChildren='auto'
              onChange={(val) => {
                setGenerateCustomHref(val);
              }}
              checked={generateCustomHref}
            />
          </Form.Item>

          <Form.Item
            name='href'
            labelAlign={'left'}
            label={'Href'}
            hasFeedback

            tooltip={{
              icon: <InfoCircleOutlined />,
              title: 'This is the route associated with this page that will pe ' +
                'displayed in the browser searchbar and in links. It has to respect a certain format ',
              placement: 'right',
            }}
            extra={hrefHelp}
            rules={[
              {
                required: generateCustomHref,
                message: 'Please input a valid custom href',
                pattern: '^[a-z0-9]+(?:-[a-z0-9]+)*$',
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
              icon: <InfoCircleOutlined />,
              title: 'Choose if you want this page to be a subpage of a certain page. If not, choose none',
              placement: 'right',
            }}
          >
            <Select
              style={{
                width: '100%',
                height: '50px',
              }}
            >
              <Select.Option value={'none'} key={'none'}>None</Select.Option>
              {
                pages.map((page) => {
                  return <Select.Option value={page.id}
                                        key={page.data.metadata.href}>{page.data.metadata.title}</Select.Option>;
                })
              }
            </Select>
          </Form.Item>

          <Form.Item>
            <Button
              block
              type={'primary'}
              htmlType={'submit'}
              onClick={onFinishForm}
              size={'large'}
              loading={updatePageButtonLoading}
              disabled={updatePageButtonLoading}
            >
              Save changes
            </Button>
          </Form.Item>
        </Form>
      </Col>
    </Row>

  )
    ;

};

export default EditPageMetadata;
