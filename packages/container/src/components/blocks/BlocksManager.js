import React, { useEffect, useState } from 'react';
import { Button, Col, Modal, Row } from 'antd';
import { useForm } from 'antd/es/form/Form';
import BlockManagerForm from './blockManagerForm/BlockManagerForm';
import WizardAddBlock from './addBlock/wizardAddBlock/WizardAddBlock';
import { useSelector } from 'react-redux';

const setFieldValues = (blocks) => {
  let fields = [];
  blocks?.map(block => fields.push({
    name: block.id,
    value: block
  }));
  return fields
};

const BlocksManager = () => {
  const [wizardVisible, setWizardVisible] = useState(false);
  const selectedPage = useSelector(state => state.pages.selectedPage);
  const blocks = useSelector(state => state.pages.pagesList.find(page => page.id === selectedPage)?.data?.blocks);
  const [fields, setFields] = useState([]);

  const [form] = useForm();

  const onFinish = data => {
    console.log("Block Manager form", data);

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

  useEffect(() => {
    if(blocks) {
      setFields(setFieldValues(blocks));
    }
  },[blocks])


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