import { DesktopOutlined } from '@ant-design/icons';
import React from 'react';
import { Button } from 'antd';
import { pagesActions } from '../redux/pagesSlice';

export const createNavBar = (navbarJson, dispatch, navigate) => {

  let navBarComp = []
  for(let page of Object.entries(navbarJson)){
    let children = []
    if(Object.keys(page[1].children).length !== 0){
      children = createNavBar(page[1].children,dispatch,navigate)
    }
    navBarComp.push({
      key: page[0],
      id: page[0],
      name:`${page[1].metadata.title}`,
      label:
        <Button
          className={'nav-bar-button'}
          type={'text'}
          style={{
            color:'white'
          }}
          onClick={() => {
            navigate(`${page[1].metadata.href}`)
            dispatch(pagesActions.setSelectedPage(page[0]))
          }}
        >
          {page[1].metadata.title}
        </Button>,
      icon: <DesktopOutlined />,
      children: children.length > 0 ? children : null
    })
  }
  return navBarComp
}
