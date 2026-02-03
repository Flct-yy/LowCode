import React, { useRef, useEffect, useCallback, useState, useMemo } from 'react';
import { type ComponentSchema } from '@wect/type';
import useWebsContext from '@/context/WebsContext/useWebsContext';
import RenderComponentContent from './RenderComponentContent';
import './ComponentPreview.scss';
import { useDrop, useDrag, DragSourceMonitor } from 'react-dnd';
import { DnDTypes } from '@/type/DnDTypes';
import { generateComSchema } from '@/utils/generateComSchema';
import { handleWheel } from '@wect/utils';
import { Button, message } from 'antd';
import { DeleteOutlined, ArrowUpOutlined, ArrowDownOutlined, LockOutlined, UnlockOutlined } from '@ant-design/icons';
import '@scss/variables.scss'


const ComponentPreview: React.FC<{
  comRoot: ComponentSchema;
}> = ({ comRoot }) => {
  const { state, actions } = useWebsContext();
  const { comTree, aspectRatio, selectedComponentId, previewScrollLeft, previewScrollTop, zoomRatio, isSliding, isDragCom } = state;
  const previewRef = useRef<HTMLDivElement>(null);
  const selectedComponentRef = useRef<HTMLDivElement>(null);
  const operationButtonsRef = useRef<HTMLDivElement>(null);

  // 用于跟踪ref变化的状态
  const [selectedComponentRefState, setSelectedComponentRefState] = useState<HTMLDivElement | null>(null);

  type ItemType =
    | { type: DnDTypes.COMMETA; comMeta: { id: number } }
    | { type: DnDTypes.COMSCHEMA; comSchemaId: number };
  const [{ canDrop }, dropComItem] = useDrop({
    accept: [DnDTypes.COMMETA, DnDTypes.COMSCHEMA],
    drop: (item: ItemType, monitor) => {
      let dropped = false;
      // 使用shallow选项确保只有最上层的放置目标处理drop事件
      if (monitor.isOver({ shallow: true }) && monitor.canDrop() && monitor.didDrop() === false) {
        if (item.type === DnDTypes.COMMETA) {
          const comMeta = item as { type: string, comMeta: { id: number } };
          // 生成组件Schema
          const compSchema = generateComSchema(comMeta.comMeta.id, comRoot.comSchemaId);
          // 拖拽组件到画布时，更新选中组件
          actions.add_component(compSchema, comRoot.comSchemaId, -1);
          dropped = true;
        } else if (item.type === DnDTypes.COMSCHEMA) {
          const comSchema = item as { type: string, comSchemaId: number };
          // 拖拽组件到组件上时，更新选中组件
          actions.handle_drag_drop(comSchema.comSchemaId, comRoot.comSchemaId, -1);
          dropped = true;
        }
      }
      return dropped ? { dropped: true } : undefined;
    },
    collect: (monitor) => ({
      canDrop: monitor.canDrop(),
      isOverShallow: monitor.isOver({ shallow: true })
    })
  });
  dropComItem(previewRef.current);
  // 使用 react-dnd 实现画布拖拽
  const [, drag] = useDrag({
    type: DnDTypes.PAGEMOVE,
    item: (monitor: DragSourceMonitor) => {
      // 拖拽开始时获取鼠标位置
      const clientOffset = monitor.getClientOffset();
      return {
        type: DnDTypes.PAGEMOVE,
        startX: clientOffset?.x,
        startY: clientOffset?.y
      };
    },
    canDrag: () => !isDragCom,
    collect: (monitor) => ({
      isDragging: monitor.isDragging()
    })
  });
  drag(previewRef);

  // 使用CSS变量管理画布样式
  const canvasStyle: React.CSSProperties = {
    aspectRatio: aspectRatio,
    transform: `translateY(-50%) scale(${zoomRatio})`,
    transformOrigin: 'center center',
    translate: `${previewScrollLeft}px ${previewScrollTop}px`
  };

  // 鼠标滚轮缩放事件处理
  const handleWheelZoom = (e: React.WheelEvent) => {
    if (isSliding) {
      return;
    } else {
      const newZoomRatio = handleWheel(e, zoomRatio);
      actions.edit_zoom_ratio(newZoomRatio);
    }
  };

  // 组件操作按钮-删除组件 - 使用useCallback缓存
  const handleDeleteComponent = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (selectedComponentId !== -1) {
      if (selectedComponentId === comRoot.comSchemaId) {
        message.error('不能删除根组件');
        return;
      }
      actions.remove_component(selectedComponentId!);
      const comSchemaId = comTree?.findNode(selectedComponentId!)?.parentId;
      actions.edit_select_com(comSchemaId as number);
    }
    message.success('删除组件成功');
  }
  // 组件操作按钮-移动组件 - 使用useCallback缓存
  const handleMoveUpComponent = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (selectedComponentId !== -1) {
      actions.edit_select_com(comTree?.findNode(selectedComponentId!)?.parentId || -1);
    }
  }
  // 组件操作按钮-移动组件 - 使用useCallback缓存
  const handleMoveDownComponent = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (selectedComponentId !== -1) {
      actions.edit_select_com(comTree?.findNode(selectedComponentId!)?.children[0].comSchemaId || -1);
    }
  }
  // 组件操作按钮-锁定组件 - 使用useCallback缓存
  const handleLockComponent = (e: React.MouseEvent) => {
    if (selectedComponentId === comRoot.comSchemaId) {
      message.error('根组件不能锁定');
      return;
    }
    e.stopPropagation();
    if (selectedComponentId !== -1) {
      actions.edit_lock_com(selectedComponentId!);
    }
  }

  // 跨组件传递Ref给选中的组件
  const handleSetSelectedComponentRef = useCallback((component: ComponentSchema, ref: HTMLDivElement | null) => {
    if (component.comSchemaId === selectedComponentId && ref) {
      selectedComponentRef.current = ref;
      setSelectedComponentRefState(ref);
    }
  }, [selectedComponentId, comTree]);

  // 获取选中组件的相对于Root的位置和尺寸信息
  // 不使用useMemo，因为ref.current变化不会触发重渲染
  const getSelectedComponentPosition = () => {
    if (!selectedComponentRef.current) return null;
    if (!previewRef.current) return null;

    // 获取组件在视口中的位置和尺寸
    const componentRect = selectedComponentRef.current;
    // 获取预览容器在视口中的位置
    const componentRoot = previewRef.current;

    // 计算组件相对于预览容器的位置
    const relativeX = (componentRect.offsetLeft - componentRoot.offsetLeft);
    const relativeY = (componentRect.offsetTop);
    return {
      x: relativeX,
      y: relativeY,
      width: componentRect.scrollWidth,
      height: componentRect.scrollHeight,
    };
  };

  // 计算操作按钮组的位置
  const operationButtonsStyle = useMemo(() => {
    // 每次都调用函数获取最新位置
    const position = getSelectedComponentPosition();
    if (!position) {
      return {
        top: '0px',
        left: '0px',
      };
    }
    const containerWidth = previewRef.current?.clientWidth || Infinity;

    const operationButtonsRect = operationButtonsRef.current;
    const buttonHeight = operationButtonsRect?.clientHeight || 0;
    const buttonWidth = operationButtonsRect?.clientWidth || 0;
    return {
      top: `${position.y > buttonHeight ? position.y - buttonHeight : position.y}px`,
      left: `${position.width > buttonWidth ? position.x + position.width - buttonWidth : (position.y > buttonHeight ? (position.x + buttonWidth < containerWidth ? position.x : position.x + position.width - buttonWidth) : (position.x + position.width + buttonWidth < containerWidth ? position.x + position.width : position.x - buttonWidth))}px`,
    };
  }, [selectedComponentRefState]);

  return (
    <div ref={previewRef}
      className={`component-preview__root ${isSliding ? 'component-preview__sliding' : ''} ${canDrop ? 'component-preview__can-drop' : ''}`
      } style={canvasStyle}
      onMouseDown={(e) => {
        e.stopPropagation();
        actions?.edit_select_com?.(comRoot.comSchemaId);
      }}
      onWheel={handleWheelZoom}
    >
      <div ref={operationButtonsRef} className={`preview__com__operation${selectedComponentId !== -1 ? ' active' : ''}`} style={operationButtonsStyle}>
        <Button danger type="primary" icon={<DeleteOutlined />} onClick={handleDeleteComponent} onMouseDown={(e) => e.stopPropagation()} />
        <Button type="primary" icon={<ArrowUpOutlined />} onClick={handleMoveUpComponent} onMouseDown={(e) => e.stopPropagation()} />
        <Button type="primary" icon={<ArrowDownOutlined />} onClick={handleMoveDownComponent} onMouseDown={(e) => e.stopPropagation()} />
        <Button type="primary" icon={comTree?.findNode(selectedComponentId!)?.isLocked ? <UnlockOutlined /> : <LockOutlined />} onClick={handleLockComponent} onMouseDown={(e) => e.stopPropagation()} />
      </div>
      <div className="preview__content">
        <div className="preview__bg"></div>
        {
          comRoot && comRoot.children && comRoot.children.length > 0 && comRoot.children.map((child) => (
            <RenderComponentContent
              key={child.comSchemaId}
              component={child as ComponentSchema}
              Selected={selectedComponentId === child.comSchemaId}
              onSetSelectedComponentRef={handleSetSelectedComponentRef}
            />
          ))
        }
      </div>
    </div>

  );
};

export default ComponentPreview;