import React, { useRef, useMemo, useEffect } from 'react';
import { ComponentSchema, ComTree } from '@wect/type';
import { convertConfigToStyle } from '@/utils/convertConfigToStyle';
import { getConfigValue } from '@/utils/index';
import '@/scss/preview.scss';

function Menu({
  component,
  componentDep,
  handleDnD,
  handleComponentSelect,
}: {
  component: ComponentSchema;
  componentDep?: { isSelected: boolean, canDrop: boolean, isOverShallow: boolean };
  handleDnD?: (ref: React.RefObject<HTMLDivElement | null>) => void;
  handleComponentSelect?: (e: React.MouseEvent) => void;
}) {
  const divRef = useRef<HTMLDivElement>(null);

  // 处理拖拽 - 移到useEffect中避免渲染期间状态更新
  useEffect(() => {
    handleDnD?.(divRef);
  }, [handleDnD]);

  // 转换组件配置为 内联样式和类名
  const { isSelected, canDrop, isOverShallow } = componentDep || {}
  const { style: inlineStyle, className } = convertConfigToStyle(component)
  const newClassName = useMemo(() => {
    return `${isSelected ? 'component-preview__selected' : ''} ${canDrop && isOverShallow && component.comSchemaId !== ComTree.PREVIEW_NODE_ID ? 'component-preview__can-drop' : ''} ${className} ${component.comSchemaId === ComTree.PREVIEW_NODE_ID ? 'component-preview__pre' : ''}`
  }, [isSelected, canDrop, isOverShallow, className, component.comSchemaId])

  // 从配置中获取菜单项信息
  const menuItemsConfig = getConfigValue<string | any[]>(component.config, 'items');
  let menuItems: any[] = [];

  try {
    // 尝试解析JSON字符串
    if (typeof menuItemsConfig === 'string') {
      menuItems = JSON.parse(menuItemsConfig);
    } else if (Array.isArray(menuItemsConfig)) {
      menuItems = menuItemsConfig;
    } else {
      // 默认菜单项
      menuItems = [
        { title: '首页', key: 'home', active: true },
        { title: '产品', key: 'products', active: false },
        { title: '服务', key: 'services', active: false },
        { title: '关于我们', key: 'about', active: false },
        { title: '联系我们', key: 'contact', active: false },
      ];
    }
  } catch (error) {
    // 解析失败时使用默认菜单项
    menuItems = [
      { title: '首页', key: 'home', active: true },
      { title: '产品', key: 'products', active: false },
      { title: '服务', key: 'services', active: false },
      { title: '关于我们', key: 'about', active: false },
      { title: '联系我们', key: 'contact', active: false },
    ];
  }

  return (
    <div
      ref={divRef}
      className={`component-preview__default component__menu ${newClassName}`}
      style={inlineStyle}
      onMouseDown={(e) => handleComponentSelect?.(e)}
    >
      <div className="component__menu-content">
        <ul>
          {menuItems.map((item, index) => (
            <li 
              key={item.key || index} 
              className={`component__menu-item ${item.active ? 'component__menu-item--active' : ''}`}
            >
              {item.title}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export { Menu };