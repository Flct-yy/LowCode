import React, { useRef, useMemo, useEffect, useState } from 'react';
import { ComponentSchema, ComTree } from '@wect/type';
import { convertConfigToStyle } from '@/utils/convertConfigToStyle';
import { getConfigText } from '@/utils/index';
import '@/scss/preview.scss';

function Label({
  component,
  componentDep,
  handleDnD,
  handleComponentSelect,
}: {
  component: ComponentSchema;
  componentDep?: { isSelected: boolean, canDrop: boolean, isOverShallow: boolean };
  handleDnD?: (ref: React.RefObject<HTMLDivElement | null>) => void;
  handleComponentSelect?: (e: React.MouseEvent) => void;
}) {
  const divRef = useRef<HTMLDivElement | null>(null);
  const [hoveredTag, setHoveredTag] = useState<number | null>(null);

  // 获得组件文本
  const text = getConfigText(component.config, 'text');

  // 获得标签列表
  const tagsStr = getConfigText(component.config, 'tags');
  const tags = tagsStr ? tagsStr.split(',').map(tag => tag.trim()).filter(tag => tag) : [];

  // 处理拖拽 - 移到useEffect中避免渲染期间状态更新
  useEffect(() => {
    if (!divRef.current) return;
    handleDnD?.(divRef);
  }, [handleDnD]);

  // 转换组件配置为 内联样式和类名
  const { isSelected, canDrop, isOverShallow } = componentDep || {}
  const { style: inlineStyle, className } = convertConfigToStyle(component)
  const newClassName = useMemo(() => {
    return `${isSelected ? 'component-preview__selected' : ''} ${canDrop && isOverShallow && component.comSchemaId !== ComTree.PREVIEW_NODE_ID ? 'component-preview__can-drop' : ''} ${className} ${component.comSchemaId === ComTree.PREVIEW_NODE_ID ? 'component-preview__pre' : ''}`
  }, [isSelected, canDrop, isOverShallow, className, component.comSchemaId])

  // 标签组样式
  const labelGroupStyle: React.CSSProperties = {
    display: 'flex',
    gap: '8px',
    flexWrap: 'wrap',
    padding: '8px',
    backgroundColor: 'transparent',
    justifyContent: 'center',
    alignItems: 'center',
  };

  // 单个标签样式
  const getTagStyle = (index: number): React.CSSProperties => {
    const isHovered = hoveredTag === index;
    return {
      padding: '6px 14px',
      backgroundColor: isHovered ? '#bae7ff' : '#e6f7ff',
      border: `1px solid ${isHovered ? '#69c0ff' : '#91d5ff'}`,
      borderRadius: '20px',
      fontSize: '12px',
      whiteSpace: 'nowrap',
      color: '#1890ff',
      fontWeight: 500,
      boxShadow: isHovered ? '0 4px 8px rgba(24, 144, 255, 0.2)' : '0 2px 4px rgba(0, 0, 0, 0.05)',
      transition: 'all 0.3s ease',
      cursor: 'pointer',
      transform: isHovered ? 'translateY(-1px)' : 'none',
    };
  };

  return (
    <div
      ref={divRef}
      className={`component-preview__default component__label ${newClassName}`}
      style={inlineStyle}
      onMouseDown={(e) => handleComponentSelect?.(e)}>
      {tags.length > 0 && (
        <div className="label__group" style={labelGroupStyle}>
          {text !== '' && (
            <div style={{
              fontSize: '14px',
              fontWeight: '600',
              marginBottom: '8px',
              color: '#333',
              padding: '0 8px',
              textAlign: 'center',
            }}>
              <span style={{
                verticalAlign: 'middle',
                display: 'inline-block',
                height: '100%',
               }}>{text+'：'}</span>
            </div>
          )}
          {tags.map((tag, index) => (
            <div
              key={index}
              className="label__tag"
              style={getTagStyle(index)}
              onMouseEnter={() => setHoveredTag(index)}
              onMouseLeave={() => setHoveredTag(null)}
            >
              {tag}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export { Label };