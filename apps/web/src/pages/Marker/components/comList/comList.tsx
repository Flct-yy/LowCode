import React, { useState, useEffect, useRef } from 'react';
import './comList.scss';
import initComponentList from '@/type/InitComponentMetaList';
import ComArea from './comArea';
import { ComponentCategoryEnum } from '@wect/type';


const ComList: React.FC = () => {
  const [colSpan, setColSpan] = useState<number>(24); // 默认1列
  const [itemWidth, setItemWidth] = useState<number>(88);
  const containerRef = useRef<HTMLDivElement>(null);

  // 根据容器宽度计算列数
  const calculateColumns = (width: number) => {
    const outsidePad = 24;
    const minWidth = 60;
    let newColSpan: number;
    let newItemWidth: number;

    if (width <= 140) {
      newColSpan = 24; // 1列
      newItemWidth = Math.max(width - outsidePad, minWidth);
    } else if (width <= 220) {
      newColSpan = 12; // 2列
      newItemWidth = Math.max((width - outsidePad) / 2, minWidth);
    } else if (width <= 318) {
      newColSpan = 8; // 3列
      newItemWidth = Math.max((width - outsidePad) / 3, minWidth);
    } else if (width <= 416) {
      newColSpan = 6; // 4列
      newItemWidth = Math.max((width - outsidePad) / 4, minWidth);
    } else {
      newColSpan = 4; // 6列
      newItemWidth = Math.max((width - outsidePad) / 6, minWidth); // 修复：添加6列时的itemWidth计算
    }

    // 只有当值真正变化时才更新，避免不必要的重新渲染
    if (newItemWidth !== itemWidth) {
      setItemWidth(newItemWidth);
    }

    return newColSpan;
  };

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // 初始化列数
    setColSpan(calculateColumns(container.clientWidth));

    // 创建ResizeObserver监听容器宽度变化
    const observer = new ResizeObserver(entries => {
      for (const entry of entries) {
        const { width } = entry.contentRect;
        setColSpan(calculateColumns(width));
      }
    });

    observer.observe(container);

    return () => {
      observer.disconnect();
    };
  }, []);

  // 按组件类别分组
  const groupedComponents = initComponentList.reduce<Record<ComponentCategoryEnum, typeof initComponentList>>(
    (acc, component) => {
      if (!acc[component.category]) {
        acc[component.category] = [];
      }
      acc[component.category].push(component);
      return acc;
    },
    {} as Record<ComponentCategoryEnum, typeof initComponentList>
  );

  // 获取所有类别（按预设顺序）
  const categories = Object.values(ComponentCategoryEnum);

  return (
    <div ref={containerRef} style={{ width: '100%', height: '100%', overflow: 'auto' }}>
      {/* 按类别渲染组件区域 */}
      {categories.map(category => {
        const components = groupedComponents[category];
        if (components && components.length > 0) {
          return (
            <ComArea
              key={category}
              category={category}
              components={components}
              colSpan={colSpan}
              itemWidth={itemWidth}
            />
          );
        }
        return null;
      })}
    </div>
  );
}


export default ComList;