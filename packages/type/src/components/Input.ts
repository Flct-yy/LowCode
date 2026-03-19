import { ComponentTypeEnum } from "../ComponentSchema";
import { ComponentsConfig, ConfigAreaEnum } from "../Config";
import { ConfigItem, UiTypeEnum } from "../ConfigItem";

export const InputItemFieldEnum = {
  input_backgroundColor: 'input.backgroundColor',
  input_MarginPadding: 'input.MarginPadding',
  input_borderColor: 'input.borderColor',
  input_borderWidth: 'input.borderWidth',
  input_borderRadius: 'input.borderRadius',
  input_borderStyle: 'input.borderStyle',
  input_text: 'input.text',
  input_fontSize: 'input.fontSize',
  input_fontWeight: 'input.fontWeight',
  input_textAlign: 'input.textAlign',
  input_lineHeight: 'input.lineHeight',
  input_color: 'input.color',
  input_width: 'input.width',
  input_height: 'input.height',
  input_placeholder: 'input.placeholder',
  input_disabled: 'input.disabled',
  input_readOnly: 'input.readOnly',
};

export const InputConfigItem: ConfigItem[] = [
  // 背景颜色
  {
    field: InputItemFieldEnum.input_backgroundColor,
    label: '背景颜色',
    uiType: UiTypeEnum.COLOR_PICKER,
    defaultValue: '#ffffff',
    currentValue: '#ffffff',
  },
  // 边距
  {
    field: InputItemFieldEnum.input_MarginPadding,
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
    field: InputItemFieldEnum.input_borderColor,
    label: '边框颜色',
    uiType: UiTypeEnum.COLOR_PICKER,
    defaultValue: '#d9d9d9',
    currentValue: '#d9d9d9',
  },
  // 边框宽度
  {
    field: InputItemFieldEnum.input_borderWidth,
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
    field: InputItemFieldEnum.input_borderRadius,
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
    field: InputItemFieldEnum.input_borderStyle,
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
    field: InputItemFieldEnum.input_text,
    label: '文字内容',
    uiType: UiTypeEnum.INPUT,
    placeholder: '请输入文字',
    defaultValue: '',
    currentValue: '',
  },
  // 占位符
  {
    field: InputItemFieldEnum.input_placeholder,
    label: '占位符',
    uiType: UiTypeEnum.INPUT,
    placeholder: '请输入占位符',
    defaultValue: '请输入',
    currentValue: '请输入',
  },
  // 字体大小
  {
    field: InputItemFieldEnum.input_fontSize,
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
    field: InputItemFieldEnum.input_fontWeight,
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
    field: InputItemFieldEnum.input_textAlign,
    label: '文字对齐',
    uiType: UiTypeEnum.GROUP,
    defaultValue: 'left',
    currentValue: 'left',
    options: [
      { label: '左对齐', value: 'left' },
      { label: '居中', value: 'center' },
      { label: '右对齐', value: 'right' },
    ],
  },
  // 行高
  {
    field: InputItemFieldEnum.input_lineHeight,
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
    field: InputItemFieldEnum.input_color,
    label: '字体颜色',
    uiType: UiTypeEnum.COLOR_PICKER,
    defaultValue: '#000000',
    currentValue: '#000000',
  },
  // 宽度
  {
    field: InputItemFieldEnum.input_width,
    label: '宽度',
    uiType: UiTypeEnum.INPUT_NUMBER,
    defaultValue: 200,
    currentValue: 200,
    step: 1,
    currentUnit: 'px',
    units: [
      { label: 'px', value: 'px' },
      { label: '%', value: '%' },
    ],
    mins: [0, 0],
    maxs: [1000, 100],
  },
  // 高度
  {
    field: InputItemFieldEnum.input_height,
    label: '高度',
    uiType: UiTypeEnum.INPUT_NUMBER,
    defaultValue: 32,
    currentValue: 32,
    step: 1,
    currentUnit: 'px',
    units: [
      { label: 'px', value: 'px' },
      { label: '%', value: '%' },
    ],
    mins: [0, 0],
    maxs: [1000, 100],
  },
  // 禁用
  {
    field: InputItemFieldEnum.input_disabled,
    label: '禁用',
    uiType: UiTypeEnum.GROUP,
    defaultValue: false,
    currentValue: false,
    options: [
      { label: '启用', value: false },
      { label: '禁用', value: true },
    ],
  },
  // 只读
  {
    field: InputItemFieldEnum.input_readOnly,
    label: '只读',
    uiType: UiTypeEnum.GROUP,
    defaultValue: false,
    currentValue: false,
    options: [
      { label: '可编辑', value: false },
      { label: '只读', value: true },
    ],
  },
];

export const InputConfigList: ComponentsConfig = {
  componentName: 'Input',
  componentType: ComponentTypeEnum.INPUT,
  config: [
    {
      areaName: ConfigAreaEnum.layout,
      configItem: [
        InputItemFieldEnum.input_backgroundColor,
        InputItemFieldEnum.input_MarginPadding,
      ]
    },
    {
      areaName: ConfigAreaEnum.regular,
      configItem: [
        InputItemFieldEnum.input_width,
        InputItemFieldEnum.input_height,
        InputItemFieldEnum.input_disabled,
        InputItemFieldEnum.input_readOnly,
      ]
    },
    {
      areaName: ConfigAreaEnum.border,
      configItem: [
        InputItemFieldEnum.input_borderColor,
        InputItemFieldEnum.input_borderWidth,
        InputItemFieldEnum.input_borderRadius,
        InputItemFieldEnum.input_borderStyle,
      ]
    },
    {
      areaName: ConfigAreaEnum.text,
      configItem: [
        InputItemFieldEnum.input_placeholder,
        InputItemFieldEnum.input_fontSize,
        InputItemFieldEnum.input_fontWeight,
        InputItemFieldEnum.input_textAlign,
        InputItemFieldEnum.input_lineHeight,
        InputItemFieldEnum.input_color,
      ]
    },
    {
      areaName: ConfigAreaEnum.content,
      configItem: [
        InputItemFieldEnum.input_text,
      ]
    }
  ],
};