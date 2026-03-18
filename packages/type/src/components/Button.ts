import { ComponentTypeEnum } from "../ComponentSchema";
import { ComponentsConfig, ConfigAreaEnum } from "../Config";
import { ConfigItem, UiTypeEnum } from "../ConfigItem";

export const ButtonItemFieldEnum = {
  button_backgroundColor: 'button.backgroundColor',
  button_MarginPadding: 'button.MarginPadding',
  button_borderColor: 'button.borderColor',
  button_borderWidth: 'button.borderWidth',
  button_borderRadius: 'button.borderRadius',
  button_borderStyle: 'button.borderStyle',
  button_text: 'button.text',
  button_fontSize: 'button.fontSize',
  button_fontWeight: 'button.fontWeight',
  button_textAlign: 'button.textAlign',
  button_lineHeight: 'button.lineHeight',
  button_color: 'button.color',
  button_width: 'button.width',
  button_height: 'button.height',
  button_disabled: 'button.disabled',
  button_type: 'button.type',
  button_size: 'button.size',
};

export const ButtonConfigItem: ConfigItem[] = [
  // 背景颜色
  {
    field: ButtonItemFieldEnum.button_backgroundColor,
    label: '背景颜色',
    uiType: UiTypeEnum.COLOR_PICKER,
    defaultValue: '#1890ff',
    currentValue: '#1890ff',
  },
  // 边距
  {
    field: ButtonItemFieldEnum.button_MarginPadding,
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
    field: ButtonItemFieldEnum.button_borderColor,
    label: '边框颜色',
    uiType: UiTypeEnum.COLOR_PICKER,
    defaultValue: '#1890ff',
    currentValue: '#1890ff',
  },
  // 边框宽度
  {
    field: ButtonItemFieldEnum.button_borderWidth,
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
    field: ButtonItemFieldEnum.button_borderRadius,
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
    field: ButtonItemFieldEnum.button_borderStyle,
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
  // 文字内容
  {
    field: ButtonItemFieldEnum.button_text,
    label: '文字内容',
    uiType: UiTypeEnum.INPUT,
    placeholder: '请输入按钮文字',
    defaultValue: 'Button',
    currentValue: 'Button',
  },
  // 字体大小
  {
    field: ButtonItemFieldEnum.button_fontSize,
    label: '字体大小',
    uiType: UiTypeEnum.INPUT_NUMBER,
    defaultValue: 14,
    currentValue: 14,
    min: 0,
    max: 100,
    step: 1,
    unit: 'px',
  },
  // 字体粗细
  {
    field: ButtonItemFieldEnum.button_fontWeight,
    label: '字体粗细',
    uiType: UiTypeEnum.GROUP,
    defaultValue: 'normal',
    currentValue: 'normal',
    options: [
      { label: '正常', value: 'normal' },
      { label: '加粗', value: 'bold' },
    ],
  },
  // 文字对齐
  {
    field: ButtonItemFieldEnum.button_textAlign,
    label: '文字对齐',
    uiType: UiTypeEnum.GROUP,
    defaultValue: 'center',
    currentValue: 'center',
    options: [
      { label: '左对齐', value: 'left' },
      { label: '居中', value: 'center' },
      { label: '右对齐', value: 'right' },
    ],
  },
  // 行高
  {
    field: ButtonItemFieldEnum.button_lineHeight,
    label: '行高',
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
    field: ButtonItemFieldEnum.button_color,
    label: '字体颜色',
    uiType: UiTypeEnum.COLOR_PICKER,
    defaultValue: '#ffffff',
    currentValue: '#ffffff',
  },
  // 宽度
  {
    field: ButtonItemFieldEnum.button_width,
    label: '宽度',
    uiType: UiTypeEnum.INPUT_NUMBER,
    defaultValue: 100,
    currentValue: 100,
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
    field: ButtonItemFieldEnum.button_height,
    label: '高度',
    uiType: UiTypeEnum.INPUT_NUMBER,
    defaultValue: 32,
    currentValue: 32,
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
    field: ButtonItemFieldEnum.button_disabled,
    label: '禁用',
    uiType: UiTypeEnum.GROUP,
    defaultValue: false,
    currentValue: false,
    options: [
      { label: '启用', value: false },
      { label: '禁用', value: true },
    ],
  },
  // 按钮类型
  {
    field: ButtonItemFieldEnum.button_type,
    label: '按钮类型',
    uiType: UiTypeEnum.GROUP,
    defaultValue: 'primary',
    currentValue: 'primary',
    options: [
      { label: '主要', value: 'primary' },
      { label: '默认', value: 'default' },
      { label: '虚线', value: 'dashed' },
      { label: '文本', value: 'text' },
      { label: '链接', value: 'link' },
    ],
  },
  // 按钮大小
  {
    field: ButtonItemFieldEnum.button_size,
    label: '按钮大小',
    uiType: UiTypeEnum.GROUP,
    defaultValue: 'middle',
    currentValue: 'middle',
    options: [
      { label: '小', value: 'small' },
      { label: '中', value: 'middle' },
      { label: '大', value: 'large' },
    ],
  },
];

export const ButtonConfigList: ComponentsConfig = {
  componentName: 'Button',
  componentType: ComponentTypeEnum.BUTTON,
  config: [
    {
      areaName: ConfigAreaEnum.layout,
      configItem: [
        ButtonItemFieldEnum.button_backgroundColor,
        ButtonItemFieldEnum.button_MarginPadding,
      ]
    },
    {
      areaName: ConfigAreaEnum.regular,
      configItem: [
        ButtonItemFieldEnum.button_width,
        ButtonItemFieldEnum.button_height,
        ButtonItemFieldEnum.button_disabled,
        ButtonItemFieldEnum.button_type,
        ButtonItemFieldEnum.button_size,
      ]
    },
    {
      areaName: ConfigAreaEnum.border,
      configItem: [
        ButtonItemFieldEnum.button_borderColor,
        ButtonItemFieldEnum.button_borderWidth,
        ButtonItemFieldEnum.button_borderRadius,
        ButtonItemFieldEnum.button_borderStyle,
      ]
    },
    {
      areaName: ConfigAreaEnum.text,
      configItem: [
        ButtonItemFieldEnum.button_text,
        ButtonItemFieldEnum.button_fontSize,
        ButtonItemFieldEnum.button_fontWeight,
        ButtonItemFieldEnum.button_textAlign,
        ButtonItemFieldEnum.button_lineHeight,
        ButtonItemFieldEnum.button_color,
      ]
    },
  ],
};