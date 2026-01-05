// src/router/router.ts
import React from 'react';
import { createBrowserRouter } from 'react-router-dom';
import App from '@/App';
import Preview from '@/pages/preview/preview';


const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
  },
  {
    path: '/preview',
    element: <Preview />,
  },
]);

export default router;