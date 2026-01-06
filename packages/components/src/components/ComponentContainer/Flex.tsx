import React, { useRef, useMemo, Children } from 'react';
import { ComponentSchema } from '@wect/type';
import convertConfigToStyle from '@/utils/convertConfigToStyle';
import { getConfigText } from '@/utils/index';

function Flex({
  component,
  componentClassName,
  children,
  handleDnD,
  handleComponentSelect,
}: {
  component: ComponentSchema;
  componentClassName: string;
  children: React.ReactNode;
  handleDnD: (ref: React.RefObject<HTMLDivElement | null>) => { canDrop: boolean; isOverShallow: boolean; };
  handleComponentSelect: (e: React.MouseEvent) => void;
}) {
  const divRef = useRef<HTMLDivElement>(null);

  // 处理拖拽
  const { canDrop, isOverShallow } = handleDnD(divRef);

  // 转换组件配置为 内联样式和类名
  const { style: inlineStyle, className } = convertConfigToStyle(component)
  const newClassName = useMemo(() => {
    return `${componentClassName}  ${canDrop && isOverShallow ? 'component-preview__can-drop' : ''} ${className}`
  }, [componentClassName, className, canDrop, isOverShallow])

  return (
    <div
      ref={divRef}
      className={`component-preview__default component-preview__flex ${newClassName}`}
      style={inlineStyle}
      onMouseDown={handleComponentSelect}>
      {children}
    </div>
  );
}

export { Flex };
