import { ComponentTypeEnum } from "../ComponentSchema";
import { ComponentsConfig, ConfigAreaEnum } from "../Config";
import { ConfigItem, UiTypeEnum } from "../ConfigItem";

export const RadioItemFieldEnum = {
  radio_backgroundColor: 'radio.backgroundColor',
  radio_MarginPadding: 'radio.MarginPadding',
  radio_borderColor: 'radio.borderColor',
  radio_borderWidth: 'radio.borderWidth',
  radio_borderRadius: 'radio.borderRadius',
  radio_borderStyle: 'radio.borderStyle',
  radio_width: 'radio.width',
  radio_height: 'radio.height',
  radio_options: 'radio.options',
  radio_defaultValue: 'radio.defaultValue',
  radio_direction: 'radio.direction',
  radio_fontSize: 'radio.fontSize',
  radio_color: 'radio.color',
};

export const RadioConfigItem: ConfigItem[] = [
  // 背景颜色
  {
    field: RadioItemFieldEnum.radio_backgroundColor,
    label: '背景颜色',
    uiType: UiTypeEnum.COLOR_PICKER,
    defaultValue: '#ffffff',
    currentValue: '#ffffff',
  },
  // 边距
  {
    field: RadioItemFieldEnum.radio_MarginPadding,
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
    field: RadioItemFieldEnum.radio_borderColor,
    label: '边框颜色',
    uiType: UiTypeEnum.COLOR_PICKER,
    defaultValue: '#d9d9d9',
    currentValue: '#d9d9d9',
  },
  // 边框宽度
  {
    field: RadioItemFieldEnum.radio_borderWidth,
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
    field: RadioItemFieldEnum.radio_borderRadius,
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
    field: RadioItemFieldEnum.radio_borderStyle,
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
    field: RadioItemFieldEnum.radio_width,
    label: '宽度',
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
  // 高度
  {
    field: RadioItemFieldEnum.radio_height,
    label: '高度',
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
  // 选项数据
  {
    field: RadioItemFieldEnum.radio_options,
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
    field: RadioItemFieldEnum.radio_defaultValue,
    label: '默认值',
    uiType: UiTypeEnum.INPUT,
    placeholder: '请输入默认值',
    defaultValue: '',
    currentValue: '',
  },
  // 方向
  {
    field: RadioItemFieldEnum.radio_direction,
    label: '方向',
    uiType: UiTypeEnum.GROUP,
    defaultValue: 'horizontal',
    currentValue: 'horizontal',
    options: [
      { label: '水平', value: 'horizontal' },
      { label: '垂直', value: 'vertical' },
    ],
  },
  // 字体大小
  {
    field: RadioItemFieldEnum.radio_fontSize,
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
    field: RadioItemFieldEnum.radio_color,
    label: '字体颜色',
    uiType: UiTypeEnum.COLOR_PICKER,
    defaultValue: '#333333',
    currentValue: '#333333',
  },
];

export const RadioConfigList: ComponentsConfig = {
  componentName: 'Radio',
  componentType: ComponentTypeEnum.RADIO,
  config: [
    {
      areaName: ConfigAreaEnum.layout,
      configItem: [
        RadioItemFieldEnum.radio_backgroundColor,
        RadioItemFieldEnum.radio_MarginPadding,
      ]
    },
    {
      areaName: ConfigAreaEnum.regular,
      configItem: [
        RadioItemFieldEnum.radio_width,
        RadioItemFieldEnum.radio_height,
        RadioItemFieldEnum.radio_direction,
      ]
    },
    {
      areaName: ConfigAreaEnum.border,
      configItem: [
        RadioItemFieldEnum.radio_borderColor,
        RadioItemFieldEnum.radio_borderWidth,
        RadioItemFieldEnum.radio_borderRadius,
        RadioItemFieldEnum.radio_borderStyle,
      ]
    },
    {
      areaName: ConfigAreaEnum.text,
      configItem: [
        RadioItemFieldEnum.radio_fontSize,
        RadioItemFieldEnum.radio_color,
      ]
    },
    {
      areaName: ConfigAreaEnum.content,
      configItem: [
        RadioItemFieldEnum.radio_options,
        RadioItemFieldEnum.radio_defaultValue,
      ]
    },
  ],
};