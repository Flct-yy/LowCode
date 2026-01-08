import React, { useEffect, useState, useRef, useMemo, useCallback } from "react";
import { ComponentSchema, ComponentTypeEnum } from "@wect/type";
import { useDrop, useDrag } from "react-dnd";
import { message } from "antd";
import { DnDTypes } from "@type/DnDTypes";
import useWebsContext from "@context/WebsContext/useWebsContext";
import { ConfigItemFieldEnum } from "@wect/type";
import { findNode } from "@wect/type";
import { generateComSchema } from "@utils/generateComSchema";
import { Default, Flex, Text, Image, Button, Input } from '@wect/components';
import './RenderComponentContent.scss'
import '@scss/variables.scss'
import '@wect/components/index.css';

// 根据组件类型渲染不同的DOM元素
const RenderComponentContent: React.FC<{
  component: ComponentSchema;
  Selected: boolean;
  onSetSelectedComponentRef: (component: ComponentSchema, ref: HTMLDivElement | null) => void;
}> = ({ component, Selected, onSetSelectedComponentRef }) => {
  const { metadata, children } = component;
  const { state, actions } = useWebsContext();
  const { selectedComponentId,isDragCom } = state;

  // 是否选中
  const [isSelected, setIsSelected] = useState(Selected || selectedComponentId === component.comSchemaId);
  useEffect(() => {
    setIsSelected(Selected || selectedComponentId === component.comSchemaId);
  }, [selectedComponentId, Selected]);

  // 组件级ref，用于获取DOM元素进行拖拽位置计算
  const componentRef = useRef<HTMLDivElement | null>(null);

  // 组件选中处理函数 - 使用useCallback缓存
  const handleComponentSelect = useCallback((e: React.MouseEvent) => {
    e.stopPropagation();
    actions?.edit_select_com?.(component.comSchemaId);
  }, [actions]);


  type ItemType =
    | { type: DnDTypes.COMMETA; comMeta: { id: number } }
    | { type: DnDTypes.COMSCHEMA; comSchemaId: number };
  // 拖拽放置组件
  const isLayoutComponent = useCallback(() => {
    // 允许接收拖拽组件类型列表
    const layoutComponentTypes = [ComponentTypeEnum.ROOT, ComponentTypeEnum.FLEX];
    return layoutComponentTypes.includes(metadata.componentType);
  }, [metadata.componentType]);

  // 拖拽放置事件处理
  const [{ canDrop, isOverShallow }, dropComItem] = useDrop({
    accept: [DnDTypes.COMMETA, DnDTypes.COMSCHEMA],
    drop: (item: ItemType, monitor) => {
      // 使用shallow选项确保只有最上层的放置目标处理drop事件
      if (isLayoutComponent()) {
        if (monitor.isOver({ shallow: true }) && monitor.canDrop() && monitor.didDrop() === false) {
          let goalID = component.comSchemaId;
          let parChIndex = -1;
          const curCom = findNode(component.comSchemaId);
          if (curCom) {
            const parentCom = findNode(curCom.parentId);
            if (parentCom) {
              // 获取拖拽位置信息
              const clientOffset = monitor.getClientOffset();
              const dropRect = componentRef.current?.getBoundingClientRect();

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
                  let direction = 'row';

                  goalID = parentCom.comSchemaId;
                  parChIndex = parentCom.children.findIndex(child => child.comSchemaId === component.comSchemaId);

                  parentCom.config?.forEach((item, index) => {
                    item.configItem.forEach((configItem) => {
                      if (configItem.field === ConfigItemFieldEnum.flexDirection) {
                        direction = configItem.currentValue as string;
                      }
                    })
                  })
                  if (direction === 'row') {
                    if (relativeX > rightZone) {
                      parChIndex += 1;
                    }
                  } else {
                    if (relativeY > bottomZone) {
                      parChIndex += 1;
                    }
                  }
                }
                // 否则（中心区域），放置到当前组件
              }
            }
          }
          if (item.type === DnDTypes.COMMETA) {
            const comMeta = item as { type: string, comMeta: { id: number } };
            // 生成组件Schema
            const compSchema = generateComSchema(comMeta.comMeta.id, goalID);
            // 拖拽组件到画布时，更新选中组件
            actions.add_component(compSchema, compSchema.parentId, parChIndex);
          } else if (item.type === DnDTypes.COMSCHEMA) {
            const comSchema = item as { type: string, comSchemaId: number };
            // 拖拽组件到组件上时，更新选中组件
            // 如果组件拖到到和自己父组件一样时 往后移动要减去1因为计算了自己的位置
            if (goalID === curCom?.parentId) {
              const parentCom = findNode(curCom.parentId);
              if (parChIndex !== -1) {
                const dragComIndex = parentCom?.children.findIndex(child => child.comSchemaId === component.comSchemaId);
                const dropComIndex = parentCom?.children.findIndex(child => child.comSchemaId === comSchema.comSchemaId);
                if (dropComIndex !== -1 && dragComIndex !== -1 && dragComIndex! >= dropComIndex!) {
                  parChIndex -= 1;
                }
              }
            }
            actions.handle_drag_drop(comSchema.comSchemaId, goalID, parChIndex);
          }
        }
      } else {
        message.error('非布局组件不能接收拖拽组件');
      }
    },
    hover: (item, monitor) => {
      // 使用shallow选项确保只有最上层的放置目标处理hover事件
      // 这样可以实现"上面的识别而下面的不识别"的效果

      if (isLayoutComponent() && monitor.isOver({ shallow: true }) && monitor.canDrop() && monitor.didDrop() === false) {
        // 可以添加视觉反馈
      }
    },
    collect: (monitor) => ({
      canDrop: monitor.canDrop() && isLayoutComponent(),
      isOverShallow: monitor.isOver({ shallow: true })
    })
  });

  // 拖拽组件事件处理
  const [, dragComItem] = useDrag({
    type: DnDTypes.COMSCHEMA,
    canDrag: () => isDragCom,
    item: { type: DnDTypes.COMSCHEMA, comSchemaId: component.comSchemaId },
  });

  const handleDnD = function (ref: React.RefObject<HTMLDivElement | null>) {
    if (!ref.current) return
    // 更新组件级ref，使其指向当前子组件的DOM元素
    componentRef.current = ref.current;
    dropComItem(ref.current);
    dragComItem(ref.current);

    // 如果当前组件被选中，将ref传递给父组件
    if (isSelected && onSetSelectedComponentRef) {
      onSetSelectedComponentRef(component, ref.current);
    }
  }

  // 当选中状态变化时，传递或清除ref
  useEffect(() => {
    if (onSetSelectedComponentRef) {
      if (isSelected && componentRef.current) {
        onSetSelectedComponentRef(component, componentRef.current);
      } else {
        onSetSelectedComponentRef(component, null);
      }
    }
  }, [isSelected, componentRef, component, onSetSelectedComponentRef]);

  // 渲染子组件 - 使用useMemo缓存
  const renderedChildren = useMemo(() => {
    if (!children || children.length === 0) return null;
    return children.map((child) => (
      <RenderComponentContent
        key={child.comSchemaId}
        component={child as ComponentSchema}
        Selected={isSelected}
        onSetSelectedComponentRef={onSetSelectedComponentRef}
      />
    ));
  }, [children.length, isSelected, onSetSelectedComponentRef]);

  // 生成className - 使用useMemo缓存
  const componentClassName = useMemo(() => {
    return `${isSelected ? 'component-preview__selected' : ''} ${canDrop && isOverShallow ? 'component-preview__can-drop' : ''}`;
  }, [isSelected, canDrop, isOverShallow]);

  // 渲染组件内容
  switch (metadata.componentType) {
    case ComponentTypeEnum.FLEX:
      return (
        <Flex
          component={component}
          componentClassName={componentClassName}
          handleDnD={handleDnD}
          handleComponentSelect={handleComponentSelect}
        >{renderedChildren}</Flex>
      );
    case ComponentTypeEnum.TEXT:
      return (
        <Text
          component={component}
          componentClassName={componentClassName}
          handleDnD={handleDnD}
          handleComponentSelect={handleComponentSelect}
        />
      );
    case ComponentTypeEnum.BUTTON:
      return (
        <Button
          component={component}
          componentClassName={componentClassName}
          handleDnD={handleDnD}
          handleComponentSelect={handleComponentSelect}
        />
      );
    case ComponentTypeEnum.IMAGE:
      return (
        <Image
          component={component}
          componentClassName={componentClassName}
          handleDnD={handleDnD}
          handleComponentSelect={handleComponentSelect}
        />
      );
    case ComponentTypeEnum.INPUT:
      return (
        <Input
          component={component}
          componentClassName={componentClassName}
          handleDnD={handleDnD}
          handleComponentSelect={handleComponentSelect}
        />
      );
    default:
      return (
        <Default
          component={component}
          componentClassName={componentClassName}
          handleDnD={handleDnD}
          handleComponentSelect={handleComponentSelect}
        >{renderedChildren}</Default>
      );
  };
};

export default RenderComponentContent;
