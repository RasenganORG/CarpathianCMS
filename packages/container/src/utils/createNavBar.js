import { Link } from 'react-router-dom';
import { DesktopOutlined } from '@ant-design/icons';
import React from 'react';

export const createNavBar = (navbarJson) => {
  //console.log(navbarJson)
  let navBarComp = []
  for(let page of Object.entries(navbarJson)){
    let children = []
    if(page[1].children !== {}){
      children = createNavBar(page[1].children)
    }
    navBarComp.push({
      key: page[0],
      id: page[0],
      label: <Link to={page[1].metadata.href}>{page[1].metadata.title}</Link>,
      icon: <DesktopOutlined />,
      children: children.length > 0 ? children : null
    })
    //console.log(Object.entries(page[1].children))
  }
  //console.log("Comp", navBarComp)
  return navBarComp
}
