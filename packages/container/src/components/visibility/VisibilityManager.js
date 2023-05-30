import { Form, Select, Typography } from 'antd';
import { InfoCircleOutlined } from '@ant-design/icons';
import ClipboardCopy from '../ClipboardCopy';
import React from 'react';
import { useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';


const visibilityOptions = [
  {
    value: 'public',
    label: 'Public',
  },
  {
    value: 'link-only',
    label: 'Link Only',
  },
  {
    value: 'specific-roles',
    label: 'Specific Roles',
  },
];

export default function VisibilityManager({visibilityFormItem,setVisibilityFormItem}) {
  const roles = useSelector(state => state.pages.roles)
  const location = useLocation()

  const selectedPage = useSelector(state => state.pages.selectedPage);
  const currentPage = useSelector(state => state.pages.pagesList.find((p) => p.id === selectedPage));

  const link = 'localhost:8080'+ location.pathname.slice(0,location.pathname.search('/edit'))
    + location.pathname.slice(location.pathname.search('/edit')+ 5)



  const visibilityChanged = (value) => {
    setVisibilityFormItem(value);
  };

  return(
    <>
      <Form.Item
        name={'visibility'}
        labelAlign={'left'}
        label={'Visibility'}
        tooltip={{
          icon: <InfoCircleOutlined />,
          title: 'Choose what type of visibility you want this page to have',
          placement: 'right',
        }}
        rules={[
          {
            required: true,
          },
        ]}
      >
        <Select
          onChange={visibilityChanged}
          style={{
            width: '100%',
            height: '50px',
          }}
        >
          {
            visibilityOptions.map((opt) => {
              return (
                <Select.Option
                  value={opt.value}
                  key={opt.value}>
                  {opt.label}
                </Select.Option>);
            })
          }
        </Select>
      </Form.Item>
      {currentPage.data.metadata.visibility === 'link-only' && visibilityFormItem === 'link-only' &&
        <ClipboardCopy copyText={link}/>
      }
      <Form.Item
        name={'accessibleRoles'}
        labelAlign={'left'}
        label={'Roles with access:'}
        hidden={visibilityFormItem !== 'specific-roles'}
        tooltip={{
          icon: <InfoCircleOutlined />,
          title: 'Choose what roles will be able to access this page.',
          placement: 'right',
        }}
        dependencies={['visibility']}
        rules={[
          {
            required: visibilityFormItem === 'specific-roles',
            message: 'Please choose at least one role that can access this page',
          },
        ]}
      >
        <Select
          mode='multiple'
          placeholder='Select the roles that can access this page'
          optionLabelProp='label'
          style={{
            width: '100%',
            height: '50px',
          }}
        >
          {roles.map(role => (
            <Select.Option
              value={role.value}
              label={role.label}
              key={role.value}
            >
              <Typography.Text>
                {role.label}
              </Typography.Text>
            </Select.Option>
          ))}

        </Select>
      </Form.Item>



    </>
  )
}

