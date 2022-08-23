import TextEditor from '../../editor/TextEditor';
import React from 'react';

export default function EditParagraph({ value, onChangeEditor }) {
  const text = value.text

  const onChangeEditorD = (text) => {
    onChangeEditor({ ...value, text: text })
  }

  return (
    <TextEditor
      placeholder={'Enter the content'}
      height={'200px'}
      value={text}
      onChange={onChangeEditorD}
    />
  );
}

