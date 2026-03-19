import { ComponentTypeEnum } from "../ComponentSchema";
import { ComponentsConfig, ConfigAreaEnum } from "../Config";
import { ConfigItem, UiTypeEnum } from "../ConfigItem";

export const TextItemFieldEnum = {
  text_backgroundColor: 'text.backgroundColor',
  text_MarginPadding: 'text.MarginPadding',
  text_borderColor: 'text.borderColor',
  text_borderWidth: 'text.borderWidth',
  text_borderRadius: 'text.borderRadius',
  text_borderStyle: 'text.borderStyle',
  text_text: 'text.text',
  text_fontSize: 'text.fontSize',
  text_fontWeight: 'text.fontWeight',
  text_textAlign: 'text.textAlign',
  text_lineHeight: 'text.lineHeight',
  text_color: 'text.color',
  text_width: 'text.width',
  text_height: 'text.height',
};

export const TextConfigItem: ConfigItem[] = [
  // 背景颜色
  {
    field: TextItemFieldEnum.text_backgroundColor,
    label: '背景颜色',
    uiType: UiTypeEnum.COLOR_PICKER,
    defaultValue: '#ffffff',
    currentValue: 'transparent',
  },
  // 边距
  {
    field: TextItemFieldEnum.text_MarginPadding,
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
    field: TextItemFieldEnum.text_borderColor,
    label: '边框颜色',
    uiType: UiTypeEnum.COLOR_PICKER,
    defaultValue: '#000000',
    currentValue: '#000000',
  },
  // 边框宽度
  {
    field: TextItemFieldEnum.text_borderWidth,
    label: '边框宽度',
    uiType: UiTypeEnum.INPUT_NUMBER,
    defaultValue: 0,
    currentValue: 0,
    min: 0,
    max: 100,
    step: 1,
    unit: 'px',
  },
  // 边框圆角
  {
    field: TextItemFieldEnum.text_borderRadius,
    label: '边框圆角',
    uiType: UiTypeEnum.INPUT_NUMBER,
    defaultValue: 0,
    currentValue: 0,
    min: 0,
    max: 100,
    step: 1,
    unit: 'px',
  },
  // 边框样式
  {
    field: TextItemFieldEnum.text_borderStyle,
    label: '边框样式',
    uiType: UiTypeEnum.GROUP,
    defaultValue: 'solid',
    currentValue: 'solid',
    options: [
      { label: '实线', value: 'solid' },
      { label: '虚线', value: 'dashed' },
      { label: '点线', value: 'dotted' },
    ],
  },
  // 文字内容
  {
    field: TextItemFieldEnum.text_text,
    label: '文字内容',
    uiType: UiTypeEnum.INPUT,
    placeholder: '请输入文字',
    defaultValue: 'Text',
    currentValue: 'Text',
  },
  // 字体粗细
  {
    field: TextItemFieldEnum.text_fontWeight,
    label: '字体粗细',
    uiType: UiTypeEnum.SELECT,
    defaultValue: 'normal',
    currentValue: 'normal',
    options: [
      { label: '正常', value: 'normal' },
      { label: '加粗', value: 'bold' },
    ],
  },
  // 字体居中
  {
    field: TextItemFieldEnum.text_textAlign,
    label: '字体居中',
    uiType: UiTypeEnum.SELECT,
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
    field: TextItemFieldEnum.text_lineHeight,
    label: '行高',
    uiType: UiTypeEnum.INPUT_NUMBER,
    defaultValue: 16,
    currentValue: 16,
    min: 0,
    max: 100,
    step: 1,
    unit: 'px',
  },
  // 字体颜色
  {
    field: TextItemFieldEnum.text_color,
    label: '字体颜色',
    uiType: UiTypeEnum.COLOR_PICKER,
    defaultValue: '#000000',
    currentValue: '#000000',
  },
  // 字体颜色
  {
    field: TextItemFieldEnum.text_color,
    label: '字体颜色',
    uiType: UiTypeEnum.COLOR_PICKER,
    defaultValue: '#000000',
    currentValue: '#000000',
  },
  // 宽度
  {
    field: TextItemFieldEnum.text_width,
    label: '宽度',
    uiType: UiTypeEnum.INPUT_NUMBER,
    defaultValue: 100,
    currentValue: 100,
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
    field: TextItemFieldEnum.text_height,
    label: '高度',
    uiType: UiTypeEnum.INPUT_NUMBER,
    defaultValue: 18,
    currentValue: 18,
    step: 1,
    currentUnit: 'px',
    units: [
      { label: 'px', value: 'px' },
      { label: '%', value: '%' },
    ],
    mins: [0, 0],
    maxs: [1000, 100],
  },
  // 字体大小
  {
    field: TextItemFieldEnum.text_fontSize,
    label: '字体大小',
    uiType: UiTypeEnum.INPUT_NUMBER,
    defaultValue: 16,
    currentValue: 16,
    min: 0,
    max: 100,
    step: 1,
    unit: 'px',
  },
];

export const TextConfigList: ComponentsConfig = {
  componentName: 'Text',
  componentType: ComponentTypeEnum.TEXT,
  config: [
    {
      areaName: ConfigAreaEnum.layout,
      configItem: [
        TextItemFieldEnum.text_backgroundColor,
        TextItemFieldEnum.text_MarginPadding,
      ]
    },
    {
      areaName: ConfigAreaEnum.regular,
      configItem: [
        TextItemFieldEnum.text_width,
        TextItemFieldEnum.text_height,
      ]
    },
    {
      areaName: ConfigAreaEnum.border,
      configItem: [
        TextItemFieldEnum.text_borderColor,
        TextItemFieldEnum.text_borderWidth,
        TextItemFieldEnum.text_borderRadius,
        TextItemFieldEnum.text_borderStyle,
      ]
    },
    {
      areaName: ConfigAreaEnum.text,
      configItem: [
        TextItemFieldEnum.text_fontSize,
        TextItemFieldEnum.text_fontWeight,
        TextItemFieldEnum.text_textAlign,
        TextItemFieldEnum.text_lineHeight,
        TextItemFieldEnum.text_color,
      ]
    },
    {
      areaName: ConfigAreaEnum.content,
      configItem: [
        TextItemFieldEnum.text_text,
      ]
    }
  ],
};