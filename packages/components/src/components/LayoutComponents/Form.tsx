import React, { useRef, useMemo, useEffect } from 'react';
import { ComponentSchema, ComTree } from '@wect/type';
import { convertConfigToStyle } from '@/utils/convertConfigToStyle';
import { getConfigText } from '@/utils/index';
import '@/scss/preview.scss';

function Form({
  component,
  componentDep,
  handleDnD,
  handleComponentSelect,
  children,
}: {
  component: ComponentSchema;
  componentDep?: { isSelected: boolean, canDrop: boolean, isOverShallow: boolean };
  handleDnD?: (ref: React.RefObject<HTMLDivElement | null>) => void;
  handleComponentSelect?: (e: React.MouseEvent) => void;
  children?: React.ReactNode;
}) {
  const divRef = useRef<HTMLDivElement | null>(null);

  // 获得组件配置
  const title = getConfigText(component.config, 'title');
  const submitText = getConfigText(component.config, 'submitText');
  const resetText = getConfigText(component.config, 'resetText');

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

  // 处理表单提交
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
  };

  // 处理表单重置
  const handleReset = (e: React.FormEvent) => {
    e.preventDefault();
  };

  // 表单容器样式
  const formStyle: React.CSSProperties = {
    width: inlineStyle.width || '400px',
    height: inlineStyle.height || 'auto',
    backgroundColor: inlineStyle.backgroundColor || '#ffffff',
    border: inlineStyle.border || '1px solid #d9d9d9',
    borderRadius: inlineStyle.borderRadius || '4px',
    padding: inlineStyle.padding || '20px',
    margin: inlineStyle.margin || '0',
  };

  // 表单标题样式
  const titleStyle: React.CSSProperties = {
    fontSize: '18px',
    fontWeight: '600',
    marginBottom: '20px',
    textAlign: 'center',
    color: '#333',
  };

  // 按钮容器样式
  const buttonContainerStyle: React.CSSProperties = {
    display: 'flex',
    justifyContent: 'center',
    gap: '10px',
    marginTop: '20px',
  };

  // 按钮样式
  const buttonStyle: React.CSSProperties = {
    padding: '8px 16px',
    borderRadius: '4px',
    border: '1px solid #d9d9d9',
    backgroundColor: '#ffffff',
    cursor: 'pointer',
    fontSize: '14px',
  };

  // 提交按钮样式
  const submitButtonStyle: React.CSSProperties = {
    ...buttonStyle,
    backgroundColor: '#1890ff',
    color: '#ffffff',
    borderColor: '#1890ff',
  };

  // 重置按钮样式
  const resetButtonStyle: React.CSSProperties = {
    ...buttonStyle,
  };

  return (
    <div
      ref={divRef}
      className={`component-preview__default component__form ${newClassName}`}
      style={inlineStyle}
      onMouseDown={(e) => handleComponentSelect?.(e)}>
      <form
        style={formStyle}
        onSubmit={handleSubmit}
        onReset={handleReset}
      >
        {title && (
          <h3 style={titleStyle}>{title}</h3>
        )}
        {children}
        <div style={buttonContainerStyle}>
          <button
            type="submit"
            style={submitButtonStyle}
          >
            {submitText}
          </button>
          <button
            type="reset"
            style={resetButtonStyle}
          >
            {resetText}
          </button>
        </div>
      </form>
    </div>
  );
}

export { Form };