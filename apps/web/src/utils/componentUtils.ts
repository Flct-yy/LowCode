import { ComponentTypeEnum } from "@wect/type";

/**
 * 检查组件是否为布局组件（可以接收拖拽组件的组件）
 * @param componentType 组件类型
 * @returns 是否为布局组件
 */
export const isLayoutComponent = (componentType: ComponentTypeEnum): boolean => {
  // 允许接收拖拽组件类型列表
  const layoutComponentTypes = [ComponentTypeEnum.ROOT, ComponentTypeEnum.FLEX];
  return layoutComponentTypes.includes(componentType);
};

/**
 * 检查组件是否为容器组件
 * @param componentType 组件类型
 * @returns 是否为容器组件
 */
export const isContainerComponent = (componentType: ComponentTypeEnum): boolean => {
  const containerComponentTypes = [ComponentTypeEnum.ROOT, ComponentTypeEnum.FLEX];
  return containerComponentTypes.includes(componentType);
};

/**
 * 检查组件是否为基础组件
 * @param componentType 组件类型
 * @returns 是否为基础组件
 */
export const isBasicComponent = (componentType: ComponentTypeEnum): boolean => {
  const basicComponentTypes = [ComponentTypeEnum.TEXT, ComponentTypeEnum.BUTTON, ComponentTypeEnum.IMAGE, ComponentTypeEnum.INPUT];
  return basicComponentTypes.includes(componentType);
};