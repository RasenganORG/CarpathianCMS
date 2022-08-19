import React from 'react';
import { Image, Typography } from 'antd';
import PropTypes from 'prop-types';
import ReactMarkdown from 'react-markdown';
import { Link } from 'react-router-dom';
import rehypeRaw from "rehype-raw";


Paragraph.requiredProps = {
  content: PropTypes.string,
  isEdit: PropTypes.bool,
  id: PropTypes.string,
};

export default function Paragraph({ content, isEdit, id }) {
  return (
    <div
      style={{
        border: '2px solid #04ABF9',
        borderRadius: '13px',
        marginBottom: isEdit ? null : '2rem',
        padding: '1rem',
        width: '100%',
      }}
    >
      <ReactMarkdown rehypePlugins={[rehypeRaw]}>
          {content}
      </ReactMarkdown>
    </div>
  );
}
