import React, { useEffect, useState } from 'react';
import { Button,  Col, Row, Spin } from 'antd';
import { useForm } from 'antd/es/form/Form';
import BlockManagerForm from './BlockManagerForm';
import WizardAddBlock from './addBlock/wizardAddBlock/WizardAddBlock';
import { useDispatch, useSelector } from 'react-redux';
import { pagesActions } from '../../redux/pagesSlice';
import EditBlock from './editBlock/EditBlock';

const setFieldValuesFromBlocks = (blocks) => {
  let fields = [];
  blocks?.map(block => fields.push({
    name: [block.id],
    value: block,
  }));
  return fields;
};

const setFieldValuesFromFieldsValues = (fieldsValues) => {
  let fields = [];
  for (let fieldValue of Object.entries(fieldsValues)) {
    if (fieldValue[1] !== null) {
      fields.push({
        name: [fieldValue[0]],
        value: fieldValue[1],
      });
    }
  }
  return fields;
};


//contains all the logic regarding the handling of blocks
const BlocksManager = () => {
    const [wizardVisible, setWizardVisible] = useState(false);
    const selectedPage = useSelector(state => state.pages.selectedPage);
    const blocks = useSelector(state => state.pages.pagesList.find(page => page.id === selectedPage)?.data?.blocks);
    const [blocksAreLoading, setBlocksAreLoading] = useState(true);
    const [fields, setFields] = useState(blocks ? setFieldValuesFromBlocks(blocks) : []);
    const [editBlockModalVisible, setEditBlockModalVisible] = useState(false);
    const [selectedBlock, setSelectedBlock] = useState();
    const [formIsUpdated, setFormIsUpdated] = useState(0);

    const [form] = useForm();                   // this form contains a key-value field for every block.
                                                // key: the id of the block and value: the data object of the block
                                                // the form it is declared here, but associated to a Form component in BlockManagerForm.js
    const dispatch = useDispatch();

    // called when the form is submitted ( The Save Changes Button is pressed)
    const onFinish = data => {
                                                 //data contains the fields from form. This contains the latest version of the blocks
      let newBlockArray = [];
      for (let block of Object.entries(data)) {
        newBlockArray.push(block[1]);
      }
      setFormIsUpdated(0);                  // resets the value to 0 for hiding revert changes as now there aren't any changes to revert to

                                                  // automatically uploads changes to backend with the useEffect in AppServices. To see
                                                  // how this works, go to AppServices.js
      dispatch(pagesActions.setBlocks({
        pageId: selectedPage,
        blocks: newBlockArray,
      }));
    };

    // reverts changes to the values in redux (those that are on backend)
    const revertChanges = () => {
      setFormIsUpdated(0);
      updateFieldsFromRedux();
    };


    const showWizard = () => {
      setWizardVisible(true);
      scrollToBottom();
    };

    // opens modal for editing the block
    const onStartEditBlock = (blockId) => {
      setEditBlockModalVisible(true);
      setSelectedBlock(blockId);
    };

    // when a block is finished editing, set's the new value in form and signals that there is an update to be made
    const onFinishEditBlock = (blockId, blockData) => {
      form.setFieldValue(blockId, blockData);
      setFormIsUpdated(prevState => prevState + 1);
    };

    // used to update the place field for every block
    // called when a block is moved.
    const updateBlocksPlaces = (blocksNewSort) => {
      for (let block of blocksNewSort) {
        form.setFieldValue(block.name[0], block.value);
      }
      setFormIsUpdated(prevState => prevState + 1);

    };

    const onDeleteBlock = (blockId) => {
      form.setFieldValue(blockId, null);
      setFormIsUpdated(prevState => prevState + 1);
    };

    const updateFieldsFromRedux = () => {
      if (blocks) {
        const formattedFields = setFieldValuesFromBlocks(blocks);
        formattedFields.sort((field1, field2) => field1.value.metadata.place - field2.value.metadata.place);
        setFields(formattedFields);
      }
    };

    //scrolls to bottom when the wizard is opened
    const scrollToBottom = () => {
      setTimeout(() => {
        window.scrollTo({
          top: document.documentElement.scrollHeight,
          behavior: 'smooth',
        });
      }, 10);
    };


    useEffect(() => {
      updateFieldsFromRedux();
    }, [blocks]);

    // updates the fields state whenever the fields from forms are updated
    // used to display the latest changes to a block in the list of blocks
    useEffect(() => {
      const formFields = form.getFieldsValue();
      const formattedFields = setFieldValuesFromFieldsValues(formFields);
      formattedFields.sort((field1, field2) => field1.value.metadata.place - field2.value.metadata.place);
      setFields(formattedFields);
    }, [formIsUpdated]);


    // used to display the spinner when there are no blocks in redux
    useEffect(() => {
      if (blocks !== undefined) {
        setBlocksAreLoading(false);
      } else {
        setBlocksAreLoading(true);
      }
    }, [blocks]);





    return (
      <div>
        <Spin spinning={blocksAreLoading}>
          <EditBlock
            blockId={selectedBlock}
            editBlockModalVisible={editBlockModalVisible}
            setEditBlockModalVisible={setEditBlockModalVisible}
            onEditFinished={onFinishEditBlock}
            blocksManagerForm={form}
          />


            <Row>
              <Col offset={2} span={22}>
                <BlockManagerForm
                  onFinish={onFinish}
                  form={form}
                  fields={fields}
                  startEditBlock={onStartEditBlock}
                  onDeleteBlock={onDeleteBlock}
                  formIsUpdated={formIsUpdated}
                  revertChanges={revertChanges}
                  updateBlocksPlaces={updateBlocksPlaces} />

              </Col>
              <Col offset={5} span={16} style={{
                marginBottom: '30px',
                marginTop: '30px',
                display: 'flex',
                justifyContent: 'center',
              }}>
                {
                  !wizardVisible &&
                  <Button type='primary' onClick={showWizard}>
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

        </Spin>
      </div>
    );
  }
;
export default BlocksManager;