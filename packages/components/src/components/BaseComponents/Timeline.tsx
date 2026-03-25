import React, { useRef, useMemo, useEffect } from 'react';
import { ComponentSchema, ComTree } from '@wect/type';
import { convertConfigToStyle } from '@/utils/convertConfigToStyle';
import { getConfigValue } from '@/utils/index';
import '@/scss/preview.scss';

function Timeline({
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

  // 从配置中获取时间线数据
  const getTimelineItems = () => {
    try {
      const itemsConfig = getConfigValue<string>(component.config, 'items');
      if (itemsConfig) {
        const parsedItems = JSON.parse(itemsConfig);
        if (Array.isArray(parsedItems)) {
          return parsedItems;
        }
      }
    } catch (error) {
      console.error('Failed to parse timeline items:', error);
    }
    // 默认数据
    return [
      { time: '2024-01-01', content: '事件1' },
      { time: '2024-01-02', content: '事件2' },
      { time: '2024-01-03', content: '事件3' },
    ];
  };

  const timelineItems = getTimelineItems();

  return (
    <div
      ref={divRef}
      className={`component-preview__default component__timeline ${newClassName}`}
      style={inlineStyle}
      onMouseDown={(e) => handleComponentSelect?.(e)}
    >
      <div className="timeline-container">
        {timelineItems.map((item, index) => (
          <div key={index} className="timeline-item">
            <div className="timeline-dot"></div>
            <div className="timeline-content">
              <div className="timeline-time">{item.time}</div>
              <div className="timeline-text">{item.content}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export { Timeline };