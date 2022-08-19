import TextEditor from '../../editor/TextEditor';
import React from 'react';

export default function EditParagraph({ value, onChange }) {

  return (
    <TextEditor
      placeholder={'Enter the content'}
      height={'200px'}
      value={value}
      onChange={onChange}
    />
  );
}

