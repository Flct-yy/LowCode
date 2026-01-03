import React from 'react';
import { Row, Col } from 'antd';
import type { ComponentMetadata } from '@/type/ComponentSchema';
import ComItem from './comItem';
import { ComponentCategoryEnum } from '@/type/ComponentSchema';
import './comArea.scss';

// 组件类别名称映射
const categoryNames: Record<ComponentCategoryEnum, string> = {
  [ComponentCategoryEnum.ROOT]: '根组件',
  [ComponentCategoryEnum.LAYOUT]: '布局组件',
  [ComponentCategoryEnum.BASIC]: '基础组件',
};

interface ComAreaProps {
  category: ComponentCategoryEnum;
  components: ComponentMetadata[];
  colSpan: number;
  itemWidth: number;
}

const ComArea: React.FC<ComAreaProps> = ({ category, components, colSpan, itemWidth }) => {
  return (
    <div className="com-area">
      {/* 类别标题 */}
      <div className="com-area__title">
        <h3>{categoryNames[category]}</h3>
      </div>
      
      {/* 组件列表 */}
      <Row gutter={[16, 16]} style={{ marginInline: 'auto', padding: '0 12px 12px' }}>
        {components.map(item => (
          <Col key={item.componentId} span={colSpan} style={{ paddingInline: '0px' }}>
            <ComItem {...item} itemWidth={itemWidth} />
          </Col>
        ))}
      </Row>
    </div>
  );
};

export default ComArea;