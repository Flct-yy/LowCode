import React from 'react';
import { type ComponentSchema } from '@type/ComponentSchema';
import useWebsContext from '@/context/WebsContext/useWebsContext';
import convertConfigToStyle from '@utils/convertConfigToStyle';
import RenderComponentContent from './renderComponentContent';
import './ComponentPreview.scss';
import { useDrop } from 'react-dnd';
import { DnDTypes } from '@/type/DnDTypes';
import { generateComSchema, generateVirtualDom } from '@/utils/generateComSchema';




const ComponentPreview: React.FC<{ comRoot: ComponentSchema }> = ({ comRoot }) => {
  const { state, actions } = useWebsContext();
  const { aspectRatio, selectedComponentId, virtualDomId } = state;
  const isSelected = selectedComponentId === comRoot.comSchemaId;
  const rootRef = React.useRef<HTMLDivElement>(null);

  type ItemType =
    | { type: DnDTypes.COMMETA; comMeta: { id: number } }
    | { type: DnDTypes.COMSCHEMA; comSchemaId: number };
  const [{ canDrop }, dropComItem] = useDrop({
    accept: [DnDTypes.COMMETA, DnDTypes.COMSCHEMA],
    drop: (item: ItemType, monitor) => {
      let dropped = false;
      // 使用shallow选项确保只有最上层的放置目标处理drop事件
      if (monitor.isOver({ shallow: true }) && monitor.canDrop() && monitor.didDrop() === false) {
        console.log('drop item', item.type);
        if (item.type === DnDTypes.COMMETA) {
          const comMeta = item as { type: string, comMeta: { id: number } };
          // 生成组件Schema
          const compSchema = generateComSchema(comMeta.comMeta.id, comRoot.comSchemaId);
          // 拖拽组件到画布时，更新选中组件
          actions.add_component(compSchema, comRoot.comSchemaId);
          dropped = true;
        } else if (item.type === DnDTypes.COMSCHEMA) {
          const comSchema = item as { type: string, comSchemaId: number };
          // 拖拽组件到组件上时，更新选中组件
          console.log('拖拽组件到组件上时，更新选中组件', comSchema.comSchemaId, comRoot);
          actions.handle_drag_drop(comSchema.comSchemaId, comRoot.comSchemaId);
          dropped = true;
        }
      }
      // 无论是否执行了放置操作，都要移除虚拟节点
      if (virtualDomId !== -1) {
        actions.remove_component(virtualDomId as number);
        actions.edit_virtual_dom_id(-1);
      }
      return dropped ? { dropped: true } : undefined;
    },
    hover: (item: ItemType, monitor) => {
      // 使用shallow选项确保只有最上层的放置目标处理hover事件
      if (monitor.canDrop() && monitor.didDrop() === false) {
        if (item.type === DnDTypes.COMMETA) {
          actions?.edit_is_drag_com?.(true);
        } else if (item.type === DnDTypes.COMSCHEMA) {
          // 检查拖拽是否仍然在放置目标上，且是最上层目标
          if (monitor.isOver({ shallow: true })) {
            // monitor.isOver({ shallow: true }) 确保只有最上层的放置目标处理hover事件
            // { shallow: true }表示 只检测当前放置目标是否是最上层的
            // 虚拟Dom实现预览效果
            // 只在没有虚拟DOM的情况下创建
            if (virtualDomId === -1) {
              const newVirtualDomId = (virtualDomId === -1 ? 0 : virtualDomId) + 1;
              const virtualDom = generateVirtualDom(newVirtualDomId, comRoot.comSchemaId);
              actions.edit_virtual_dom_id(virtualDom.comSchemaId);
              actions.add_component(virtualDom, comRoot.comSchemaId);
              console.log('拖拽放置目标时', comRoot.metadata.componentType);
            }
          } else if (!monitor.isOver()) {
            // 拖拽离开所有放置目标时移除虚拟DOM
            // 如果不加 '(!monitor.isOver())' 的话,会导致不满足上面的条件的区域都执行会移除虚拟DOM 并且会不断添加删除虚拟DOM浪费性能
            if (virtualDomId !== undefined) {
              console.log('拖拽离开所有放置目标时移除虚拟DOM', comRoot.metadata.componentType);
              actions.remove_component(virtualDomId);
              actions.edit_virtual_dom_id(-1);
            }
          }
        }
      }
    },
    collect: (monitor) => ({
      canDrop: monitor.canDrop(),
      isOverShallow: monitor.isOver({ shallow: true })
    })
  });
  dropComItem(rootRef.current);

  const style = convertConfigToStyle(comRoot.config);
  const positionStyle: React.CSSProperties = {
    position: comRoot.position.position,
    left: comRoot.position.x,
    top: comRoot.position.y,
    zIndex: comRoot.position.zIndex,
  };
  const newStyle = { ...style, ...positionStyle };

  return (
    <div className="component-preview" style={{ aspectRatio }}>
      {/* 组件内容 - 递归渲染 */}
      <div ref={rootRef}
        className={`component-preview__root ${isSelected ? 'component-preview__selected' : ''} ${canDrop ? 'component-preview__can-drop' : ''}`} style={{ ...newStyle }}
        onMouseDown={(e) => {
          e.stopPropagation();
          actions?.edit_select_com?.(comRoot.comSchemaId);
        }}>
        {comRoot.children && comRoot.children.length > 0 && comRoot.children.map((child) => (
          <RenderComponentContent key={child.comSchemaId} component={child as ComponentSchema} />
        ))}
      </div>
    </div>
  );
};

export default ComponentPreview;