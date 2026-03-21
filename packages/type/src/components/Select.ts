import { ComponentTypeEnum } from "../ComponentSchema";
import { ComponentsConfig, ConfigAreaEnum } from "../Config";
import { ConfigItem, UiTypeEnum } from "../ConfigItem";

export const SelectItemFieldEnum = {
  select_backgroundColor: 'select.backgroundColor',
  select_MarginPadding: 'select.MarginPadding',
  select_borderColor: 'select.borderColor',
  select_borderWidth: 'select.borderWidth',
  select_borderRadius: 'select.borderRadius',
  select_borderStyle: 'select.borderStyle',
  select_width: 'select.width',
  select_height: 'select.height',
  select_options: 'select.options',
  select_defaultValue: 'select.defaultValue',
  select_fontSize: 'select.fontSize',
  select_color: 'select.color',
};

export const SelectConfigItem: ConfigItem[] = [
  // 背景颜色
  {
    field: SelectItemFieldEnum.select_backgroundColor,
    label: '背景颜色',
    uiType: UiTypeEnum.COLOR_PICKER,
    defaultValue: '#ffffff',
    currentValue: '#ffffff',
  },
  // 边距
  {
    field: SelectItemFieldEnum.select_MarginPadding,
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
    field: SelectItemFieldEnum.select_borderColor,
    label: '边框颜色',
    uiType: UiTypeEnum.COLOR_PICKER,
    defaultValue: '#d9d9d9',
    currentValue: '#d9d9d9',
  },
  // 边框宽度
  {
    field: SelectItemFieldEnum.select_borderWidth,
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
    field: SelectItemFieldEnum.select_borderRadius,
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
    field: SelectItemFieldEnum.select_borderStyle,
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
    field: SelectItemFieldEnum.select_width,
    label: '宽度',
    uiType: UiTypeEnum.INPUT_NUMBER,
    defaultValue: 120,
    currentValue: 120,
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
    field: SelectItemFieldEnum.select_height,
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
  // 选项数据
  {
    field: SelectItemFieldEnum.select_options,
    label: '选项数据',
    uiType: UiTypeEnum.TEXTAREA,
    placeholder: '请输入选项数据，格式为JSON数组: [{"label": "选项1", "value": "option1"}]',
    defaultValue: JSON.stringify([
      { label: '选项1', value: 'option1' },
      { label: '选项2', value: 'option2' },
      { label: '选项3', value: 'option3' },
    ], null, 2),
    currentValue: JSON.stringify([
      { label: '选项1', value: 'option1' },
      { label: '选项2', value: 'option2' },
      { label: '选项3', value: 'option3' },
    ], null, 2),
  },
  // 默认值
  {
    field: SelectItemFieldEnum.select_defaultValue,
    label: '默认值',
    uiType: UiTypeEnum.INPUT,
    placeholder: '请输入默认值',
    defaultValue: '',
    currentValue: '',
  },
  // 字体大小
  {
    field: SelectItemFieldEnum.select_fontSize,
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
    field: SelectItemFieldEnum.select_color,
    label: '字体颜色',
    uiType: UiTypeEnum.COLOR_PICKER,
    defaultValue: '#333333',
    currentValue: '#333333',
  },
];

export const SelectConfigList: ComponentsConfig = {
  componentName: 'Select',
  componentType: ComponentTypeEnum.SELECT,
  config: [
    {
      areaName: ConfigAreaEnum.layout,
      configItem: [
        SelectItemFieldEnum.select_backgroundColor,
        SelectItemFieldEnum.select_MarginPadding,
      ]
    },
    {
      areaName: ConfigAreaEnum.regular,
      configItem: [
        SelectItemFieldEnum.select_width,
        SelectItemFieldEnum.select_height,
      ]
    },
    {
      areaName: ConfigAreaEnum.border,
      configItem: [
        SelectItemFieldEnum.select_borderColor,
        SelectItemFieldEnum.select_borderWidth,
        SelectItemFieldEnum.select_borderRadius,
        SelectItemFieldEnum.select_borderStyle,
      ]
    },
    {
      areaName: ConfigAreaEnum.text,
      configItem: [
        SelectItemFieldEnum.select_fontSize,
        SelectItemFieldEnum.select_color,
      ]
    },
    {
      areaName: ConfigAreaEnum.content,
      configItem: [
        SelectItemFieldEnum.select_options,
        SelectItemFieldEnum.select_defaultValue,
      ]
    },
  ],
};