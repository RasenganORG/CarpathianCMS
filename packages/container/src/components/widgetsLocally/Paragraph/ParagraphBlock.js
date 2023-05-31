import React from 'react';
import { Image, Typography } from 'antd';
import PropTypes from 'prop-types';
import ReactMarkdown from 'react-markdown';
import { Link } from 'react-router-dom';
import rehypeRaw from "rehype-raw";


ParagraphBlock.requiredProps = {
  content: PropTypes.string,
  isEdit: PropTypes.bool,
  id: PropTypes.string,
};

export default function ParagraphBlock({ content, isEdit, id }) {
  return (
    <div
      style={{
        border: content.borderIsVisible ? '2px solid #04ABF9' : null,
        borderRadius: content.borderIsVisible ? '13px'  : null,
        marginBottom: isEdit ? null : '2rem',
        padding: '1rem',
        width: '100%',
      }}
    >
      <ReactMarkdown rehypePlugins={[rehypeRaw]}>
          {content.text}
      </ReactMarkdown>
    </div>
  );
}
