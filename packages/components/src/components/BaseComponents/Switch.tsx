import React, { useRef, useMemo, useEffect, useState } from 'react';
import { ComponentSchema, ComTree } from '@wect/type';
import { convertConfigToStyle } from '@/utils/convertConfigToStyle';
import { getConfigText, getConfigValue } from '@/utils/index';
import '@/scss/preview.scss';

function Switch({
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
  const [checked, setChecked] = useState<boolean>(false);

  // 获得组件文本
  const text = getConfigText(component.config, 'text');
  
  // 获得开关状态
  const defaultChecked = getConfigValue<boolean>(component.config, 'checked') || false;
  
  // 获得禁用状态
  const disabled = getConfigValue<boolean>(component.config, 'disabled') || false;
  
  // 获得颜色
  const activeColor = getConfigValue<string>(component.config, 'activeColor') || '#1890ff';
  const inactiveColor = getConfigValue<string>(component.config, 'inactiveColor') || '#d9d9d9';

  // 初始化开关状态
  useEffect(() => {
    setChecked(defaultChecked);
  }, [defaultChecked]);

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

  // 处理开关切换
  const handleToggle = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!disabled) {
      setChecked(!checked);
    }
  };

  // 开关容器样式
  const switchContainerStyle: React.CSSProperties = {
    display: 'inline-flex',
    alignItems: 'center',
    gap: '8px',
  };

  // 开关样式
  const switchStyle: React.CSSProperties = {
    position: 'relative',
    width: '44px',
    height: '24px',
    borderRadius: '12px',
    backgroundColor: disabled ? '#f5f5f5' : (checked ? activeColor : inactiveColor),
    transition: 'background-color 0.3s ease',
    cursor: disabled ? 'not-allowed' : 'pointer',
    display: 'flex',
    alignItems: 'center',
    padding: '2px',
  };

  // 开关滑块样式
  const switchHandleStyle: React.CSSProperties = {
    width: '20px',
    height: '20px',
    borderRadius: '50%',
    backgroundColor: '#ffffff',
    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.15)',
    transition: 'transform 0.3s ease',
    transform: checked ? 'translateX(20px)' : 'translateX(0)',
  };

  return (
    <div
      ref={divRef}
      className={`component-preview__default component__switch ${newClassName}`}
      style={inlineStyle}
      onMouseDown={(e) => handleComponentSelect?.(e)}>
      <div style={switchContainerStyle}>
        {text && (
          <span style={{
            fontSize: '14px',
            color: disabled ? '#bfbfbf' : '#333',
            userSelect: 'none',
          }}>
            {text}
          </span>
        )}
        <div 
          style={switchStyle}
          onClick={handleToggle}
        >
          <div style={switchHandleStyle} />
        </div>
      </div>
    </div>
  );
}

export { Switch };