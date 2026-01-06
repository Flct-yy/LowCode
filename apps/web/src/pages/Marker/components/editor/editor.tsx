import React from 'react';
import { Empty, Tabs, TabsProps } from 'antd';
import useWebsContext from '@context/WebsContext/useWebsContext';
import ComConfig from './comConfig';
import ComTreeControl from './comTreeControl';
import './editor.scss';

const Editor: React.FC = () => {
  const { state, actions } = useWebsContext();
  const { comTree, selectedComponentId } = state;

  const items: TabsProps['items'] = [
    {
      key: '1',
      label: '组件配置',
      children: selectedComponentId !== -1 && selectedComponentId ? (
        <ComConfig />
      ) : <Empty description="请选择组件" />,
    },
    {
      key: '2',
      label: '组件总览',
      children: <ComTreeControl
        selectedComponentId={selectedComponentId!}
        comTree={comTree}
        onSelect={actions.edit_select_com}
        onDragDrop={actions.handle_drag_drop} />,
    },
  ];

  return (
    <div className='editor'>
      <Tabs defaultActiveKey="1" items={items} />
    </div>
  );
}

export default Editor;