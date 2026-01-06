import React from 'react';
import { useRoutes } from 'react-router-dom';
import { routes } from '@router/router';
import '@scss/app.scss';

function App(): React.ReactNode {
  return (
    <div className="App">
      {/* 渲染路由组件 */}
      {useRoutes(routes)}
    </div>
  );
}

export default App;