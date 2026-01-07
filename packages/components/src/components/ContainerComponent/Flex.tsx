import React, { useRef, useMemo } from 'react';
import { ComponentSchema } from '@wect/type';
import convertConfigToStyle from '@/utils/convertConfigToStyle';
import '@/scss/ContainerScss/Flex.scss';

function Flex({
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

  // 处理拖拽
  handleDnD?.(divRef);

  // 转换组件配置为 内联样式和类名
  const { style: inlineStyle, className } = convertConfigToStyle(component)
  const newClassName = useMemo(() => {
    return `${componentClassName || ''} ${className}`
  }, [componentClassName, className])

  return (
    <div
      ref={divRef}
      className={`component-preview__default component-preview__flex ${newClassName}`}
      style={inlineStyle}
      onMouseDown={(e)=>handleComponentSelect?.(e)}>
      {children}
    </div>
  );
}

export { Flex };
