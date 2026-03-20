import React, { useRef, useMemo, useEffect } from 'react';
import { ComponentSchema, ComTree } from '@wect/type';
import { convertConfigToStyle } from '@/utils/convertConfigToStyle';
import { getConfigText } from '@/utils/index';
import '@/scss/preview.scss';

function Card({
  component,
  componentDep,
  handleDnD,
  handleComponentSelect,
  children,
}: {
  component: ComponentSchema;
  componentDep?: { isSelected: boolean, canDrop: boolean, isOverShallow: boolean };
  handleDnD?: (ref: React.RefObject<HTMLDivElement | null>) => void;
  handleComponentSelect?: (e: React.MouseEvent) => void;
  children?: React.ReactNode;
}) {
  const divRef = useRef<HTMLDivElement>(null);

  // 处理拖拽 - 移到useEffect中避免渲染期间状态更新
  useEffect(() => {
    handleDnD?.(divRef);
  }, [handleDnD]);

  // 转换组件配置为 内联样式和类名
  const { isSelected, canDrop, isOverShallow } = componentDep || {}
  const { style: inlineStyle, className } = convertConfigToStyle(component)
  const newClassName = useMemo(() => {
    return `${isSelected ? 'component-preview__selected' : ''} ${canDrop && isOverShallow && component.comSchemaId !== ComTree.PREVIEW_NODE_ID ? 'component-preview__can-drop' : ''} ${className} ${component.comSchemaId === ComTree.PREVIEW_NODE_ID ? 'component-preview__pre' : ''}`
  }, [isSelected, canDrop, isOverShallow, className, component.comSchemaId])

  const title = getConfigText(component.config, 'title')
  const content = getConfigText(component.config, 'content')


  return (
    <div
      ref={divRef}
      className={`component-preview__default component__card ${newClassName}`}
      style={inlineStyle}
      onMouseDown={(e) => handleComponentSelect?.(e)}
    >
      <div className="component__card-header">
        <div className="component__card-title">{title}</div>
      </div>
      <div className="component__card-body">
        <div className="component__card-content">{content}</div>
      </div>
      {children}
    </div>
  );
}

export { Card };