import { ComponentTypeEnum } from "../ComponentSchema";
import { ComponentsConfig, ConfigAreaEnum } from "../Config";
import { ConfigItem, UiTypeEnum } from "../ConfigItem";

export const MenuItemFieldEnum = {
  menu_backgroundColor: 'menu.backgroundColor',
  menu_MarginPadding: 'menu.MarginPadding',
  menu_borderColor: 'menu.borderColor',
  menu_borderWidth: 'menu.borderWidth',
  menu_borderRadius: 'menu.borderRadius',
  menu_borderStyle: 'menu.borderStyle',
  menu_width: 'menu.width',
  menu_height: 'menu.height',
  menu_disabled: 'menu.disabled',
  menu_items: 'menu.items',
};

export const MenuConfigItem: ConfigItem[] = [
  // 背景颜色
  {
    field: MenuItemFieldEnum.menu_backgroundColor,
    label: '背景颜色',
    uiType: UiTypeEnum.COLOR_PICKER,
    defaultValue: '#ffffff',
    currentValue: '#ffffff',
  },
  // 边距
  {
    field: MenuItemFieldEnum.menu_MarginPadding,
    label: '边距',
    uiType: UiTypeEnum.MARGIN_PADDING,
    defaultValue: {
      margin: {
        top: 0,
        right: 0,
        bottom: 0,
        left: 0,
      },
      padding: {
        top: 0,
        right: 0,
        bottom: 0,
        left: 0,
      },
    },
    currentValue: {
      margin: {
        top: 0,
        right: 0,
        bottom: 0,
        left: 0,
      },
      padding: {
        top: 0,
        right: 0,
        bottom: 0,
        left: 0,
      },
    },
    unit: 'px',
  },
  // 边框颜色
  {
    field: MenuItemFieldEnum.menu_borderColor,
    label: '边框颜色',
    uiType: UiTypeEnum.COLOR_PICKER,
    defaultValue: '#d9d9d9',
    currentValue: '#d9d9d9',
  },
  // 边框宽度
  {
    field: MenuItemFieldEnum.menu_borderWidth,
    label: '边框宽度',
    uiType: UiTypeEnum.INPUT_NUMBER,
    defaultValue: 1,
    currentValue: 1,
    min: 0,
    max: 10,
    step: 1,
    unit: 'px',
  },
  // 边框圆角
  {
    field: MenuItemFieldEnum.menu_borderRadius,
    label: '边框圆角',
    uiType: UiTypeEnum.INPUT_NUMBER,
    defaultValue: 4,
    currentValue: 4,
    min: 0,
    max: 50,
    step: 1,
    unit: 'px',
  },
  // 边框样式
  {
    field: MenuItemFieldEnum.menu_borderStyle,
    label: '边框样式',
    uiType: UiTypeEnum.GROUP,
    defaultValue: 'solid',
    currentValue: 'solid',
    options: [
      { label: '实线', value: 'solid' },
      { label: '虚线', value: 'dashed' },
      { label: '点线', value: 'dotted' },
      { label: '双实线', value: 'double' },
    ],
  },
  // 宽度
  {
    field: MenuItemFieldEnum.menu_width,
    label: '宽度',
    uiType: UiTypeEnum.INPUT_NUMBER,
    defaultValue: 300,
    currentValue: 300,
    step: 1,
    currentUnit: 'px',
    units: [
      { label: 'px', value: 'px' },
      { label: '%', value: '%' },
      { label: 'auto', value: 'auto' },
    ],
    mins: [0, 0, 0],
    maxs: [1000, 100, 0],
  },
  // 高度
  {
    field: MenuItemFieldEnum.menu_height,
    label: '高度',
    uiType: UiTypeEnum.INPUT_NUMBER,
    defaultValue: 40,
    currentValue: 40,
    step: 1,
    currentUnit: 'px',
    units: [
      { label: 'px', value: 'px' },
      { label: '%', value: '%' },
      { label: 'auto', value: 'auto' },
    ],
    mins: [0, 0, 0],
    maxs: [1000, 100, 0],
  },
  // 禁用
  {
    field: MenuItemFieldEnum.menu_disabled,
    label: '禁用',
    uiType: UiTypeEnum.GROUP,
    defaultValue: false,
    currentValue: false,
    options: [
      { label: '启用', value: false },
      { label: '禁用', value: true },
    ],
  },
  // 菜单项配置
  {
    field: MenuItemFieldEnum.menu_items,
    label: '菜单项配置',
    uiType: UiTypeEnum.TEXTAREA,
    defaultValue: JSON.stringify([
      { title: '首页', key: 'home', active: true },
      { title: '产品', key: 'products', active: false },
      { title: '服务', key: 'services', active: false },
      { title: '关于我们', key: 'about', active: false },
      { title: '联系我们', key: 'contact', active: false },
    ], null, 2),
    currentValue: JSON.stringify([
      { title: '首页', key: 'home', active: true },
      { title: '产品', key: 'products', active: false },
      { title: '服务', key: 'services', active: false },
      { title: '关于我们', key: 'about', active: false },
      { title: '联系我们', key: 'contact', active: false },
    ], null, 2),
    placeholder: '请输入JSON格式的菜单项配置',
  },
];

export const MenuConfigList: ComponentsConfig = {
  componentName: 'Menu',
  componentType: ComponentTypeEnum.MENU,
  config: [
    {
      areaName: ConfigAreaEnum.layout,
      configItem: [
        MenuItemFieldEnum.menu_backgroundColor,
        MenuItemFieldEnum.menu_MarginPadding,
      ]
    },
    {
      areaName: ConfigAreaEnum.regular,
      configItem: [
        MenuItemFieldEnum.menu_width,
        MenuItemFieldEnum.menu_height,
        MenuItemFieldEnum.menu_disabled,
      ]
    },
    {
      areaName: ConfigAreaEnum.border,
      configItem: [
        MenuItemFieldEnum.menu_borderColor,
        MenuItemFieldEnum.menu_borderWidth,
        MenuItemFieldEnum.menu_borderRadius,
        MenuItemFieldEnum.menu_borderStyle,
      ]
    },
    {
      areaName: ConfigAreaEnum.content,
      configItem: [
        MenuItemFieldEnum.menu_items,
      ]
    },
  ],
};