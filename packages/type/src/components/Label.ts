import { ComponentTypeEnum } from '../ComponentSchema';
import { ComponentsConfig, ConfigAreaEnum } from '../Config';
import { ConfigItem, UiTypeEnum } from '../ConfigItem';

export const LabelItemFieldEnum = {
  label_backgroundColor: 'label.backgroundColor',
  label_MarginPadding: 'label.MarginPadding',
  label_borderColor: 'label.borderColor',
  label_borderWidth: 'label.borderWidth',
  label_borderRadius: 'label.borderRadius',
  label_borderStyle: 'label.borderStyle',
  label_text: 'label.text',
  label_fontSize: 'label.fontSize',
  label_fontWeight: 'label.fontWeight',
  label_textAlign: 'label.textAlign',
  label_lineHeight: 'label.lineHeight',
  label_color: 'label.color',
  label_width: 'label.width',
  label_height: 'label.height',
  label_tags: 'label.tags',
};

export const LabelConfigItem: ConfigItem[] = [
  {
    field: LabelItemFieldEnum.label_backgroundColor,
    label: '背景颜色',
    uiType: UiTypeEnum.COLOR_PICKER,
    defaultValue: '#ffffff',
    currentValue: 'transparent',
  },
  {
    field: LabelItemFieldEnum.label_MarginPadding,
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
  {
    field: LabelItemFieldEnum.label_borderColor,
    label: '边框颜色',
    uiType: UiTypeEnum.COLOR_PICKER,
    defaultValue: '#000000',
    currentValue: '#000000',
  },
  {
    field: LabelItemFieldEnum.label_borderWidth,
    label: '边框宽度',
    uiType: UiTypeEnum.INPUT_NUMBER,
    defaultValue: 0,
    currentValue: 0,
    min: 0,
    max: 100,
    step: 1,
    unit: 'px',
  },
  {
    field: LabelItemFieldEnum.label_borderRadius,
    label: '边框圆角',
    uiType: UiTypeEnum.INPUT_NUMBER,
    defaultValue: 0,
    currentValue: 0,
    min: 0,
    max: 100,
    step: 1,
    unit: 'px',
  },
  {
    field: LabelItemFieldEnum.label_borderStyle,
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
  {
    field: LabelItemFieldEnum.label_text,
    label: '文字标题',
    uiType: UiTypeEnum.INPUT,
    placeholder: '请输入标签标题',
    defaultValue: 'Label',
    currentValue: 'Label',
  },
  {
    field: LabelItemFieldEnum.label_fontWeight,
    label: '字体粗细',
    uiType: UiTypeEnum.SELECT,
    defaultValue: 'normal',
    currentValue: 'normal',
    options: [
      { label: '正常', value: 'normal' },
      { label: '加粗', value: 'bold' },
    ],
  },
  {
    field: LabelItemFieldEnum.label_textAlign,
    label: '字体居中',
    uiType: UiTypeEnum.SELECT,
    defaultValue: 'left',
    currentValue: 'left',
    options: [
      { label: '左对齐', value: 'left' },
      { label: '居中', value: 'center' },
      { label: '右对齐', value: 'right' },
    ],
  },
  {
    field: LabelItemFieldEnum.label_lineHeight,
    label: '行高',
    uiType: UiTypeEnum.INPUT_NUMBER,
    defaultValue: 16,
    currentValue: 16,
    min: 0,
    max: 100,
    step: 1,
    unit: 'px',
  },
  {
    field: LabelItemFieldEnum.label_color,
    label: '字体颜色',
    uiType: UiTypeEnum.COLOR_PICKER,
    defaultValue: '#000000',
    currentValue: '#000000',
  },
  {
    field: LabelItemFieldEnum.label_width,
    label: '宽度',
    uiType: UiTypeEnum.INPUT_NUMBER,
    defaultValue: 'auto',
    currentValue: 'auto',
    step: 1,
    currentUnit: 'px',
    units: [
      { label: 'px', value: 'px' },
      { label: '%', value: '%' },
    ],
    mins: [0, 0],
    maxs: [1000, 100],
  },
  {
    field: LabelItemFieldEnum.label_height,
    label: '高度',
    uiType: UiTypeEnum.INPUT_NUMBER,
    defaultValue: 'auto',
    currentValue: 'auto',
    step: 1,
    currentUnit: 'px',
    units: [
      { label: 'px', value: 'px' },
      { label: '%', value: '%' },
    ],
    mins: [0, 0],
    maxs: [1000, 100],
  },
  {
    field: LabelItemFieldEnum.label_fontSize,
    label: '字体大小',
    uiType: UiTypeEnum.INPUT_NUMBER,
    defaultValue: 14,
    currentValue: 14,
    min: 0,
    max: 100,
    step: 1,
    unit: 'px',
  },
  {
    field: LabelItemFieldEnum.label_tags,
    label: '标签列表',
    uiType: UiTypeEnum.INPUT,
    placeholder: '请输入标签，用逗号分隔',
    defaultValue: '标签1,标签2,标签3',
    currentValue: '标签1,标签2,标签3',
  },
];

export const LabelConfigList: ComponentsConfig = {
  componentName: 'Label',
  componentType: ComponentTypeEnum.LABEL,
  config: [
    {
      areaName: ConfigAreaEnum.layout,
      configItem: [
        LabelItemFieldEnum.label_backgroundColor,
        LabelItemFieldEnum.label_MarginPadding,
      ]
    },
    {
      areaName: ConfigAreaEnum.regular,
      configItem: [
        LabelItemFieldEnum.label_width,
        LabelItemFieldEnum.label_height,
      ]
    },
    {
      areaName: ConfigAreaEnum.border,
      configItem: [
        LabelItemFieldEnum.label_borderColor,
        LabelItemFieldEnum.label_borderWidth,
        LabelItemFieldEnum.label_borderRadius,
        LabelItemFieldEnum.label_borderStyle,
      ]
    },
    {
      areaName: ConfigAreaEnum.text,
      configItem: [
        LabelItemFieldEnum.label_fontSize,
        LabelItemFieldEnum.label_fontWeight,
        LabelItemFieldEnum.label_textAlign,
        LabelItemFieldEnum.label_lineHeight,
        LabelItemFieldEnum.label_color,
      ]
    },
    {
      areaName: ConfigAreaEnum.content,
      configItem: [
        LabelItemFieldEnum.label_text,
        LabelItemFieldEnum.label_tags,
      ]
    }
  ],
};