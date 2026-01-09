import React, { useRef, useMemo, useEffect } from 'react';
import { ComponentSchema, ComTree } from '@wect/type';
import convertConfigToStyle from '@/utils/convertConfigToStyle';
import { getConfigText } from '@/utils/index';
import '@/scss/ContainerScss/Default.scss';

function Default({
  component,
  componentClassName,
  children,
  handleDnD,
  handleComponentSelect,
}: {
  component: ComponentSchema;
  componentClassName?: string;
  children?: React.ReactNode;
  handleDnD?: (ref: React.RefObject<HTMLDivElement | null>) => void;
  handleComponentSelect?: (e: React.MouseEvent) => void;
}) {
  const divRef = useRef<HTMLDivElement>(null);

  // 获得组件文本
  const text = getConfigText(component.config);

  // 处理拖拽，使用useEffect确保在渲染完成后调用
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
      onMouseDown={(e) => handleComponentSelect?.(e)}>
      {text !== '' && text}
      {children}
    </div>
  );
}

export { Default };
