import React, { useEffect, useState, useRef, useMemo, useCallback } from "react";
import { ComponentSchema, ComponentTypeEnum } from "@wect/type";
import { useDrop, useDrag } from "react-dnd";
import { message } from "antd";
import { DnDTypes } from "@type/DnDTypes";
import useWebsContext from "@context/WebsContext/useWebsContext";
import { findNode } from "@wect/type";
import { generateComSchema, generatePreComSchema } from "@utils/generateComSchema";
import calculateDropPosition from "@utils/calculateDropPosition";
import { Default, Flex, Text, Image, Button, Input } from '@wect/components';
import { ComTree } from '@wect/type';
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
  const { comTree, selectedComponentId, isDragCom } = state;


  // 是否选中
  const [isSelected, setIsSelected] = useState(Selected || selectedComponentId === component.comSchemaId);
  useEffect(() => {
    setIsSelected(Selected || selectedComponentId === component.comSchemaId);
  }, [selectedComponentId, Selected]);

  // 组件级ref，用于获取DOM元素进行拖拽位置计算
  const componentRef = useRef<HTMLDivElement | null>(null);
  // 定时器ref，用于存储防抖定时器ID
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  // 用于存储上一次鼠标位置的引用
  const lastMousePositionRef = useRef<{ x: number; y: number } | null>(null);

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
      if (component.comSchemaId === ComTree.PREVIEW_NODE_ID) {
        const curCom = findNode(component.comSchemaId);
        const goalID = curCom?.parentId;
        const parCom = findNode(curCom?.parentId!);
        const curIndex = parCom?.children?.findIndex((item) => item.comSchemaId === component.comSchemaId);
        const parChIndex = curIndex !== -1 ? curIndex : -1;
        if (item.type === DnDTypes.COMMETA) {
          const comMeta = item as { type: string, comMeta: { id: number } };
          // 生成组件Schema
          const comSchema = generateComSchema(comMeta.comMeta.id, goalID!);
          // 添加预览节点到组件树
          actions.add_component(comSchema, goalID!, parChIndex!);
        }
        actions.remove_preview_node();
      } else {
        // 使用shallow选项确保只有最上层的放置目标处理drop事件
        if (isLayoutComponent()) {
          if (monitor.isOver({ shallow: true }) && monitor.canDrop() && monitor.didDrop() === false) {
            // 删除预览节点
            if (timerRef.current) {
              clearTimeout(timerRef.current);
            }
            const clientOffset = monitor.getClientOffset();
            const curCom = findNode(component.comSchemaId);
            let { goalID, parChIndex } = calculateDropPosition(componentRef, curCom, clientOffset);

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
            if (findNode(ComTree.PREVIEW_NODE_ID)) {
              actions.remove_preview_node();
            }
          }
        } else {
          if (findNode(ComTree.PREVIEW_NODE_ID)) {
            const curCom = findNode(component.comSchemaId);
            const goalID = curCom?.parentId;
            const parCom = findNode(curCom?.parentId!);
            const curIndex = parCom?.children?.findIndex((item) => item.comSchemaId === component.comSchemaId);
            const parChIndex = curIndex !== -1 ? curIndex : -1;
            if (item.type === DnDTypes.COMMETA) {
              const comMeta = item as { type: string, comMeta: { id: number } };
              // 生成组件Schema
              const comSchema = generateComSchema(comMeta.comMeta.id, goalID!);
              // 添加预览节点到组件树
              actions.add_component(comSchema, goalID!, parChIndex!);
            }
            actions.remove_preview_node();
          } else {
            message.error('非布局组件不能接收拖拽组件');
          }
        }
      }
    },
    hover: (item, monitor) => {
      if (component.comSchemaId === ComTree.PREVIEW_NODE_ID) {
        return;
      }
      // 使用shallow选项确保只有最上层的放置目标处理hover事件
      // 这样可以实现"上面的识别而下面的不识别"的效果
      if (isLayoutComponent() && monitor.isOver({ shallow: true }) && monitor.canDrop() && monitor.didDrop() === false) {
        const clientOffset = monitor.getClientOffset();

        // 检查鼠标是否移动到了新的位置
        if (lastMousePositionRef.current && clientOffset) {
          const { x, y } = lastMousePositionRef.current;
          // 如果鼠标位置没有变化，直接返回
          if (Math.abs(x - clientOffset.x) < 1 && Math.abs(y - clientOffset.y) < 1) {
            return;
          }
        }

        // 更新鼠标位置记录
        if (clientOffset) {
          lastMousePositionRef.current = { x: clientOffset.x, y: clientOffset.y };
        }
        // 鼠标移动时，删除旧定时器并重新计时
        if (timerRef.current) {
          clearTimeout(timerRef.current);
          timerRef.current = null;
        }
        if (findNode(ComTree.PREVIEW_NODE_ID)) {
          actions.remove_preview_node();
        }
        const curCom = findNode(component.comSchemaId);
        const { goalID, parChIndex } = calculateDropPosition(componentRef, curCom, clientOffset);
        if (item.type === DnDTypes.COMMETA) {
          const comMeta = item as { type: string, comMeta: { id: number } };
          // 生成组件Schema
          // 使用generatePreComSchema创建预览节点，固定ID为999
          const previewSchema = generatePreComSchema(comMeta.comMeta.id, goalID);
          // 添加预览节点到组件树
          timerRef.current = setTimeout(() => {
            actions.add_component(previewSchema, goalID, parChIndex);
          }, 200);
        }
        // else if (item.type === DnDTypes.COMSCHEMA) {
        //   const comSchema = item as { type: string, comSchemaId: number };
        //   // 拖拽组件到组件上时，更新选中组件
        //   // 如果组件拖到到和自己父组件一样时 往后移动要减去1因为计算了自己的位置
        //   if (goalID === curCom?.parentId) {
        //     const parentCom = findNode(curCom.parentId);
        //     if (parChIndex !== -1) {
        //       const dragComIndex = parentCom?.children.findIndex(child => child.comSchemaId === component.comSchemaId);
        //       const dropComIndex = parentCom?.children.findIndex(child => child.comSchemaId === comSchema.comSchemaId);
        //       if (dropComIndex !== -1 && dragComIndex !== -1 && dragComIndex! >= dropComIndex!) {
        //         parChIndex -= 1;
        //       }
        //     }
        //   }
        //   actions.handle_drag_drop(comSchema.comSchemaId, goalID, parChIndex);
        // }
      }
    },
    canDrop: () => !findNode(component.comSchemaId)?.isLocked,
    collect: (monitor) => ({
      canDrop: monitor.canDrop() && isLayoutComponent(),
      isOverShallow: monitor.isOver({ shallow: true })
    })
  });
  useEffect(() => {
    // 当鼠标离开放置目标时
    if (!isOverShallow) {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
        timerRef.current = null;
      }
    }
  }, [isOverShallow, actions]); // 监听isOverShallow状态变化

  // 拖拽组件事件处理
  const [, dragComItem] = useDrag({
    type: DnDTypes.COMSCHEMA,
    canDrag: () => isDragCom && !findNode(component.comSchemaId)?.isLocked,
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
  }, [children, isSelected, onSetSelectedComponentRef, JSON.stringify(children)]);

  // 生成className - 使用useMemo缓存
  const componentClassName = useMemo(() => {
    return `${isSelected ? 'component-preview__selected' : ''} ${canDrop && isOverShallow && component.comSchemaId !== ComTree.PREVIEW_NODE_ID ? 'component-preview__can-drop' : ''}`;
  }, [isSelected, canDrop, isOverShallow, component.comSchemaId]);

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
