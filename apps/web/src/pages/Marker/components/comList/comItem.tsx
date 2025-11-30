import React from 'react';
import componentType from '@/type/componentType';
import { DragSourceMonitor, useDrag } from 'react-dnd';
import { ItemTypes } from '@type/DnD';

const ComItem: React.FC<componentType & { itemWidth: number }> = ({ id, type, text, icon, itemWidth }) => {

  const [{ isDragging }, drag]: any = useDrag(
    {
      item: { comp: { id: id }, originalIndex: -1 },
      type: ItemTypes.COMITEM,
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
        {text}
      </span>
    </div>
  );
}

export default ComItem;