import React, { useEffect, useState, useRef, useMemo, useCallback } from "react";
import { ComponentSchema, ComponentTypeEnum } from "@wect/type";
import { useDrop, useDrag, DropTargetMonitor, DragSourceMonitor } from "react-dnd";
import { message } from "antd";
import { DnDTypes } from "@type/DnDTypes";
import useWebsContext from "@context/WebsContext/useWebsContext";

import { generateComSchema, generatePreComSchema } from "@utils/generateComSchema";
import calculateDropPosition from "@utils/calculateDropPosition";
import { isLayoutComponent } from "@utils/componentUtils";
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
}> = React.memo(({ component, Selected, onSetSelectedComponentRef }) => {
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
  }, [actions, component.comSchemaId]);

  // 拖拽放置事件处理
  const [{ canDrop, isOverShallow }, dropComItem] = useDrop({
    accept: [DnDTypes.COMMETA, DnDTypes.COMSCHEMA],
    drop: useCallback((item: any, monitor: DropTargetMonitor) => {
      if (component.comSchemaId === ComTree.PREVIEW_NODE_ID) {
        const curCom = comTree?.findNode(component.comSchemaId);
        const goalID = curCom?.parentId;
        const parCom = comTree?.findNode(curCom?.parentId!);
        const curIndex = parCom?.children?.findIndex((i: any) => i.comSchemaId === component.comSchemaId);
        const parChIndex = curIndex !== -1 ? curIndex : -1;
        if (item.type === DnDTypes.COMMETA) {
          const comMeta = item as { type: string, comMeta: { id: number } };
          // 生成组件Schema
          const comSchema = generateComSchema(comMeta.comMeta.id, goalID!);
          // 添加预览节点到组件树
          actions.add_component(comSchema, goalID!, parChIndex!);
        } else if (item.type === DnDTypes.COMSCHEMA) {
          const comSchema = item as { type: string, comMeta: { comSchemaId: number, commetaID: number } };
          actions.handle_drag_drop(comSchema.comMeta.comSchemaId, goalID!, parChIndex!);
        }
      } else {
        // 使用shallow选项确保只有最上层的放置目标处理drop事件
        if (isLayoutComponent(metadata.componentType) && monitor.isOver({ shallow: true }) && monitor.canDrop() && monitor.didDrop() === false) {
          // 删除预览节点
          if (timerRef.current) {
            clearTimeout(timerRef.current);
          }
          const clientOffset = monitor.getClientOffset();
          const curCom = comTree?.findNode(component.comSchemaId);
          if (!curCom) {
            console.log('拖拽组件到组件上时，更新选中组件', component.comSchemaId);
            return;
          }
          let { goalID, parChIndex } = calculateDropPosition(componentRef, curCom, clientOffset);
          if (item.type === DnDTypes.COMMETA) {
            const comMeta = item as { type: string, comMeta: { id: number } };
            // 生成组件Schema
            const compSchema = generateComSchema(comMeta.comMeta.id, goalID);
            // 拖拽组件到画布时，更新选中组件
            actions.add_component(compSchema, compSchema.parentId, parChIndex);
          } else if (item.type === DnDTypes.COMSCHEMA) {
            const comSchema = item as { type: string, comMeta: { comSchemaId: number, commetaID: number } };
            // 拖拽组件到组件上时，更新选中组件
            // 如果组件拖到到和自己父组件一样时 往后移动要减去1因为计算了自己的位置
            if (goalID === curCom?.parentId) {
              const parentCom = comTree?.findNode(curCom.parentId);
              if (parChIndex !== -1) {
                const dragComIndex = parentCom?.children.findIndex((child: any) => child.comSchemaId === component.comSchemaId);
                const dropComIndex = parentCom?.children.findIndex((child: any) => child.comSchemaId === comSchema.comMeta.comSchemaId);
                if (dropComIndex !== -1 && dragComIndex !== -1 && dragComIndex! >= dropComIndex!) {
                  parChIndex -= 1;
                }
              }
            }
            actions.handle_drag_drop(comSchema.comMeta.comSchemaId, goalID, parChIndex);
          }
        } else {
          if (comTree?.findNode(ComTree.PREVIEW_NODE_ID)) {
            const curCom = state.comTree?.findNode(ComTree.PREVIEW_NODE_ID);
            const goalID = curCom?.parentId;
            const parCom = comTree?.findNode(curCom?.parentId!);
            const curIndex = parCom?.children?.findIndex((i: any) => i.comSchemaId === ComTree.PREVIEW_NODE_ID);
            const parChIndex = curIndex !== -1 ? curIndex : -1;
            if (item.type === DnDTypes.COMMETA) {
              const comMeta = item as { type: string, comMeta: { id: number } };
              // 生成组件Schema
              const comSchema = generateComSchema(comMeta.comMeta.id, goalID!);
              // 添加预览节点到组件树
              actions.add_component(comSchema, goalID!, parChIndex!);
            } else if (item.type === DnDTypes.COMSCHEMA) {
              console.log('拖拽组件到组件上时，更新选中组件', curIndex);
              const comSchema = item as { type: string, comMeta: { comSchemaId: number, commetaID: number } };
              actions.handle_drag_drop(comSchema.comMeta.comSchemaId, goalID!, parChIndex!);
              console.log('拖拽组件到组件上时，更新选中组件', parCom);
            }
          } else {
            message.error('非布局组件不能接收拖拽组件');
          }
        }
      }
    }, [actions, comTree, component.comSchemaId, metadata.componentType]),
    hover: useCallback((item: any, monitor: DropTargetMonitor) => {
      if (component.comSchemaId === ComTree.PREVIEW_NODE_ID) {
        return;
      }
      // 使用shallow选项确保只有最上层的放置目标处理hover事件
      if (isLayoutComponent(metadata.componentType) && monitor.isOver({ shallow: true }) && monitor.canDrop() && monitor.didDrop() === false) {
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
        if (comTree?.findNode(ComTree.PREVIEW_NODE_ID)) {
          actions.remove_preview_node();
        }
        const curCom = comTree?.findNode(component.comSchemaId);
        
        // 检查必要参数
        if (!curCom || !clientOffset || !componentRef.current) {
          return;
        }
        
        let { goalID, parChIndex } = calculateDropPosition(componentRef, curCom, clientOffset);
        
        // 检查目标ID是否有效
        if (goalID === -1) {
          return;
        }
        if (item.type === DnDTypes.COMMETA) {
          const comMeta = item as { type: string, comMeta: { id: number } };
          // 生成组件Schema
          // 使用generatePreComSchema创建预览节点，固定ID为999
          const previewSchema = generatePreComSchema(comMeta.comMeta.id, goalID);
          // 添加预览节点到组件树
          timerRef.current = setTimeout(() => {
            actions.add_component(previewSchema, goalID, parChIndex);
          }, 300);
        }
        else if (item.type === DnDTypes.COMSCHEMA) {
          const comSchema = item as { type: string, comMeta: { comSchemaId: number, commetaID: number } };
          const previewSchema = generatePreComSchema(comSchema.comMeta.commetaID, goalID);
          // 添加预览节点到组件树
          timerRef.current = setTimeout(() => {
            actions.add_component(previewSchema, goalID, parChIndex);
          }, 300);
        }
      }
    }, [actions, comTree, component.comSchemaId, metadata.componentType]),
    canDrop: useCallback(() => {
      const node = comTree?.findNode(component.comSchemaId);
      return !node?.isLocked;
    }, [comTree, component.comSchemaId]),
    collect: useCallback((monitor: DropTargetMonitor) => ({
      canDrop: monitor.canDrop() && isLayoutComponent(metadata.componentType),
      isOverShallow: monitor.isOver({ shallow: true })
    }), [metadata.componentType])
  });

  // 清理定时器
  useEffect(() => {
    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
        timerRef.current = null;
      }
    };
  }, []);

  // 当鼠标离开放置目标时
  useEffect(() => {
    if (!isOverShallow) {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
        timerRef.current = null;
      }
    }
  }, [isOverShallow]);

  // 拖拽组件事件处理
  const [, dragComItem] = useDrag({
    type: DnDTypes.COMSCHEMA,
    canDrag: useCallback(() => {
      const node = comTree.findNode(component.comSchemaId);
      return isDragCom && !node?.isLocked;
    }, [isDragCom, comTree, component.comSchemaId]),
    item: useCallback(() => ({
      type: DnDTypes.COMSCHEMA,
      comMeta: {
        comSchemaId: component.comSchemaId,
        commetaID: component.metadata.componentId
      }
    }), [component.comSchemaId, component.metadata.componentId]),
    end: useCallback((item: any, monitor: DragSourceMonitor) => {
      if (comTree.findNode(ComTree.PREVIEW_NODE_ID)) {
        actions.remove_preview_node();
      }
    }, [actions, comTree])
  });

  // 处理拖拽引用
  const handleDnD = useCallback((ref: React.RefObject<HTMLDivElement | null>) => {
    if (!ref.current) return;
    // 更新组件级ref，使其指向当前子组件的DOM元素
    componentRef.current = ref.current;
    dropComItem(ref.current);
    dragComItem(ref.current);

    // 如果当前组件被选中，将ref传递给父组件
    if (isSelected && onSetSelectedComponentRef) {
      onSetSelectedComponentRef(component, ref.current);
    }
  }, [isSelected, component, onSetSelectedComponentRef]);

  // 当选中状态变化时，传递或清除ref
  useEffect(() => {
    if (onSetSelectedComponentRef) {
      if (isSelected && componentRef.current) {
        onSetSelectedComponentRef(component, componentRef.current);
      } else {
        onSetSelectedComponentRef(component, null);
      }
    }
  }, [isSelected, component, onSetSelectedComponentRef]);

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
  }, [children, isSelected, onSetSelectedComponentRef]);

  // 渲染组件内容
  switch (metadata.componentType) {
    case ComponentTypeEnum.FLEX:
      return (
        <Flex
          component={component}
          componentDep={{ isSelected, canDrop, isOverShallow }}
          handleDnD={handleDnD}
          handleComponentSelect={handleComponentSelect}
        >{renderedChildren}</Flex>
      );
    case ComponentTypeEnum.TEXT:
      return (
        <Text
          component={component}
          componentDep={{ isSelected, canDrop, isOverShallow }}
          handleDnD={handleDnD}
          handleComponentSelect={handleComponentSelect}
        />
      );
    case ComponentTypeEnum.BUTTON:
      return (
        <Button
          component={component}
          componentDep={{ isSelected, canDrop, isOverShallow }}
          handleDnD={handleDnD}
          handleComponentSelect={handleComponentSelect}
        />
      );
    case ComponentTypeEnum.IMAGE:
      return (
        <Image
          component={component}
          componentDep={{ isSelected, canDrop, isOverShallow }}
          handleDnD={handleDnD}
          handleComponentSelect={handleComponentSelect}
        />
      );
    case ComponentTypeEnum.INPUT:
      return (
        <Input
          component={component}
          componentDep={{ isSelected, canDrop, isOverShallow }}
          handleDnD={handleDnD}
          handleComponentSelect={handleComponentSelect}
        />
      );
    default:
      return (
        <Default
          component={component}
          componentDep={{ isSelected, canDrop, isOverShallow }}
          handleDnD={handleDnD}
          handleComponentSelect={handleComponentSelect}
        >{renderedChildren}</Default>
      );
  }
});

// 标识组件的名称 便于调试和分析
RenderComponentContent.displayName = 'RenderComponentContent';

export default RenderComponentContent;
