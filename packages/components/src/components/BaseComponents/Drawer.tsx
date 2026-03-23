import React, { useRef, useMemo, useEffect, useState } from 'react';
import { ComponentSchema, ComTree } from '@wect/type';
import { convertConfigToStyle } from '@/utils/convertConfigToStyle';
import { getConfigValue, getConfigText } from '@/utils/index';
import '@/scss/preview.scss';
import { UnorderedListOutlined } from '@ant-design/icons';

function Drawer({
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
  const divRef = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  // 处理拖拽 - 移到useEffect中避免渲染期间状态更新
  useEffect(() => {
    handleDnD?.(divRef);
  }, [handleDnD]);

  // 转换组件配置为 内联样式和类名
  const { isSelected, canDrop, isOverShallow } = componentDep || {}
  const { style: inlineStyle } = convertConfigToStyle(component)
  const newClassName = useMemo(() => {
    return `${isSelected ? 'component-preview__selected' : ''} ${canDrop && isOverShallow && component.comSchemaId !== ComTree.PREVIEW_NODE_ID ? 'component-preview__can-drop' : ''}  ${component.comSchemaId === ComTree.PREVIEW_NODE_ID ? 'component-preview__pre' : ''}`
  }, [isSelected, canDrop, isOverShallow, component.comSchemaId])

  // 从配置中获取标题
  const title = getConfigText(component.config, 'title');
  // 从配置中获取内容
  const content = getConfigText(component.config, 'content');
  // 从配置中获取方向
  const placement = getConfigValue<string>(component.config, 'placement') || 'right';
  // 从配置中获取宽度
  const width = getConfigValue<number>(component.config, 'width') || 300;
  // 从配置中获取按钮样式
  const buttonBackgroundColor = getConfigValue<string>(component.config, 'buttonBackgroundColor') || '#1890ff';
  const buttonColor = getConfigValue<string>(component.config, 'buttonColor') || '#ffffff';
  const buttonBorderColor = getConfigValue<string>(component.config, 'buttonBorderColor') || '#1890ff';
  const buttonBorderWidth = getConfigValue<number>(component.config, 'buttonBorderWidth') || 1;
  const buttonBorderRadius = getConfigValue<number>(component.config, 'buttonBorderRadius') || 4;
  const buttonPadding = getConfigValue<any>(component.config, 'buttonPadding');

  return (
    <div
      ref={divRef}
      className={`component-preview__default component__drawer ${newClassName}`}
      style={{
        ...inlineStyle,
        width: `${buttonBorderWidth}px`
      }}
      onMouseDown={(e) => handleComponentSelect?.(e)}
    >
      <div
        className="drawer-trigger"
        onClick={() => setVisible(true)}
        style={{
          backgroundColor: buttonBackgroundColor,
          color: buttonColor,
          borderColor: buttonBorderColor,
          borderWidth: `${buttonBorderWidth}px`,
          borderRadius: `${buttonBorderRadius}px`,
          padding: buttonPadding ? `${buttonPadding.padding.top}px ${buttonPadding.padding.right}px ${buttonPadding.padding.bottom}px ${buttonPadding.padding.left}px` : '8px 16px',
          borderStyle: 'solid',
          cursor: 'pointer',
          display: 'inline-block'
        }}
      >
        <UnorderedListOutlined />
      </div>

      {visible && (
        <div className='drawer-overlay' onClick={() => setVisible(false)}>
          <div
            className={`drawer-content drawer-${placement}`}
            style={{ width: `${width}px` }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="drawer-header">
              <h3 className="drawer-title">{title || '抽屉标题'}</h3>
              <button className="drawer-close" onClick={() => setVisible(false)}>
                ×
              </button>
            </div>
            <div className="drawer-body">
              {content || '抽屉内容'}
              {children}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export { Drawer };