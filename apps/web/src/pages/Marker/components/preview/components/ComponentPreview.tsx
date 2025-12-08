import React from 'react';
import { type ComponentSchema } from '@type/ComponentSchema';
import useWebsContext from '@/context/WebsContext/useWebsContext';
import convertConfigToStyle from '@utils/convertConfigToStyle';
import renderComponentContent from './renderComponentContent';
import './ComponentPreview.scss';




const ComponentPreview: React.FC<{ comRoot: ComponentSchema }> = ({ comRoot }) => {
  const { state, actions } = useWebsContext();
  const { aspectRatio, selectedComponentId } = state;
  const isSelected = selectedComponentId === comRoot.comSchemaId;

  // 将组件配置转换为样式
  const componentStyle = convertConfigToStyle(comRoot.config);
  console.log('componentStyle', componentStyle);
  // 组件位置样式
  const positionStyle: React.CSSProperties = {
    position: comRoot.position.position,
    left: comRoot.position.x,
    top: comRoot.position.y,
    zIndex: comRoot.position.zIndex,
  };

  return (
    <div
      className={`component-preview-container ${isSelected ? 'component-preview--selected' : ''}`}
      style={{ ...positionStyle }}
      onMouseDown={(e) => {
        e.stopPropagation();
        actions?.edit_select_com?.(comRoot.comSchemaId);
      }}
    >
      {/* 组件内容 - 递归渲染 */}
      {renderComponentContent(comRoot, componentStyle)}
    </div>
  );
};

export default ComponentPreview;