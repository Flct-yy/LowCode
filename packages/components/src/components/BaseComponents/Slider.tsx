import React, { useRef, useMemo, useEffect } from 'react';
import { ComponentSchema, ComTree } from '@wect/type';
import { convertConfigToStyle } from '@/utils/convertConfigToStyle';
import { getConfigValue } from '@/utils/index';

function Slider({
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
  const divRef = useRef<HTMLDivElement>(null);

  // 从配置中获取 Slider 组件的属性
  const min = getConfigValue<number>(component.config, 'slider.min') ?? 0;
  const max = getConfigValue<number>(component.config, 'slider.max') ?? 100;
  const step = getConfigValue<number>(component.config, 'slider.step') ?? 1;
  const value = getConfigValue<number>(component.config, 'slider.value') ?? 50;
  const disabled = getConfigValue<boolean>(component.config, 'slider.disabled') ?? false;
  const showTooltip = getConfigValue<boolean>(component.config, 'slider.showTooltip') ?? true;
  const showMarks = getConfigValue<boolean>(component.config, 'slider.showMarks') ?? false;

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

  return (
    <div
      ref={divRef}
      className={`component-preview__default component__slider ${newClassName}`}
      style={inlineStyle}
      onMouseDown={(e) => handleComponentSelect?.(e)}>
      <div style={{ width: '100%' }}>
        <input
          type="range"
          min={min}
          max={max}
          step={step}
          value={value}
          disabled={disabled}
          style={{ width: '100%' }}
        />
        {showTooltip && (
          <div style={{
            position: 'relative',
            display: 'inline-block',
            backgroundColor: '#333',
            color: '#fff',
            padding: '4px 8px',
            borderRadius: '4px',
            fontSize: '12px',
            marginLeft: '10px'
          }}>
            {value}
          </div>
        )}
        {showMarks && (
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            width: '100%',
            marginTop: '8px',
            fontSize: '12px',
            color: '#666'
          }}>
            <span>{min}</span>
            <span>{max}</span>
          </div>
        )}
      </div>
    </div>
  );
}

export { Slider };