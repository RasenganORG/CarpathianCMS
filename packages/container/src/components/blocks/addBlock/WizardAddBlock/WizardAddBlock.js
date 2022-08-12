import { Button, message, Steps } from 'antd';
import React, { useState } from 'react';
import BlockVariantsDrawer from '../blockVariantsDrawer/BlockVariantsDrawer';
const { Step } = Steps;
import classes from './WizardAddBlock.module.css'
import BlockInitialForm from '../BlockInitialForm';
import BlockFormDrawer from '../../../drawers/BlockFormDrawer';


const WizardAddBlock = () => {
  const [current, setCurrent] = useState(0);

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
      content: <BlockVariantsDrawer onNext={onNext}/>,
    },
    {
      title: 'Complete initial metadata',
      content: <BlockFormDrawer/>,
    },
  ];


  function onFinish(value) {
    console.log(value)
    message.success('Processing complete!')
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