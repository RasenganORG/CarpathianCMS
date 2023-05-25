import React, { useEffect, useState } from 'react';
import { Col, Row, Typography } from 'antd';
import BlockViewManager from '../blocksView/BlockViewManager';
import { useDispatch, useSelector } from 'react-redux';
import { pagesActions } from '../../redux/pagesSlice';
import EmptyPage from './EmptyPage';
import VisibleByRoleWithSpecialPermissionsGuard from '../guards/VisibleByRoleWithSpecialPermissionsGuard';
import useAuth from '../hooks/use-auth';
import { useNavigate } from 'react-router-dom';
import { PATHS } from '../../routes/paths';

export default () => {
  const pages = useSelector(state => state.pages.pagesList);
  const selectedPage = useSelector(state => state.pages.selectedPage);
  const currentPage = useSelector(state => state.pages.pagesList.find(page => page.id === selectedPage));
  const [pageIsEmpty, setPageIsEmpty] = useState(currentPage?.data?.blocks.length === 0);
  const dispatch = useDispatch();
  const userId = useAuth().user.localId;
  const navigate = useNavigate()


  // if there are no pages loaded, makes a request to try and download them again
  useEffect(() => {
    if (pages.length === 0) {
      dispatch(pagesActions.refreshNavBar());
    }
  }, [pages]);

  useEffect(() => {
    setPageIsEmpty(currentPage?.data?.blocks.length === 0);
    if(selectedPage === null) {
      //console.log("PageView 404")
      navigate(PATHS['404']);
    }
  }, [currentPage,selectedPage]);

  return (
    <Row gutter={[20, 50]}>
      <Col offset={3} span={18}>
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
          }}
        >
          <Typography.Title level={3}>
            {currentPage?.data.metadata.title}
          </Typography.Title>
        </div>
      </Col>
      <Col offset={3} span={18}>
        <BlockViewManager />
      </Col>

      {pageIsEmpty &&
        <Col offset={3} span={18}>
          <VisibleByRoleWithSpecialPermissionsGuard
            defaultAccessibleRoles={['admin', 'editor']}
            userId={userId}
            onlyForEditors={true}
          >
            <EmptyPage />
          </VisibleByRoleWithSpecialPermissionsGuard>
        </Col>}
    </Row>
  );
}
