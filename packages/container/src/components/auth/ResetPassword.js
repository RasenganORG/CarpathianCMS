import React, { useState } from 'react';
import { Button, Space, Typography } from 'antd';
import SentIcon from '../assets/icon_sent';
import { PATHS } from '../../routes/paths';
import { useNavigate } from 'react-router-dom';
import ResetPasswordForm from './ResetPasswordForm';



export default function ResetPassword() {
  const [email, setEmail] = useState('');
  const [sent, setSent] = useState(false);
  const navigate = useNavigate()

  return (
    <div
      title='Reset Password'
      style={{ height: '100%' }}
    >
      <div
        style={{
          display: 'flex',
          minHeight: '100%',
          alignItems: 'center',
          justifyContent: 'center',
          padding: 20,
        }}
      >

        <div
          style={{
            maxWidth: 480,
            margin: '0 auto',
            flexDirection:'column',
            display: 'flex',
            minHeight: '100%',
            alignItems: 'center',
            justifyContent: 'center',
        }}>
          {!sent ? (
            <>
              <Typography.Title level={3} style={{ marginBottom: 24 }}>
                Did you forget your password?
              </Typography.Title>
              <Typography.Text type='secondary' style={{ marginBottom: 40 }}>
                Please enter the email address associated with your account and We will email you a link to reset your password.
              </Typography.Text>


              <ResetPasswordForm
                onSent={() => setSent(true)}
                onGetEmail={value => setEmail(value)}
              />


              <Button
                block
                size='large'
                style={{ marginTop: 8 }}
                onClick={() => navigate(PATHS.auth.login)}
              >
                Back
              </Button>
            </>
          ) : (
            <div style={{ textAlign: 'center' }}>
              <SentIcon style={{ marginBottom: 40, margin: 'auto', height: 160 }} />

              <Typography.Title level={3} style={{ marginBottom: 24 }}>
                Mail was successfully sent
              </Typography.Title>
              <Typography.Paragraph>
                Mail sent to:
                &nbsp;
                <strong>{email}</strong>
                <br />
                Please check you mail
              </Typography.Paragraph>

              <Button
                size='large'
                type='primary'
                style={{ marginTop: 40, width:'100%'}}
                onClick={() => navigate(PATHS.auth.login)}
              >
                Back
              </Button>
            </div>
          )}
        </div>
      </div>

    </div>
  );
}