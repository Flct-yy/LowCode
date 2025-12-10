import React, { useState, useEffect, useRef } from 'react';
import { Row, Col } from 'antd';
import './comList.scss';
import initComponentList from '@/type/InitComponentMetaList';
import ComItem from './comItem';


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

  return (
    <div ref={containerRef} style={{ width: '100%', height: '100%', overflow: 'auto' }}>
      {/* 使用动态计算的colSpan渲染componentList */}
      <Row gutter={[16, 16]} style={{ marginInline: 'auto', padding: '12px' }}>
        {initComponentList.map(item => (
          <Col key={item.componentId} span={colSpan} style={{ paddingInline: '0px' }}>
            <ComItem {...item} itemWidth={itemWidth} />
          </Col>
        ))}
      </Row>
    </div>
  );
}


export default ComList;