import React, { useEffect, useState } from 'react';
import SearchUser from '../../../searchUser/SearchUser';
import { Button, Steps } from 'antd';
import EditPermissions from './EditPermission';
import PermissionFrame from './PermissionFrame';

const { Step } = Steps;


export default function PermissionsWizard({ form }) {
  const [selectedUser, setSelectedUser] = useState();
  const [current, setCurrent] = useState(0);

  const next = () => {
    setCurrent(current + 1);
  };

  const prev = () => {
    setCurrent(current - 1);
  };

  const steps = [
    {
      title: 'Search for user',
      content:
        <PermissionFrame>
          <SearchUser
            form={form}
            setSelectedUser={setSelectedUser} />
        </PermissionFrame>,
    },
    {
      title: 'Edit permission',
      content:
        <PermissionFrame>
          <EditPermissions
            selectedUser={selectedUser} />
        </PermissionFrame>,
    },
  ];

  useEffect(() => {
    if (selectedUser) {
      next();
    }
  }, [selectedUser]);

  return (
    <>
      <Steps
        current={current}>
        {steps.map(item => (
          <Step key={item.title} title={item.title} />
        ))}
      </Steps>
      <div>{steps[current].content}</div>
      <div>
        {current > 0 && (
          <Button style={{ margin: '0 8px' }} onClick={() => prev()}>
            Previous
          </Button>
        )}
      </div>
    </>

  );
}

