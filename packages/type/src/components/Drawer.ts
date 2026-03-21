import { ComponentTypeEnum } from "../ComponentSchema";
import { ComponentsConfig, ConfigAreaEnum } from "../Config";
import { ConfigItem, UiTypeEnum } from "../ConfigItem";

export const DrawerItemFieldEnum = {
  drawer_backgroundColor: 'drawer.backgroundColor',
  drawer_MarginPadding: 'drawer.MarginPadding',
  drawer_borderColor: 'drawer.borderColor',
  drawer_borderWidth: 'drawer.borderWidth',
  drawer_borderRadius: 'drawer.borderRadius',
  drawer_borderStyle: 'drawer.borderStyle',
  drawer_width: 'drawer.width',
  drawer_height: 'drawer.height',
  drawer_title: 'drawer.title',
  drawer_content: 'drawer.content',
  drawer_placement: 'drawer.placement',
  drawer_fontSize: 'drawer.fontSize',
  drawer_color: 'drawer.color',
  drawer_buttonText: 'drawer.buttonText',
  drawer_buttonBackgroundColor: 'drawer.buttonBackgroundColor',
  drawer_buttonColor: 'drawer.buttonColor',
  drawer_buttonBorderColor: 'drawer.buttonBorderColor',
  drawer_buttonBorderWidth: 'drawer.buttonBorderWidth',
  drawer_buttonBorderRadius: 'drawer.buttonBorderRadius',
  drawer_buttonPadding: 'drawer.buttonPadding',
};

export const DrawerConfigItem: ConfigItem[] = [
  // 背景颜色
  {
    field: DrawerItemFieldEnum.drawer_backgroundColor,
    label: '背景颜色',
    uiType: UiTypeEnum.COLOR_PICKER,
    defaultValue: '#ffffff',
    currentValue: '#ffffff',
  },
  // 边距
  {
    field: DrawerItemFieldEnum.drawer_MarginPadding,
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
    field: DrawerItemFieldEnum.drawer_borderColor,
    label: '边框颜色',
    uiType: UiTypeEnum.COLOR_PICKER,
    defaultValue: '#d9d9d9',
    currentValue: '#d9d9d9',
  },
  // 边框宽度
  {
    field: DrawerItemFieldEnum.drawer_borderWidth,
    label: '边框宽度',
    uiType: UiTypeEnum.INPUT_NUMBER,
    defaultValue: 0,
    currentValue: 0,
    min: 0,
    max: 10,
    step: 1,
    unit: 'px',
  },
  // 边框圆角
  {
    field: DrawerItemFieldEnum.drawer_borderRadius,
    label: '边框圆角',
    uiType: UiTypeEnum.INPUT_NUMBER,
    defaultValue: 0,
    currentValue: 0,
    min: 0,
    max: 50,
    step: 1,
    unit: 'px',
  },
  // 边框样式
  {
    field: DrawerItemFieldEnum.drawer_borderStyle,
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
    field: DrawerItemFieldEnum.drawer_width,
    label: '抽屉宽度',
    uiType: UiTypeEnum.INPUT_NUMBER,
    defaultValue: 300,
    currentValue: 300,
    min: 100,
    max: 1000,
    step: 1,
    unit: 'px',
  },
  // 高度
  {
    field: DrawerItemFieldEnum.drawer_height,
    label: '抽屉高度',
    uiType: UiTypeEnum.INPUT_NUMBER,
    defaultValue: 'auto',
    currentValue: 'auto',
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
  // 抽屉标题
  {
    field: DrawerItemFieldEnum.drawer_title,
    label: '抽屉标题',
    uiType: UiTypeEnum.INPUT,
    placeholder: '请输入抽屉标题',
    defaultValue: '抽屉标题',
    currentValue: '抽屉标题',
  },
  // 抽屉内容
  {
    field: DrawerItemFieldEnum.drawer_content,
    label: '抽屉内容',
    uiType: UiTypeEnum.TEXTAREA,
    placeholder: '请输入抽屉内容',
    defaultValue: '抽屉内容',
    currentValue: '抽屉内容',
  },
  // 抽屉方向
  {
    field: DrawerItemFieldEnum.drawer_placement,
    label: '抽屉方向',
    uiType: UiTypeEnum.GROUP,
    defaultValue: 'right',
    currentValue: 'right',
    options: [
      { label: '右侧', value: 'right' },
      { label: '左侧', value: 'left' },
      { label: '顶部', value: 'top' },
      { label: '底部', value: 'bottom' },
    ],
  },
  // 字体大小
  {
    field: DrawerItemFieldEnum.drawer_fontSize,
    label: '字体大小',
    uiType: UiTypeEnum.INPUT_NUMBER,
    defaultValue: 14,
    currentValue: 14,
    min: 0,
    max: 100,
    step: 1,
    unit: 'px',
  },
  // 字体颜色
  {
    field: DrawerItemFieldEnum.drawer_color,
    label: '字体颜色',
    uiType: UiTypeEnum.COLOR_PICKER,
    defaultValue: '#333333',
    currentValue: '#333333',
  },
  // 按钮文本
  {
    field: DrawerItemFieldEnum.drawer_buttonText,
    label: '按钮文本',
    uiType: UiTypeEnum.INPUT,
    placeholder: '请输入按钮文本',
    defaultValue: '打开抽屉',
    currentValue: '打开抽屉',
  },
  // 按钮背景颜色
  {
    field: DrawerItemFieldEnum.drawer_buttonBackgroundColor,
    label: '按钮背景颜色',
    uiType: UiTypeEnum.COLOR_PICKER,
    defaultValue: '#1890ff',
    currentValue: '#1890ff',
  },
  // 按钮文字颜色
  {
    field: DrawerItemFieldEnum.drawer_buttonColor,
    label: '按钮文字颜色',
    uiType: UiTypeEnum.COLOR_PICKER,
    defaultValue: '#ffffff',
    currentValue: '#ffffff',
  },
  // 按钮边框颜色
  {
    field: DrawerItemFieldEnum.drawer_buttonBorderColor,
    label: '按钮边框颜色',
    uiType: UiTypeEnum.COLOR_PICKER,
    defaultValue: '#1890ff',
    currentValue: '#1890ff',
  },
  // 按钮边框宽度
  {
    field: DrawerItemFieldEnum.drawer_buttonBorderWidth,
    label: '按钮边框宽度',
    uiType: UiTypeEnum.INPUT_NUMBER,
    defaultValue: 1,
    currentValue: 1,
    min: 0,
    max: 10,
    step: 1,
    unit: 'px',
  },
  // 按钮边框圆角
  {
    field: DrawerItemFieldEnum.drawer_buttonBorderRadius,
    label: '按钮边框圆角',
    uiType: UiTypeEnum.INPUT_NUMBER,
    defaultValue: 4,
    currentValue: 4,
    min: 0,
    max: 50,
    step: 1,
    unit: 'px',
  },
  // 按钮内边距
  {
    field: DrawerItemFieldEnum.drawer_buttonPadding,
    label: '按钮内边距',
    uiType: UiTypeEnum.MARGIN_PADDING,
    defaultValue: {
      margin: {
        top: 0,
        right: 0,
        bottom: 0,
        left: 0,
      },
      padding: {
        top: 8,
        right: 16,
        bottom: 8,
        left: 16,
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
        top: 8,
        right: 16,
        bottom: 8,
        left: 16,
      },
    },
    unit: 'px',
  },
];

export const DrawerConfigList: ComponentsConfig = {
  componentName: 'Drawer',
  componentType: ComponentTypeEnum.DRAWER,
  config: [
    {
      areaName: ConfigAreaEnum.layout,
      configItem: [
        DrawerItemFieldEnum.drawer_backgroundColor,
        DrawerItemFieldEnum.drawer_MarginPadding,
      ]
    },
    {
      areaName: ConfigAreaEnum.regular,
      configItem: [
        DrawerItemFieldEnum.drawer_width,
        DrawerItemFieldEnum.drawer_height,
        DrawerItemFieldEnum.drawer_placement,
      ]
    },
    {
      areaName: ConfigAreaEnum.border,
      configItem: [
        DrawerItemFieldEnum.drawer_borderColor,
        DrawerItemFieldEnum.drawer_borderWidth,
        DrawerItemFieldEnum.drawer_borderRadius,
        DrawerItemFieldEnum.drawer_borderStyle,
      ]
    },
    {
      areaName: ConfigAreaEnum.text,
      configItem: [
        DrawerItemFieldEnum.drawer_fontSize,
        DrawerItemFieldEnum.drawer_color,
      ]
    },
    {
      areaName: ConfigAreaEnum.content,
      configItem: [
        DrawerItemFieldEnum.drawer_title,
        DrawerItemFieldEnum.drawer_content,
        DrawerItemFieldEnum.drawer_buttonText,
        DrawerItemFieldEnum.drawer_buttonBackgroundColor,
        DrawerItemFieldEnum.drawer_buttonColor,
        DrawerItemFieldEnum.drawer_buttonBorderColor,
        DrawerItemFieldEnum.drawer_buttonBorderWidth,
        DrawerItemFieldEnum.drawer_buttonBorderRadius,
        DrawerItemFieldEnum.drawer_buttonPadding,
      ]
    },
  ],
};