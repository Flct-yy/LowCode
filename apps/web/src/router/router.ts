import React from 'react';
import { RouteObject } from 'react-router-dom';
import Lists from '@pages/Lists/Lists';
import Marker from '@pages/Marker/Marker';
import PreIframe from '@pages/PreIframe/PreIframe';
import Login from '@pages/Auth/Login';
import Register from '@pages/Auth/Register';
import AuthGuard from '@components/AuthGuard';



const routes: RouteObject[] = [
  {
    path: '/',
    element: React.createElement(AuthGuard, { children: React.createElement(Lists) }),
  },
  {
    path: '/lists',
    element: React.createElement(AuthGuard, { children: React.createElement(Lists) }),
  },
  {
    path: '/marker',
    element: React.createElement(AuthGuard, { children: React.createElement(Marker) }),
  },
  {
    path: '/preview/:pageId',
    element: React.createElement(AuthGuard, { children: React.createElement(PreIframe) }),
  },
  {
    path: '/auth/login',
    element: React.createElement(Login),
  },
  {
    path: '/auth/register',
    element: React.createElement(Register),
  },
];

export { routes };