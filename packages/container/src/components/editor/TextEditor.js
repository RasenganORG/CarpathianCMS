import React from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import './TextEditor.module.css'

const modules = {
  toolbar: [
    ['bold', 'italic', 'underline', 'strike'],
    ['blockquote', 'code-block'],

    [{ 'header': 1 }, { 'header': 2 }],
    [{ 'list': 'ordered'}, { 'list': 'bullet' }],
    [{ 'script': 'sub'}, { 'script': 'super' }],
    [{ 'indent': '-1'}, { 'indent': '+1' }],
    [{ 'direction': 'rtl' }],

    [{ 'header': [1, 2, 3, 4, 5, 6, false] }],

    [{ 'color': [] }, { 'background': [] }],
    [{ 'font': [] }],
    [{ 'align': [] }],

    ['clean']
  ],
};

const customOptions = [{
  import: 'attributors/style/size',
  whitelist: ['10', '16', '22', '36', '48', '72', '144']
}];

const formats = [
  'header',
  'bold',
  'italic',
  'underline',
  'strike',
  'blockquote',
  'list',
  'bullet',
  'indent',
  'link',
  'code',
  'script',
  'background',
  'color',
  'font',
  'align',
  'direction',
  'code-block',
  'image',
  'video',
];



const TextEditor = ({ value, onChange, placeholder, height }) => {
  return (
    <>
      <ReactQuill
        className={'ql-snow'}
        theme="snow"
        value={value || ''}
        modules={modules}
        formats={formats}
        customOptions={customOptions}
        onChange={onChange}
        placeholder={placeholder}
        style={{
          height:height,
          marginBottom:'40px',
        }}
      />
    </>
  );
};

export default TextEditor;