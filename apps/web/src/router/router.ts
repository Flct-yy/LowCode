import React from 'react';
import { RouteObject, Navigate } from 'react-router-dom';
import Marker from '@pages/Marker/Marker';
import PreIframe from '@pages/PreIframe/PreIframe';
import { defaultRoot } from '@wect/type';

/**-------------------TODO------------------- */
// 保存页面属性到本地
const savePageProperties = () => {
  const data = Date.now();
  const pageProperties = {
    metadata: {
      id: data,
      title: `新页面_${data}`,
      description: '这是一个新创建的页面',
      keywords: ['新页面'],
      createdAt: data.toString(), // API返回的可能是字符串
      updatedAt: data.toString(), // API返回的可能是字符串
    },
    comTree: defaultRoot,
    comCount: 1,
    aspectRatio: '16/9',
  };

  // 保存到localStorage
  const pages = localStorage.getItem('pages');
  if (pages) {
    return JSON.parse(pages).title;
  }

  localStorage.setItem('pages', JSON.stringify(pageProperties));
  return pageProperties.metadata.title;
};

// 跳转组件
const RedirectToMarker = () => {
  savePageProperties();
  return React.createElement(Navigate, { to: '/marker' });
};
/**-------------------TODO------------------- */

const routes: RouteObject[] = [
  {
    path: '/',
    element: React.createElement(RedirectToMarker),
  },
  {
    path: '/lists',
    element: React.createElement(RedirectToMarker),
  },
  {
    path: '/marker',
    element: React.createElement(Marker),
  },
  {
    // TODO
    // path: '/preview/:pageId',
    path: '/preview/',
    element: React.createElement(PreIframe),
  },
];

export { routes };