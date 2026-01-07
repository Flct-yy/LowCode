import React, { useRef, useMemo } from 'react';
import { ComponentSchema } from '@wect/type';
import convertConfigToStyle from '@/utils/convertConfigToStyle';
import { getConfigText } from '@/utils/index';

function Button({
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
      className={`component-preview__default component-preview__button ${newClassName}`}
      style={inlineStyle}
      onMouseDown={(e)=>handleComponentSelect?.(e)}
    >
      {text !== '' && text}
    </div>
  );
}

export { Button };
