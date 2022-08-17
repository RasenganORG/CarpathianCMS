import { Button, Form, message, Steps } from 'antd';
import React, { useState } from 'react';
import BlockVariantsDrawer from '../blockVariantsDrawer/BlockVariantsDrawer';
const { Step } = Steps;
import classes from './WizardAddBlock.module.css'
import BlockInitialForm from '../BlockInitialForm';
import BlockFormDrawer from '../../../drawers/BlockFormDrawer';
import { useDispatch } from 'react-redux';
import { pagesActions } from '../../../../redux/pagesSlice';


const WizardAddBlock = ({setWizardVisible}) => {
  const [current, setCurrent] = useState(0);
  const [initialBlockForm] = Form.useForm();
  const dispatch = useDispatch()


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
        console.log(name)
        initialBlockForm.setFieldValue(name, value);
      }}/>,
    },
    {
      title: 'Complete initial metadata',
      content: <BlockFormDrawer form={initialBlockForm}/>,
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
      <div className={classes.stepsContent}>{steps[current].content}</div>
      <div className={classes.stepsAction}>
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