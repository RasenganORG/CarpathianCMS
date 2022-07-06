import { InfoCircleOutlined } from '@ant-design/icons';
import { Alert, Button, Col, Form, Input, Modal, Radio, Row } from 'antd';
import React, { useState } from 'react';

// let formIngo = [{
//   key:1,
//   label:`field${}`,
// }]

const FormsDemo = () => {
  const [form] = Form.useForm();
  const [requiredMark, setRequiredMarkType] = useState(false);
  const [requiredMark2, setRequiredMarkType2] = useState(false);

  const onRequiredTypeChange = (req) => {
    let answ = req.requiredMarkField1 !== undefined ? setRequiredMarkType(req.requiredMarkField1) : setRequiredMarkType2(req.requiredMarkField2);
    console.log(req.requiredMarkField1);
  };

  const onFormFinish = (data) => {
    console.log(data)
  };

  return (
    <div>
      <Form
        form={form}
        layout='vertical'
        onValuesChange={onRequiredTypeChange}
        onFinish={onFormFinish}
      >
        <Row>
          <Col span={12}>
            <Form.Item
              label='Field 1'
              tooltip='You will be able to customize this too'
              name={'field1'}
              required={requiredMark}
            >
              <Input
                required={requiredMark}
                placeholder='Name of the field' />
            </Form.Item>
          </Col>
          <Col span={8} offset={4}>
            <Form.Item label='Required' name='requiredMarkField1'>
              <Radio.Group>
                <Radio.Button value={false}>Optional</Radio.Button>
                <Radio.Button value={true}>Required</Radio.Button>
              </Radio.Group>
            </Form.Item>
          </Col>
        </Row>

        <Row>
          <Col span={12}>
            <Form.Item
              label='Field 2'
              tooltip='You will be able to customize this too'
              name={'field2'}
              required={requiredMark2}
            >
              <Input
                required={requiredMark2}
                placeholder='Name of the field' />
            </Form.Item>
          </Col>
          <Col span={8} offset={4}>
            <Form.Item label='Required' name='requiredMarkField2'>
              <Radio.Group>
                <Radio.Button value={false}>Optional</Radio.Button>
                <Radio.Button value={true}>Required</Radio.Button>
              </Radio.Group>
            </Form.Item>
          </Col>
        </Row>

        <Form.Item>
          <Button type='primary'>Add a new field</Button>
        </Form.Item>
        <Form.Item>
          <Button htmlType={'submit'} type='primary'>Submit</Button>
        </Form.Item>
      </Form>
      {<Alert message='Success Text' type='success' />}
    </div>
  );
};

export default FormsDemo;