import React, { useRef } from "react";
import ComponentPreview from "./ComponentPreview";
import { ComponentSchema, ComponentTypeEnum } from "@type/ComponentSchema";
import getConfigText from "@utils/getConfigText";
import { useDrop } from "react-dnd";
import { DnDTypes } from "@type/DnDTypes";
import useWebsContext from "@context/WebsContext/useWebsContext";
import { generateComSchema } from "@utils/generateComSchema";



// 递归渲染子组件函数
const renderChildren = (children: ComponentSchema[] | undefined): React.ReactNode => {
  if (!children || children.length === 0) {
    return null;
  }

  return (
    <div className="component-preview__children">
      {children.map((child) => (
        <ComponentPreview key={child.comSchemaId} comRoot={child} />
      ))}
    </div>
  );
};

// 根据组件类型渲染不同的DOM元素
const renderComponentContent = (component: ComponentSchema, style: React.CSSProperties): React.ReactNode => {
  const { metadata, config, children } = component;
  const { state, actions } = useWebsContext();
  const dropRef = useRef<HTMLDivElement>(null);
  const { comTree,aspectRatio } = state;
  const text = getConfigText(config);

  // 拖拽放置事件处理
  const [{ canDrop }, dropComItem] = useDrop({
    accept: DnDTypes.COMITEM,
    drop: (item: { type: string, comp: { id: number }, originalIndex: number }, monitor) => {
      console.log(comTree.root);
      
      if (monitor.canDrop() && monitor.didDrop() === false) {

        // 生成组件
        const compSchema = generateComSchema(item.comp.id, component.comSchemaId);
        // 拖拽组件到画布时，更新选中组件
        actions.add_component(compSchema, component.comSchemaId);
        return { dropped: true };
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
  dropComItem(dropRef.current);


  // 渲染组件内容
  const renderContent = () => {
    switch (metadata.componentType) {
      case ComponentTypeEnum.ROOT:
        return (
          <div className={`component-preview__root ${canDrop ? 'component-preview__can-drop' : ''}`} style={{ ...style, aspectRatio: aspectRatio }}>
            {text !== '' && text}
            {children && children.length > 0 && renderChildren(children)}
          </div>
        );
      case ComponentTypeEnum.FLEX:
        return (
          <div className={`component-preview__flex ${canDrop ? 'component-preview__can-drop' : ''}`} style={style}>
            {text !== '' && text}
            {renderChildren(children)}
          </div>
        );
      default:
        return (
          <div className="component-preview__default" style={style}>
            {text && <div className="component-preview__text">{text}</div>}
            {renderChildren(children)}
          </div>
        );
    }
  };

  return (
    <div ref={dropRef} className="component-preview__drop-area">
      {renderContent()}
    </div>
  );
};

export default renderComponentContent;