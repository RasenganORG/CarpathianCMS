import React, { useEffect } from 'react';
import { Col, Row } from 'antd';
import CalendarGeneratedApp from '../widgetsMfe/CalendarGeneratedApp';
import BlocksManager from '../blocks/BlocksManager';
import BlockViewManager from '../blocksView/BlockViewManager';
import { useDispatch, useSelector } from 'react-redux';
import { pagesActions } from '../../redux/pagesSlice';

export default () => {
  const pages = useSelector(state => state.pages.pagesList)
  const dispatch = useDispatch()

  useEffect(() => {
    if(pages.length === 0){
      dispatch(pagesActions.refreshNavBar())
    }
  },[pages])

  return (
    <Row gutter={[20,50]}>
      <Col offset={3} span={18}>
        <BlockViewManager/>
      </Col>
    </Row>
  );
}
