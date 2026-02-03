import React from 'react';
import { ComTree, findNode, type ComponentMetadata } from '@wect/type';
import { DragSourceMonitor, useDrag } from 'react-dnd';
import { DnDTypes } from '@/type/DnDTypes';
import './comItem.scss';
import useWebsContext from '@/context/WebsContext/useWebsContext';

const ComItem: React.FC<ComponentMetadata & { itemWidth: number }> = ({ componentId, componentName, componentType, category, tags, version, description, icon, itemWidth }) => {

  const { actions } = useWebsContext()

  const [{ isDragging }, drag]: any = useDrag(
    {
      item: { type: DnDTypes.COMMETA, comMeta: { id: componentId } },
      type: DnDTypes.COMMETA,
      end: (i: any, monitor: DragSourceMonitor) => {
        // if (findNode(ComTree.PREVIEW_NODE_ID)) {
        //   actions.remove_preview_node();
        // }
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
      {/* <i style={{ backgroundImage: `url(${icon})` }} className="com-item__icon" /> */}
      <span className="com-item__type">{componentType.slice(0, 2).toUpperCase()}</span>
      <span>
        {componentName}
      </span>
    </div>
  );
}

export default ComItem;