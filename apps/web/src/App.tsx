import React from 'react';
import { useRoutes } from 'react-router-dom';
import { routes } from '@router/router';
import '@scss/app.scss';

// 可以导入我们的工作区包
// import { someUtil } from '@wect/utils';
// import { someConfig } from '@wect/config';
// import { SomeComponent } from '@wect/components';

function App(): React.ReactNode {
  return (
    <div className="App">
      {/* 渲染路由组件 */}
      {useRoutes(routes)}
    </div>
  );
}

export default App;