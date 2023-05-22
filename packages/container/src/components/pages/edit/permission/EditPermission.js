import React from 'react';
import { Col, Row, Select, Typography } from 'antd';
import { useSelector } from 'react-redux';

export default function EditPermissions({ onSelectPermission, selectedUser,form }) {
  const roles = useSelector(state => state.pages.roles)


  const getSelectedValues = () => {
    let specialPermissionsDict = form.getFieldValue('specialPermissions')
    if(Object.keys(specialPermissionsDict).length > 0) {
      for (let [userId, permissions] of Object.entries(specialPermissionsDict)) {
        if (userId === selectedUser.id) {
          return permissions
        }
      }
    }
    return [];

  };

  return (
    <Row
      style={{
        width: '100%',
      }}>
      <Col
        offset={3}
        span={9}
      >
        <Row>
          <Col>
            <Typography.Title level={4}>
              The selected user:
            </Typography.Title>
          </Col>
        </Row>
      <Row>
        <Col span={4}>
          <Typography.Text
            style={{
              fontSize: '15px',
            }}
            strong
          >
            Email:
          </Typography.Text>
        </Col>
        <Col span={10}>
          <Typography.Text
            style={{
              fontSize: '15px',
            }}
          >
            {selectedUser.email}
          </Typography.Text>
        </Col>
      </Row>
      <Row>
        <Col span={4}>
          <Typography.Text
            style={{
              fontSize: '15px',
            }}
            strong
          >
            Name:
          </Typography.Text>
        </Col>
        <Col span={10}>
          <Typography.Text
            style={{
              fontSize: '15px',
            }}
          >
            {selectedUser.firstName} {selectedUser.lastName}
          </Typography.Text>
        </Col>
      </Row>
      <Row>
        <Col span={4}>
          <Typography.Text
            style={{
              fontSize: '15px',
            }}
            strong
          >
            Role:
          </Typography.Text>
        </Col>
        <Col span={10}>
          <Typography.Text
            style={{
              fontSize: '15px',
            }}
          >
            {selectedUser.role}
          </Typography.Text>
        </Col>
      </Row>
      </Col>
      <Col
        span={9}

        style={{
          display:'flex',
          flexDirection:'column',
          justifyContent:'center',
        }}
      >
        <Typography.Title level={4}>
          User's permissions:
        </Typography.Title>
          <Select
            mode='multiple'
            placeholder='Choose permissions'
            optionLabelProp='label'
            onChange={value => onSelectPermission(value)}
            defaultValue={getSelectedValues()}
            style={{
              height: '50px',
              width: '100%',
            }}
          >
            {roles.map(role => (
              <Select.Option
                value={role.value}
                label={role.label}
                key={role.value}
              >
                <Typography.Text>
                  {role.label}
                </Typography.Text>
              </Select.Option>
            ))}

          </Select>
      </Col>
    </Row>
  );
}
