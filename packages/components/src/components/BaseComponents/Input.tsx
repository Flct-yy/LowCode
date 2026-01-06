import React, { useRef, useMemo } from 'react';
import { ComponentSchema } from '@wect/type';
import convertConfigToStyle from '@/utils/convertConfigToStyle';
import { getConfigText } from '@/utils/index';

function Input({
  component,
  componentClassName,
  handleDnD,
  handleComponentSelect,
}: {
  component: ComponentSchema;
  componentClassName: string;
  handleDnD: (ref: React.RefObject<HTMLDivElement | null>) => void;
  handleComponentSelect: (e: React.MouseEvent) => void;
}) {
  const divRef = useRef<HTMLDivElement>(null);

  // 获得组件文本
  const text = getConfigText(component.config);

  // 处理拖拽
  handleDnD(divRef);

  // 转换组件配置为 内联样式和类名
  const { style: inlineStyle, className } = convertConfigToStyle(component)
  const newClassName = useMemo(() => {
    return `${componentClassName} ${className}`
  }, [componentClassName, className])

  return (
    <div ref={divRef}
      className={`component-preview__default component-preview__input ${newClassName}`}
      style={inlineStyle}
      onMouseDown={handleComponentSelect}>
      <input
        type="text"
        placeholder={text || '请输入文字...'}
        className="input-field"
        style={{
          width: '100%',
          height: '100%',
          border: 'none',
          background: 'transparent',
          outline: 'none',
          color: 'inherit',
          fontSize: 'inherit',
          fontWeight: 'inherit',
          textAlign: 'inherit',
          lineHeight: 'inherit'
        }}
      />
    </div>
  );
}

export { Input };
