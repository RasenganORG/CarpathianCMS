import React, { useEffect, useState } from 'react';
import { Col, Menu, Row } from 'antd';
import BlocksManager from '../blocks/BlocksManager';
import { useDispatch, useSelector } from 'react-redux';
import { pagesActions } from '../../redux/pagesSlice';
import EditPageMetadata from './edit/EditPageMetadata';
import PageSettings from './edit/PageSettings';

const items = [
  { label: 'Blocks Editor', key: 'block-editor' },
  { label: 'Page Metadata', key: 'page-metadata' },
  { label: 'Page Settings', key: 'page-settings' }];


export default () => {
  const pages = useSelector(state => state.pages.pagesList);
  const dispatch = useDispatch();
  const [currentMenu, setCurrentMenu] = useState('block-editor');


  //used for sending a signal to navBar to refresh. Activated when for some reason pages weren't loaded
  useEffect(() => {
    if (pages.length === 0) {
      dispatch(pagesActions.refreshNavBar());
    }
  }, [pages]);


  return (
    <Row gutter={[20, 50]}>
      <Col offset={3} span={18}>
        <Menu
          mode='horizontal'
          selectedKeys={[currentMenu]}
          onClick={(k) => setCurrentMenu(k.key)}
          items={items}
          style={{
            marginBottom: '2rem',
          }}
        />
        {currentMenu === 'block-editor' && <BlocksManager />}
        {currentMenu === 'page-metadata' && (<EditPageMetadata />)}
        {currentMenu === 'page-settings' && (<PageSettings />)}
      </Col>

    </Row>
  );
}
