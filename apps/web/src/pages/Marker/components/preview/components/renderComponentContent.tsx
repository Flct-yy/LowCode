import React, { useEffect, useState, useRef } from "react";
import { ComponentSchema, ComponentTypeEnum } from "@type/ComponentSchema";
import getConfigText from "@utils/getConfigText";
import convertConfigToStyle from "@utils/convertConfigToStyle";
import { useDrop, useDrag } from "react-dnd";
import { DnDTypes } from "@type/DnDTypes";
import useWebsContext from "@context/WebsContext/useWebsContext";
import { generateComSchema, generateVirtualDom } from "@utils/generateComSchema";
import './RenderComponentContent.scss'

// 根据组件类型渲染不同的DOM元素
const RenderComponentContent: React.FC<{ component: ComponentSchema, Selected: boolean }> = ({ component, Selected }) => {
  const { metadata, config, children } = component;
  const { state, actions } = useWebsContext();
  const { selectedComponentId, isDragCom, virtualDomId } = state;

  // 组件容器 拖动放置 ref
  const divRef = useRef<HTMLDivElement>(null);

  // 是否选中
  const [isSelected, setIsSelected] = useState(Selected || selectedComponentId === component.comSchemaId);
  useEffect(() => {
    setIsSelected(Selected || selectedComponentId === component.comSchemaId);
  }, [selectedComponentId, Selected]);

  // 获得组件文本
  const text = getConfigText(config);

  // 获得样式
  const positionStyle: React.CSSProperties = {
    position: component.position.position,
    left: component.position.x,
    top: component.position.y,
    zIndex: component.position.zIndex,
  };
  const style = convertConfigToStyle(component.config);
  const newStyle = { ...positionStyle, ...style };


  type ItemType =
    | { type: DnDTypes.COMMETA; comMeta: { id: number } }
    | { type: DnDTypes.COMSCHEMA; comSchemaId: number };
  // 拖拽放置事件处理
  const [{ canDrop, isOverShallow }, dropComItem] = useDrop({
    accept: [DnDTypes.COMMETA, DnDTypes.COMSCHEMA],
    drop: (item: ItemType, monitor) => {
      let dropped = false;
      // 使用shallow选项确保只有最上层的放置目标处理drop事件
      if (monitor.isOver({ shallow: true }) && monitor.canDrop() && monitor.didDrop() === false) {
        console.log('drop item', item.type);
        if (item.type === DnDTypes.COMMETA) {
          const comMeta = item as { type: string, comMeta: { id: number } };
          // 生成组件Schema
          const compSchema = generateComSchema(comMeta.comMeta.id, component.comSchemaId);
          // 拖拽组件到画布时，更新选中组件
          actions.add_component(compSchema, component.comSchemaId);
          dropped = true;
        } else if (item.type === DnDTypes.COMSCHEMA) {
          const comSchema = item as { type: string, comSchemaId: number };
          // 拖拽组件到组件上时，更新选中组件
          console.log('拖拽组件到组件上时，更新选中组件', comSchema.comSchemaId, component);
          actions.handle_drag_drop(comSchema.comSchemaId, component.comSchemaId, -1);

        }
      }
      if (virtualDomId !== -1) {
        actions.remove_component(virtualDomId as number);
        actions.edit_virtual_dom_id(-1);
      }
      return dropped;
    },
    collect: (monitor) => ({
      canDrop: monitor.canDrop(),
      isOverShallow: monitor.isOver({ shallow: true })
    })
  });
  dropComItem(divRef.current);
  // 拖拽组件事件处理
  const [, dragComItem] = useDrag({
    type: DnDTypes.COMSCHEMA,
    item: { type: DnDTypes.COMSCHEMA, comSchemaId: component.comSchemaId },
    canDrag: () => isDragCom,
    collect: (monitor) => ({
      isDragging: monitor.isDragging()
    })
  });
  dragComItem(divRef.current);

  console.log(component.comSchemaId,'Selected', Selected, 'isSelected', isSelected);
  // 渲染组件内容
  switch (metadata.componentType) {
    case ComponentTypeEnum.VIRTUAL:
      return (
        <div style={{ ...newStyle }} className="component-preview__virtual">
          虚拟组件
        </div>
      )
    case ComponentTypeEnum.FLEX:
      return (
        <div ref={divRef}
          className={`component-preview__default component-preview__flex ${isSelected ? 'component-preview__selected' : ''} ${canDrop ? 'component-preview__can-drop' : ''}`} style={newStyle}
          onMouseDown={(e) => {
            e.stopPropagation();
            actions?.edit_select_com?.(component.comSchemaId);
          }}>
          {text !== '' && text}
          {children && children.length > 0 && children.map((child) => (
            <RenderComponentContent key={child.comSchemaId} component={child as ComponentSchema} Selected={isSelected} />
          ))}
        </div>
      );
    default:
      return (
        <div ref={divRef} className={`component-preview__default ${isSelected ? 'component-preview__selected' : ''} ${canDrop ? 'component-preview__can-drop' : ''}`} style={newStyle}
          onMouseDown={(e) => {
            e.stopPropagation();
            actions?.edit_select_com?.(component.comSchemaId);
          }}>
          {text && <div className="component-preview__text">{text}</div>}
          {children && children.length > 0 && children.map((child) => (
            <RenderComponentContent key={child.comSchemaId} component={child as ComponentSchema} Selected={isSelected} />
          ))}
        </div>
      );
  };
};

export default RenderComponentContent;