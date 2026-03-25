import React, { useRef, useMemo, useEffect } from 'react';
import { ComponentSchema, ComTree } from '@wect/type';
import { convertConfigToStyle } from '@/utils/convertConfigToStyle';
import { getConfigValue } from '@/utils/index';
import '@/scss/preview.scss';

function Pagination({
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

  // 从配置中获取分页相关值
  let current = getConfigValue<number>(component.config, 'current') || 1;
  const total = getConfigValue<number>(component.config, 'total') || 100;
  const pageSize = getConfigValue<number>(component.config, 'pageSize') || 10;
  
  // 计算总页数
  const totalPages = Math.ceil(total / pageSize);
  // 生成页码数组
  const generatePageNumbers = () => {
    const pages = [];
    const maxVisiblePages = 5;
    
    if (totalPages <= maxVisiblePages) {
      // 总页数小于等于最大可见页数，显示所有页码
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      // 总页数大于最大可见页数，显示当前页附近的页码
      const halfVisible = Math.floor(maxVisiblePages / 2);
      let start = Math.max(1, current - halfVisible);
      let end = Math.min(totalPages, start + maxVisiblePages - 1);
      
      // 调整起始位置，确保显示足够的页码
      if (end - start + 1 < maxVisiblePages) {
        start = Math.max(1, end - maxVisiblePages + 1);
      }
      
      // 添加起始页码和省略号
      if (start > 1) {
        pages.push(1);
        if (start > 2) {
          pages.push('...');
        }
      }
      
      // 添加中间页码
      for (let i = start; i <= end; i++) {
        pages.push(i);
      }
      
      // 添加省略号和结束页码
      if (end < totalPages) {
        if (end < totalPages - 1) {
          pages.push('...');
        }
        pages.push(totalPages);
      }
    }
    
    return pages;
  };
  
  const pageNumbers = generatePageNumbers();
  
  return (
    <div
      ref={divRef}
      className={`component-preview__default component__pagination ${newClassName}`}
      style={inlineStyle}
      onMouseDown={(e) => handleComponentSelect?.(e)}
    >
      <div className="component__pagination-content">
        {/* 上一页按钮 */}
        <span 
          className={`component__pagination-item ${current === 1 ? 'component__pagination-item--disabled' : ''}`}
        >
          上一页
        </span>
        
        {/* 页码按钮 */}
        {pageNumbers.map((page, index) => {
          if (page === '...') {
            return (
              <span key={index} className="component__pagination-item">
                {page}
              </span>
            );
          }
          
          return (
            <span 
              key={index} 
              className={`component__pagination-item ${current === page ? 'component__pagination-item--active' : ''}`}
            >
              {page}
            </span>
          );
        })}
        
        {/* 下一页按钮 */}
        <span 
          className={`component__pagination-item ${current === totalPages ? 'component__pagination-item--disabled' : ''}`}
        >
          下一页
        </span>
      </div>
    </div>
  );
}

export { Pagination };