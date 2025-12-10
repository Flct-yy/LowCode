import React from 'react';
import { type ComponentSchema } from '@type/ComponentSchema';
import useWebsContext from '@/context/WebsContext/useWebsContext';
import convertConfigToStyle from '@utils/convertConfigToStyle';
import RenderComponentContent from './renderComponentContent';
import './ComponentPreview.scss';




const ComponentPreview: React.FC<{ comRoot: ComponentSchema }> = ({ comRoot }) => {
  const { state, actions } = useWebsContext();
  const { aspectRatio, selectedComponentId } = state;
  const isSelected = selectedComponentId === comRoot.comSchemaId;

  // 将组件配置转换为样式
  // 组件位置样式

  return (
    <div className="component-preview" style={{ aspectRatio }}>
      {/* 组件内容 - 递归渲染 */}
      <RenderComponentContent component={comRoot} />
    </div>
  );
};

export default ComponentPreview;