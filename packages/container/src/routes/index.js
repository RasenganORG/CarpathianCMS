import { Navigate, useRoutes } from 'react-router-dom';
import ApplicationLayout from '../components/layouts/ApplicationLayout';
import Home from '../components/home/Home';
import ContentTypes from '../components/content-types/ContentTypes';
import React from 'react'
import PageView from '../components/PageView';
import PageEdit from '../components/PageEdit';

const Router = () => {

  return useRoutes([
    {
      path: '/',
      element: <ApplicationLayout />,
      children: [
        {
          path: '',
          element: <Home />,
        },
        {
          path: 'content-types',
          element: <ContentTypes/>
        },
        {
          path:'/:pageid',
          element:<PageView/>
        },
        {
          path:'/:pageid/edit',
          element:<PageEdit/>
        }
      ],
    },
  ]);
};

export default Router