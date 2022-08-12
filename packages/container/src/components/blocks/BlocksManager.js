import React, { useState } from 'react';
import { Button, Col, Modal, Row } from 'antd';
import { useForm } from 'antd/es/form/Form';
import BlockManagerForm from './blockManagerForm/BlockManagerForm';
import WizardAddBlock from './addBlock/WizardAddBlock/WizardAddBlock';


const BlocksManager = () => {
  const [wizardVisible, setWizardVisible] = useState(false);
  const [fields, setFields] = useState([
    {
      name: ['username'],
      value: 'Ant Design',
    },
  ]);

  const [form] = useForm();

  const onFinish = data => {
    console.log(data);
  };

  const onChange = newFields => {
    setFields(newFields);
  };

  const onAddBlock = (type, id) => {
    console.log(type);
  };


  const showDrawer = () => {
    setWizardVisible(true);
  };

  const onClose = () => {
    setWizardVisible(false);
  };


  return (
    <div>
      <Row>
        <Col offset={3} span={20}>
          <BlockManagerForm
            onChange={onChange}
            onFinish={onFinish}
            form={form}
            fields={fields}
          >

          </BlockManagerForm>
        </Col>
        <Col offset={3} span={16}>
          {
            !wizardVisible &&
            <Button type='primary' onClick={showDrawer}>
              Add more widgets on your page
            </Button>
          }

          {wizardVisible &&
            <WizardAddBlock
              onAddBlock={onAddBlock}
              setWizardVisible={setWizardVisible}
            />
          }

        </Col>
      </Row>


    </div>
  );
};
export default BlocksManager;