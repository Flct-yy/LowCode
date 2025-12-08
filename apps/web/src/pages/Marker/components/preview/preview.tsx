import React, { useRef, useState } from 'react';
import { Slider, InputNumber, Dropdown, Space, Button, Popconfirm, } from 'antd';
import useWebsContext from '@context/WebsContext/useWebsContext';
import { DnDTypes } from '@type/DnDTypes';
import { useDrag, useDrop } from 'react-dnd';
import { handleWheel } from '@wect/utils';
import { generateComSchema } from '@utils/generateComSchema';
import ComponentPreview from './components/ComponentPreview';
import './preview.scss';
import { DeleteOutlined, RedoOutlined } from '@ant-design/icons';


const Preview: React.FC = () => {
  const { state, actions } = useWebsContext();
  const { metadata, components, showIframe, selectedComponentId, aspectRatio, zoomRatio, previewScrollTop, previewScrollLeft } = state;
  const previewContainerRef = useRef<HTMLDivElement>(null);
  const previewRef = useRef<HTMLDivElement>(null);

  // 鼠标滚轮缩放事件处理
  const handleWheelZoom = (e: React.WheelEvent) => {
    const newZoomRatio = handleWheel(e, zoomRatio);
    actions.edit_zoom_ratio(newZoomRatio);
  };

  // 使用 react-dnd 实现画布拖拽
  const [, drag] = useDrag({
    type: DnDTypes.PAGEMOVE,
    item: (monitor) => {
      // 拖拽开始时获取鼠标位置
      const clientOffset = monitor.getClientOffset();
      return {
        type: DnDTypes.PAGEMOVE,
        startX: clientOffset?.x,
        startY: clientOffset?.y
      };
    },

    collect: (monitor) => ({
      isDragging: monitor.isDragging()
    })
  });
  // 画布拖拽事件处理
  const [, dropPageMove] = useDrop({
    accept: DnDTypes.PAGEMOVE,
    drop: (item: { type: string, startX: number, startY: number }, monitor) => {
      if (monitor.canDrop()) {
        // 刚开始拖拽鼠标对画布中心点的偏移量
        // 缩放时画布中心点距离容器的中心点距离不变
        const offsetX = item.startX! - previewContainerRef.current!.offsetLeft - previewContainerRef.current!.clientWidth / 2 - previewScrollLeft;
        const offsetY = item.startY! - previewContainerRef.current!.offsetTop - previewContainerRef.current!.clientHeight / 2 - previewScrollTop;

        // x, y 是鼠标在浏览器中的坐标
        const { x, y } = monitor.getClientOffset()!;

        // PreviewScroll算出的是当前鼠标距离预览容器中心的偏移量
        const PreviewScrollTop = y - previewContainerRef.current!.offsetTop - previewContainerRef.current!.clientHeight / 2;
        const PreviewScrollLeft = x - previewContainerRef.current!.offsetLeft - previewContainerRef.current!.clientWidth / 2;

        actions.edit_preview_scroll(PreviewScrollTop - offsetY, PreviewScrollLeft - offsetX);
      }
    },
    collect: (monitor) => ({
      canDrop: monitor.canDrop()
    })
  });

  // 空白画布组件拖拽事件处理
  const [, dropComItem] = useDrop({
    accept: DnDTypes.COMITEM,
    drop: (item: { type: string, comp: { id: number }, originalIndex: number }, monitor) => {
      if (monitor.canDrop()) {
        // 生成组件
        const compSchema = generateComSchema(item.comp.id, metadata.id);
        // 拖拽组件到画布时，更新选中组件
        actions.add_component(compSchema);
      }
    },
    canDrop: (item, monitor) => {
      // 只有当没有其他组件级别的Drop目标时才允许放置
      return monitor.isOver({ shallow: true });
    },
    collect: (monitor) => ({
      canDrop: monitor.canDrop()
    })
  });
  // 应用拖拽 ref 到预览元素
  dropPageMove(previewContainerRef);
  dropComItem(drag(previewRef));

  // 缩放比例输入框
  const handleZoom = (value: number) => {
    // 限制缩放比例范围
    const floorValue = Math.floor(value * 10) / 10;
    const clampedValue = Math.max(0.1, Math.min(3.0, floorValue));
    actions.edit_zoom_ratio(clampedValue);
  };

  // 缩放比例 和 宽高比例 选择器
  const zoomRatioIItems = [
    {
      key: '1',
      label: (
        <Slider
          min={0.1}
          max={3.0}
          step={0.1}
          onChange={(value) => handleZoom(value || 0)}
          value={zoomRatio || 0}
        />
      ),
    },
    {
      key: '1',
      label: (

        <InputNumber
          min={0.1}
          max={3.0}
          step={0.1}
          precision={1}

          style={{ margin: '0 16px' }}
          value={zoomRatio}
          onChange={(value) => handleZoom(value || 0)}
        />
      ),
    },
  ];
  const aspectRatioItems = [
    {
      key: '1',
      label: (
        <div style={{ width: '100%', textAlign: 'center' }} onClick={() => actions.edit_aspect_ratio(16 / 9)}>16 : 9</div>
      ),
    },
    {
      key: '2',
      label: (
        <div style={{ width: '100%', textAlign: 'center' }} onClick={() => actions.edit_aspect_ratio(9 / 16)}>9 : 16</div>
      ),
    },
    {
      key: '3',
      label: (
        <div style={{ width: '100%', textAlign: 'center' }} onClick={() => actions.edit_aspect_ratio(4 / 3)}>4 : 3</div>
      ),
    },
    {
      key: '4',
      label: (
        <div style={{ width: '100%', textAlign: 'center' }} onClick={() => actions.edit_aspect_ratio(3 / 4)}>3 : 4</div>
      ),
    },
    {
      key: '5',
      label: (
        <div style={{ width: '100%', textAlign: 'center' }} onClick={() => actions.edit_aspect_ratio(1)}>1 : 1</div>
      ),
    },
  ];
  // 重置画布位置缩放
  const confirm = () => {
    actions.edit_zoom_ratio(1);
    actions.edit_aspect_ratio(16 / 9);
    actions.edit_preview_scroll(0, 0);
  };
  // 组件操作按钮-删除组件
  const handleDeleteComponent = () => {
    if (selectedComponentId !== -1) {
      actions.remove_component(selectedComponentId!);
    }
  };
  return (
    <div className='preview__container' ref={previewContainerRef}>
      <div className='preview__operation'>
        <Dropdown menu={{ items: zoomRatioIItems }}>
          <Button onClick={(e) => e.preventDefault()} style={{ margin: '0 6px' }}>
            <Space>
              缩放比例
            </Space>
          </Button>
        </Dropdown>

        <Dropdown menu={{ items: aspectRatioItems }}>
          <Button onClick={(e) => e.preventDefault()} style={{ margin: '0 6px' }}>
            <Space>
              宽高比例
            </Space>
          </Button>
        </Dropdown>

        <Popconfirm
          placement="bottom"
          title="重置画布位置缩放"
          description="是否重置画布位置缩放？"
          onConfirm={confirm}
          okText="Yes"
          cancelText="No"
        >
          <Button danger
            icon={<RedoOutlined />}
          ></Button>
        </Popconfirm>
      </div>
      <div className="preview"
        ref={previewRef}
        style={{
          aspectRatio: aspectRatio,
          transform: `translateY(-50%) scale(${zoomRatio})`,
          transformOrigin: 'center center',
          translate: `${previewScrollLeft}px ${previewScrollTop}px`
        }}
        onWheelCapture={handleWheelZoom}
      >
        {/* 画布背景网格 */}
        <div className="preview__bg" />
        {/* 组件渲染区域 */}
        <div style={{ position: 'relative', zIndex: 1 }}>
          {components.map((compSchema) => (
            <ComponentPreview key={compSchema.comSchemaId} compSchema={compSchema} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default Preview;