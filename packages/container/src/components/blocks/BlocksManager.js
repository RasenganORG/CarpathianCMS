import React, { useEffect, useState } from 'react';
import { Button, Col, Modal, Row } from 'antd';
import { useForm } from 'antd/es/form/Form';
import BlockManagerForm from './blockManagerForm/BlockManagerForm';
import WizardAddBlock from './addBlock/wizardAddBlock/WizardAddBlock';
import { useDispatch, useSelector } from 'react-redux';
import { pagesActions } from '../../redux/pagesSlice';
import EditBlock from './edit/EditBlock';

const setFieldValuesFromBlocks = (blocks) => {
  let fields = [];
  blocks?.map(block => fields.push({
    name: [block.id],
    value: block
  }));
  return fields
};

const setFieldValuesFromFieldsValues = (fieldsValues) => {
  let fields = [];
  for(let fieldValue of Object.entries(fieldsValues)){
    fields.push({
      name: [fieldValue[0]],
      value: fieldValue[1]
    })
  }
  return fields
};


const BlocksManager = () => {
  const [wizardVisible, setWizardVisible] = useState(false);
  const selectedPage = useSelector(state => state.pages.selectedPage);
  const blocks = useSelector(state => state.pages.pagesList.find(page => page.id === selectedPage)?.data?.blocks);
  const [fields, setFields] = useState([]);
  const [editBlockModalVisible, setEditBlockModalVisible] = useState(false)
  const [selectedBlock, setSelectedBlock] = useState()
  const [formIsUpdated, setFormIsUpdated] = useState(0)

  const [form] = useForm();
  const dispatch = useDispatch()

  const onFinish = data => {
    let newBlockArray = []
    for(let block of Object.entries(data)){
      newBlockArray.push(block[1])
    }

    dispatch(pagesActions.setBlocks(newBlockArray))
    //call api for upload of data
  };

  const onChange = newFields => {
    setFields(newFields);
  };

  const showDrawer = () => {
    setWizardVisible(true);
  };

  const startEditBlock = (blockId) => {
    setEditBlockModalVisible(true)
    setSelectedBlock(blockId)
  }

  const onEditBlockFinished = (blockId, blockData) => {
    form.setFieldValue(blockId, blockData)
    setFormIsUpdated( prevState => prevState+1)
  }

  useEffect(() => {
    if(blocks) {
      setFields(setFieldValuesFromBlocks(blocks));
    }
  },[blocks])

  useEffect(() => {
    const formFields = form.getFieldsValue()
    setFields(setFieldValuesFromFieldsValues(formFields))
  },[formIsUpdated])


  return (
    <div>
      <EditBlock
        blockId={selectedBlock}
        editBlockModalVisible={editBlockModalVisible}
        setEditBlockModalVisible={setEditBlockModalVisible}
        onEditFinished={onEditBlockFinished}
      />
      <Row>
        <Col offset={3} span={20}>
          <BlockManagerForm
            onChange={onChange}
            onFinish={onFinish}
            form={form}
            fields={fields}
            startEditBlock={startEditBlock}
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
              setWizardVisible={setWizardVisible}
            />
          }

        </Col>
      </Row>


    </div>
  );
};
export default BlocksManager;