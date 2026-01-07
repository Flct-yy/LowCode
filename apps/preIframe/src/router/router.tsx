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
    path: '/preview/:pageId', 
    element: <Preview />, // 匹配路径后渲染 Preview 组件
  },
]);

export default router;