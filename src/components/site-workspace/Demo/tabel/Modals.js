import { Modal } from 'antd';
import AddNewLineForm from './AddNewLineForm';
import ModifyDataColumnsForm from './ModifyDataColumnsForm';
import React, { useState } from 'react';

const Modals = (props) => {

  const handleOkModifyDataColumns = () => {
    props.setShowModifyDataColumnsModal(false);
    console.log('here');
  };

  const handleCancelModifyDataColumns = () => {
    props.setShowModifyDataColumnsModal(false);
    props.setTempColumns(props.tempColumns);
  };

  const handleOkAddANewLine = () => {
    props.setShowAddANewLineModal(false);
  };

  const handleCancelAddANewLine = () => {
    props.setShowAddANewLineModal(false);
  };


  return (
    <div>
      <Modal visible={props.showAddANewLineModal} onOk={handleOkAddANewLine} onCancel={handleCancelAddANewLine}>
        <AddNewLineForm />
      </Modal>
      <Modal visible={props.showModifyDataColumnsModal} onOK={handleOkModifyDataColumns}
             onCancel={handleCancelModifyDataColumns}>
        <ModifyDataColumnsForm
          tempColumns={props.tempColumns}
          setTabelColumns={props.setTabelColumns}
          visible={props.showModifyDataColumnsModal} />
      </Modal>
    </div>
  );
};

export default Modals;