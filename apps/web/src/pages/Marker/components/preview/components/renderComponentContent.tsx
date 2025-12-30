import React, { useEffect, useState, useRef } from "react";
import { ComponentSchema, ComponentTypeEnum } from "@type/ComponentSchema";
import getConfigText from "@utils/getConfigText";
import convertConfigToStyle from "@utils/convertConfigToStyle";
import { useDrop, useDrag } from "react-dnd";
import { DnDTypes } from "@type/DnDTypes";
import useWebsContext from "@context/WebsContext/useWebsContext";
import { findNode } from "@/type/ComTree";
import { generateComSchema } from "@utils/generateComSchema";
import './RenderComponentContent.scss'
import '@scss/variables.scss'

// 根据组件类型渲染不同的DOM元素
const RenderComponentContent: React.FC<{ component: ComponentSchema, Selected: boolean }> = ({ component, Selected }) => {
  const { metadata, config, children } = component;
  const { state, actions } = useWebsContext();
  const { selectedComponentId, isDragCom } = state;

  // 组件容器 拖动放置 ref
  const divRef = useRef<HTMLDivElement>(null);

  // 是否选中
  const [isSelected, setIsSelected] = useState(Selected || selectedComponentId === component.comSchemaId);
  useEffect(() => {
    setIsSelected(Selected || selectedComponentId === component.comSchemaId);
  }, [selectedComponentId, Selected]);

  // 获得组件文本
  const text = getConfigText(config);

  // 获得样式：包含动态生成的className和位置相关的内联样式
  const { style: inlineStyle, className } = convertConfigToStyle(component);


  type ItemType =
    | { type: DnDTypes.COMMETA; comMeta: { id: number } }
    | { type: DnDTypes.COMSCHEMA; comSchemaId: number };
  // 拖拽放置事件处理
  const [{ canDrop, isOverShallow }, dropComItem] = useDrop({
    accept: [DnDTypes.COMMETA, DnDTypes.COMSCHEMA],
    drop: (item: ItemType, monitor) => {
      // 使用shallow选项确保只有最上层的放置目标处理drop事件
      if (monitor.isOver({ shallow: true }) && monitor.canDrop() && monitor.didDrop() === false) {
        let goalID = component.comSchemaId;
        const curCom = findNode(component.comSchemaId);
        if (curCom) {
          const parentCom = findNode(curCom.parentId);
          if (parentCom) {
            // 获取拖拽位置信息
            const clientOffset = monitor.getClientOffset();
            const dropRect = divRef.current?.getBoundingClientRect();
            
            // 基于位置的放置策略：中心区域放当前组件，边缘区域放父组件
            if (clientOffset && dropRect) {
              const relativeX = clientOffset.x - dropRect.left;
              const relativeY = clientOffset.y - dropRect.top;
              const dropZoneWidth = dropRect.width;
              const dropZoneHeight = dropRect.height;
              
              // 定义区域划分：
              // - 垂直方向：顶部1/3和底部1/3区域
              // - 水平方向：左侧1/3和右侧1/3区域
              // 边缘区域（任意边缘方向）放置到父组件，中心区域放置到当前组件
              const topZone = dropZoneHeight / 3;
              const bottomZone = dropZoneHeight * 2 / 3;
              const leftZone = dropZoneWidth / 3;
              const rightZone = dropZoneWidth * 2 / 3;
              
              // 判断是否在边缘区域
              const isInVerticalEdge = relativeY < topZone || relativeY > bottomZone;
              const isInHorizontalEdge = relativeX < leftZone || relativeX > rightZone;
              
              // 如果在任意边缘区域，放置到父组件
              if (isInVerticalEdge || isInHorizontalEdge) {
                goalID = parentCom.comSchemaId;
              }
              // 否则（中心区域），放置到当前组件
            }
          }
        }
        if (item.type === DnDTypes.COMMETA) {
          const comMeta = item as { type: string, comMeta: { id: number } };
          // 生成组件Schema
          const compSchema = generateComSchema(comMeta.comMeta.id, goalID);
          console.log('拖拽组件到画布时，生成组件Schema', goalID, compSchema);
          // 拖拽组件到画布时，更新选中组件
          actions.add_component(compSchema, compSchema.parentId, -1);
        } else if (item.type === DnDTypes.COMSCHEMA) {
          const comSchema = item as { type: string, comSchemaId: number };
          // 拖拽组件到组件上时，更新选中组件
          console.log('拖拽组件到组件上时，更新选中组件', comSchema.comSchemaId, component);
          actions.handle_drag_drop(comSchema.comSchemaId, goalID, -1);
        }
      }
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

  // 渲染组件内容
  switch (metadata.componentType) {
    case ComponentTypeEnum.FLEX:
      return (
        <div ref={divRef}
          className={`component-preview__default component-preview__flex ${className} ${isSelected ? 'component-preview__selected' : ''} ${canDrop && isOverShallow ? 'component-preview__can-drop' : ''}`}
          style={inlineStyle}
          onMouseDown={(e) => {
            e.stopPropagation();
            actions?.edit_select_com?.(component.comSchemaId);
          }}>
          {children && children.length > 0 && children.map((child) => (
            <RenderComponentContent key={child.comSchemaId} component={child as ComponentSchema} Selected={isSelected} />
          ))}
        </div>
      );
    case ComponentTypeEnum.TEXT:
      return (
        <div ref={divRef}
          className={`component-preview__default component-preview__text ${className} ${isSelected ? 'component-preview__selected' : ''} ${canDrop ? 'component-preview__can-drop' : ''}`}
          style={inlineStyle}
          onMouseDown={(e) => {
            e.stopPropagation();
            actions?.edit_select_com?.(component.comSchemaId);
          }}
        >
          {text !== '' && text}
          {children && children.length > 0 && children.map((child) => (
            <RenderComponentContent key={child.comSchemaId} component={child as ComponentSchema} Selected={isSelected} />
          ))}
        </div>
      )
    default:
      return (
        <div ref={divRef} className={`component-preview__default ${className} ${isSelected ? 'component-preview__selected' : ''} ${canDrop ? 'component-preview__can-drop' : ''}`}
          style={inlineStyle}
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