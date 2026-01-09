import React, { useRef, useMemo, useEffect } from 'react';
import { ComponentSchema, ComTree } from '@wect/type';
import convertConfigToStyle from '@/utils/convertConfigToStyle';
import { getConfigText } from '@/utils/index';
import '@/scss/BaseScss/Text.scss';

function Text({
  component,
  componentClassName,
  handleDnD,
  handleComponentSelect,
}: {
  component: ComponentSchema;
  componentClassName?: string;
  handleDnD?: (ref: React.RefObject<HTMLDivElement | null>) => void;
  handleComponentSelect?: (e: React.MouseEvent) => void;
}) {
  const divRef = useRef<HTMLDivElement>(null);

  // 获得组件文本
  const text = getConfigText(component.config);

  // 处理拖拽 - 移到useEffect中避免渲染期间状态更新
  useEffect(() => {
    handleDnD?.(divRef);
  }, [handleDnD]);

  // 转换组件配置为 内联样式和类名
  const { style: inlineStyle, className } = convertConfigToStyle(component)
  const newClassName = useMemo(() => {
    return `${componentClassName || ''} ${className} ${component.comSchemaId === ComTree.PREVIEW_NODE_ID ? 'component-preview__pre' : ''}`
  }, [componentClassName, className, component.comSchemaId])

  return (
    <div
      ref={divRef}
      className={`component-preview__default ${newClassName}`}
      style={inlineStyle}
      onMouseDown={(e)=>handleComponentSelect?.(e)}>
      {text !== '' && text}
    </div>
  );
}

export { Text };
