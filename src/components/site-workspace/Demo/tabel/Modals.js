import { Modal } from 'antd';
import AddNewLineForm from './AddNewLineForm';
import ModifyDataColumnsForm from './ModifyDataColumnsForm';
import React, { useState } from 'react';

const Modals = (props) => {
  const [tempColumns, setTempColumns] = useState(props.tabelColumns);


  const handleOkModifyDataColumns = () => {
    props.setShowModifyDataColumnsModal(false);
    setTempColumns(props.tabelColumns)
    console.log('here');
  };

  const handleCancelModifyDataColumns = () => {
    props.setShowModifyDataColumnsModal(false);
    setTempColumns(props.tabelColumns)

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
          setTabelColumns={props.setTabelColumns}
          tabelColumns={props.tabelColumns}
          tempColumns={tempColumns}
          setTempColumns={setTempColumns}
        />
      </Modal>
    </div>
  );
};

export default Modals;