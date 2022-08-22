import React, { useEffect, useState } from 'react';
import { Button, Card, Col, Menu, Modal, Row, Spin } from 'antd';
import { useForm } from 'antd/es/form/Form';
import BlockManagerForm from './BlockManagerForm';
import WizardAddBlock from './addBlock/wizardAddBlock/WizardAddBlock';
import { useDispatch, useSelector } from 'react-redux';
import { pagesActions } from '../../redux/pagesSlice';
import EditBlock from './editBlock/EditBlock';
import EditPageMetadata from '../pages/EditPageMetadata';
import PageSettings from '../pages/PageSettings';

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


const BlocksManager = () => {
    const [wizardVisible, setWizardVisible] = useState(false);
    const [currentMenu, setCurrentMenu] = useState('block-editor');
    const selectedPage = useSelector(state => state.pages.selectedPage);
    const blocks = useSelector(state => state.pages.pagesList.find(page => page.id === selectedPage)?.data?.blocks);
    const [blocksAreLoading, setBlocksAreLoading] = useState(true);
    const [fields, setFields] = useState(blocks ? setFieldValuesFromBlocks(blocks) : []);
    const [editBlockModalVisible, setEditBlockModalVisible] = useState(false);
    const [selectedBlock, setSelectedBlock] = useState();
    const [formIsUpdated, setFormIsUpdated] = useState(0);

    const [form] = useForm();
    const dispatch = useDispatch();

    const onFinish = data => {
      let newBlockArray = [];
      for (let block of Object.entries(data)) {
        newBlockArray.push(block[1]);
      }
      setFormIsUpdated(0);
      dispatch(pagesActions.setBlocks({
        pageId: selectedPage,
        blocks: newBlockArray,
      }));
    };

    const revertChanges = () => {
      setFormIsUpdated(0);
      updateFieldsFromRedux();
    };

    const onFieldChange = newFields => {
      setFields(newFields);
    };

    const showWizard = () => {
      setWizardVisible(true);
      scrollToBottom();
    };

    const onStartEditBlock = (blockId) => {
      setEditBlockModalVisible(true);
      setSelectedBlock(blockId);
    };

    const onFinishEditBlock = (blockId, blockData) => {
      form.setFieldValue(blockId, blockData);
      setFormIsUpdated(prevState => prevState + 1);
    };

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

    useEffect(() => {
      const formFields = form.getFieldsValue();
      const formattedFields = setFieldValuesFromFieldsValues(formFields);
      formattedFields.sort((field1, field2) => field1.value.metadata.place - field2.value.metadata.place);
      setFields(formattedFields);
    }, [formIsUpdated]);


    useEffect(() => {
      if (blocks !== undefined) {
        setBlocksAreLoading(false);
      } else {
        setBlocksAreLoading(true);
      }
    }, [blocks]);


    const items = [
      { label: 'Blocks Editor', key: 'block-editor' },
      { label: 'Page Metadata', key: 'page-metadata' },
      { label: 'Page Settings', key: 'page-settings' }];


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

          <Menu
            mode='horizontal'
            selectedKeys={[currentMenu]}
            onClick={(k) => setCurrentMenu(k.key)}
            items={items}
            style={{
              marginBottom: '2rem',
            }}
          />

          {currentMenu === 'block-editor' && (
            <Row>
              <Col offset={2} span={22}>
                <BlockManagerForm
                  onChange={onFieldChange}
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
            </Row>)}

          {currentMenu === 'page-metadata' && (
            <Row>
              <Col offset={2} span={22}>
                <EditPageMetadata />
              </Col>
            </Row>)}
          {currentMenu === 'page-settings' && (
            <Row>
              <Col offset={2} span={22}>
                <PageSettings />
              </Col>
            </Row>)}

        </Spin>
      </div>
    );
  }
;
export default BlocksManager;