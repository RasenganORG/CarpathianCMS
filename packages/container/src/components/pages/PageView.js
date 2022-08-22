import React, { useEffect } from 'react';
import { Col, Row, Typography } from 'antd';
import CalendarGeneratedApp from '../widgetsMfe/CalendarGeneratedApp';
import BlocksManager from '../blocks/BlocksManager';
import BlockViewManager from '../blocksView/BlockViewManager';
import { useDispatch, useSelector } from 'react-redux';
import { pagesActions } from '../../redux/pagesSlice';

export default () => {
  const pages = useSelector(state => state.pages.pagesList)
  const selectedPage = useSelector(state => state.pages.selectedPage);
  const currentPage = useSelector(state => state.pages.pagesList.find(page => page.id === selectedPage));
  const dispatch = useDispatch()

  useEffect(() => {
    if(pages.length === 0){
      dispatch(pagesActions.refreshNavBar())
    }
  },[pages])

  return (
    <Row gutter={[20,50]}>
      <Col offset={11}>
        <Typography.Title level={3}>
          {currentPage?.data.metadata.title}
        </Typography.Title>
      </Col>
      <Col offset={3} span={18}>
        <BlockViewManager/>
      </Col>
    </Row>
  );
}
