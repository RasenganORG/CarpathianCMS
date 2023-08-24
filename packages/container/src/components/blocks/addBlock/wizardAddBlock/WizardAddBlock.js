import { Button, Form, message, Steps } from 'antd';
import React, { useState } from 'react';
import BlockVariantsDrawer from '../blockVariantsDrawer/BlockVariantsDrawer';
const { Step } = Steps;
// import classes from './WizardAddBlock.module.css'
import InitialFormDrawer from '../initialFormDrawer/InitialFormDrawer';


const WizardAddBlock = ({setWizardVisible,blockManagerForm}) => {
  const [current, setCurrent] = useState(0);
  const [initialBlockForm] = Form.useForm();


  const next = () => {
    setCurrent(current + 1);
  };

  const prev = () => {
    setCurrent(current - 1);
  };

  const onNext = () =>{
    return next()
  }


  const steps = [
    {
      title: 'Select type of block',
      content: <BlockVariantsDrawer onNext={onNext} setFieldValue={(name, value) => {
        initialBlockForm.setFieldValue(name, value);
      }}/>,
    },
    {
      title: 'Complete initial metadata',
      content: <InitialFormDrawer form={initialBlockForm} blockManagerForm={blockManagerForm}/>,
    },
  ];


  function onFinish() {
    initialBlockForm.submit()
    setWizardVisible(false)
  }

  return (
    <div
      style={{
        marginTop:'3rem',
        width:'100%'
      }}
    >
      <Steps
        current={current}
        style={{
          marginBottom:'2rem',
        }}
      >
        {steps.map((item) => (
          <Step
            key={item.title}
            title={item.title}
            style={{
              marginLeft:'40px',
              marginRight:'40px'
            }}
          />
        ))}
      </Steps>
      <div>{steps[current].content}</div>
      <div>
        {current === 0 && (
          <Button
            type="primary"
            onClick={() => setWizardVisible(false)}
            style={{
              margin: '0 8px',
            }}
          >
            Close
          </Button>
        )}
        {current > 0 && (
          <Button
            style={{
              margin: '0 8px',
            }}
            onClick={() => prev()}
          >
            Previous
          </Button>
        )}
        {current === steps.length - 1 && (
          <Button type="primary" onClick={onFinish}>
            Done
          </Button>
        )}
      </div>
    </div>
  );
};

export default WizardAddBlock;

