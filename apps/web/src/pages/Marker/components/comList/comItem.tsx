import React from 'react';
import type { ComponentMetadata } from '@/type/ComponentSchema';
import { DragSourceMonitor, useDrag } from 'react-dnd';
import { DnDTypes } from '@/type/DnDTypes';

const ComItem: React.FC<ComponentMetadata & { itemWidth: number }> = ({ componentId, componentName, componentType, category, tags, version, description, icon, itemWidth }) => {

  const [{ isDragging }, drag]: any = useDrag(
    {
      item: { type: DnDTypes.COMMETA, comMeta: { id: componentId } },
      type: DnDTypes.COMMETA,
      end: (i: any, monitor: DragSourceMonitor) => {
        if (monitor.didDrop()) {
          i.originalIndex = -1
        }
      },
      collect: (monitor) => ({
        isDragging: monitor.isDragging(),
      }),
    },
    [],
  );

  return (
    <div ref={drag} className="com-item" style={{ width: `${itemWidth}px`, height: `${itemWidth}px` }}>
      <i style={{ backgroundImage: `url(${icon})` }} className="com-item__icon" />
      <span>
        {componentName}
      </span>
    </div>
  );
}

export default ComItem;