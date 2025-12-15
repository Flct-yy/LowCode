import type { TotesConfig } from "./Config";

// 组件类别枚举
export enum ComponentCategoryEnum {
  // 根组件
  ROOT = 'root',
  VIRTUAL = 'virtual',
  // 布局组件
  LAYOUT = 'layout',
  // // 基础组件
  // BASIC = 'basic',
  // // 表单组件
  // FORM = 'form',
  // // 显示组件
  // DISPLAY = 'display',
  // // 高级组件
  // ADVANCED = 'advanced'
}

// 组件类型枚举
export enum ComponentTypeEnum {
  // 根组件
  ROOT = 'Root',
  VIRTUAL = 'Virtual',
  // 布局组件
  FLEX = 'Flex',
  // BUTTON = 'Button',
  // INPUT = 'Input',
  // IMAGE = 'Image',
  // TEXT = 'Text',
  // SELECT = 'Select',
  // RADIO = 'Radio',
  // CHECKBOX = 'Checkbox'
}

/**
 * 组件元信息
 */
export interface ComponentMetadata {
  componentId: number; // 组件唯一标识
  componentName: string; // 组件名称
  componentType: ComponentTypeEnum; // 组件类型
  category: ComponentCategoryEnum; // 组件类别
  tags: string[]; // 组件标签
  version: string; // 组件版本
  description?: string; // 组件描述
  icon?: string; // 组件图标
}

/**
 * 组件位置信息
 */
export interface ComponentPosition {
  x: number; // X坐标
  y: number; // Y坐标
  position: 'static' | 'relative' | 'absolute' | 'fixed'; // 定位方式
  zIndex?: number; // 层级
}

/**
 * 低代码组件的完整数据结构
 */
export interface ComponentSchema {
  comSchemaId: number; // 组件实例唯一标识
  metadata: ComponentMetadata; // 组件元信息
  position?: ComponentPosition; // 组件位置信息
  config: TotesConfig[]; // 组件配置项
  children: ComponentSchema[]; // 子组件列表
  parentId: number; // 父组件ID
  isLocked?: boolean; // 是否锁定
  isVisible?: boolean; // 是否可见
}