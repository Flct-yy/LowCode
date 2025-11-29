import React from 'react';
import { RouteObject } from 'react-router-dom';
import Lists from '@pages/Lists/Lists';
import Marker from '@pages/Marker/Marker';



const routes: RouteObject[] = [
  {
    path: '/',
    element: React.createElement(Lists),
  },
  {
    path: '/lists',
    element: React.createElement(Lists),
  },
  {
    path: '/marker',
    element: React.createElement(Marker),
  },
];

export { routes };