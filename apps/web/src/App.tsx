import React from 'react';
import { useRoutes } from 'react-router-dom';
import { routes } from '@router/router';
import '@scss/app.scss';
import ErrorBoundary from './components/ErrorBoundary';

function App(): React.ReactNode {
  return (
    <ErrorBoundary>
      <div className="App">
        {/* 渲染路由组件 */}
        {useRoutes(routes)}
      </div>
    </ErrorBoundary>
  );
}

export default App;