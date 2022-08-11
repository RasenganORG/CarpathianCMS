import React from 'react';
import { Button, Col, Form, Input, Row, Space } from 'antd';
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';
import AddBlock from './AddBlock';


const BlocksManager = () => {

  const onFinish = (values) => {
    console.log('Received values of form:', values);
  };

  return (
    <Row>
      <Col offset={3} span={20}>
        <Form name='dynamic_form_nest_item' onFinish={onFinish} autoComplete='off'>
          <Form.List name='users'>
            {(fields, { add, remove }) => (
              <>
                {fields.map(({ key, name, ...restField }) => (
                  <Space
                    key={key}
                    style={{
                      display: 'flex',
                      marginBottom: 8,
                    }}
                    align='baseline'
                  >
                    <Form.Item
                      {...restField}
                      name={[name, 'first']}
                      rules={[
                        {
                          required: true,
                          message: 'Missing first name',
                        },
                      ]}

                    >
                      <Input
                        placeholder='First Name'
                      />
                    </Form.Item>
                    <MinusCircleOutlined onClick={() => remove(name)} />
                  </Space>
                ))}
                <Form.Item>
                  <AddBlock onClick={() => add()}/>
                </Form.Item>
              </>
            )}
          </Form.List>
          <Form.Item>
            <Button type='primary' htmlType='submit'>
              Submit
            </Button>
          </Form.Item>
        </Form>
      </Col>
    </Row>
  );
};
export default BlocksManager