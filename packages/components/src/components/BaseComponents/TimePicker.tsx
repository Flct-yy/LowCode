import React, { useRef, useMemo, useEffect, useState } from 'react';
import { ComponentSchema, ComTree } from '@wect/type';
import { convertConfigToStyle } from '@/utils/convertConfigToStyle';
import { getConfigValue } from '@/utils/index';
import '@/scss/preview.scss';

function TimePicker({
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

  // 从配置中获取默认时间值
  const defaultValue = getConfigValue<string>(component.config, 'defaultValue') || '12:00';
  // 从配置中获取时间格式
  const format = getConfigValue<string>(component.config, 'format') || '24h';
  // 从配置中获取禁用状态

  const [time, setTime] = useState(defaultValue);

  // 处理拖拽 - 移到useEffect中避免渲染期间状态更新
  useEffect(() => {
    handleDnD?.(divRef);
  }, [handleDnD]);

  // 当defaultValue改变时更新time状态
  useEffect(() => {
    setTime(defaultValue);
  }, [defaultValue]);

  // 转换组件配置为 内联样式和类名
  const { isSelected, canDrop, isOverShallow } = componentDep || {}
  const { style: inlineStyle, className } = convertConfigToStyle(component)
  const newClassName = useMemo(() => {
    return `${isSelected ? 'component-preview__selected' : ''} ${canDrop && isOverShallow && component.comSchemaId !== ComTree.PREVIEW_NODE_ID ? 'component-preview__can-drop' : ''} ${className} ${component.comSchemaId === ComTree.PREVIEW_NODE_ID ? 'component-preview__pre' : ''}`
  }, [isSelected, canDrop, isOverShallow, className, component.comSchemaId])

  return (
    <div
      ref={divRef}
      className={`component-preview__default component__time-picker ${newClassName}`}
      style={inlineStyle}
      onMouseDown={(e) => handleComponentSelect?.(e)}
    >
      <div className="component__time-picker-content">
        <input
          type="time"
          value={time}
          onChange={(e) => setTime(e.target.value)}
          className="component__time-picker-input"
          step={format === '12h' ? '3600' : '60'}
        />
      </div>
    </div>
  );
}

export { TimePicker };