import { useState } from 'react';
import * as React from 'react';
import { Button, Typography } from 'antd';
import { LinkOutlined } from '@ant-design/icons';

function ClipboardCopy({ copyText }) {
  const [isCopied, setIsCopied] = useState(false);

  // This is the function we wrote earlier
  async function copyTextToClipboard(text) {
    if ('clipboard' in navigator) {
      return await navigator.clipboard.writeText(text);
    } else {
      return document.execCommand('copy', true, text);
    }
  }

  // onClick handler function for the copy button
  const handleCopyClick = () => {
    // Asynchronously call copyTextToClipboard
    copyTextToClipboard(copyText)
      .then(() => {
        // If successful, update the isCopied state value
        setIsCopied(true);
        setTimeout(() => {
          setIsCopied(false);
        }, 3500);
      })
      .catch(err => {
        console.log(err);
      });
  };

  return (
    <div style={{
      display: 'inline-block',
      marginBottom:'30px',
    }}>
      <div
        style={{
          border: '2px solid #001529',
          borderRadius: '0.75em',

          display: 'flex',
          justifyContent: 'space-between',
        }}
      >
        <div style={{
          width: '100%',
          padding: '0.6em',
          paddingTop: '1em',
          paddingBottom: '1em',
        }}>
          <Typography.Text
            style={{
              color: '#1890ff',
              backgroundColor: '#ffffff',
              fontSize: '17px',
              marginRight: '30px',
              marginLeft: '30px',
            }}
            strong={true}
          >
            {copyText}
          </Typography.Text>
        </div>
        <Button
          onClick={handleCopyClick}
          startIcon={<LinkOutlined />}
          type={'text'}
          style={{
            textTransform: 'none',
            color: '#ffffff',
            backgroundColor: isCopied ? '#00cc7e' : '#1890ff',
            width:'100%',
            height:'3.5rem',
            borderRadius: ' 0 0.6em 0.6em 0',
          }}
          variant={isCopied ? 'filled' : 'outlined'}
        >
          {isCopied ? 'Copied!' : 'Copy'}
        </Button>
      </div>
    </div>
  );
}

export default ClipboardCopy;
