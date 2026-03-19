import { ComponentTypeEnum } from '../ComponentSchema';
import { ComponentsConfig, ConfigAreaEnum } from '../Config';
import { ConfigItem, UiTypeEnum } from '../ConfigItem';

export const TextareaItemFieldEnum = {
  textarea_backgroundColor: 'textarea.backgroundColor',
  textarea_MarginPadding: 'textarea.MarginPadding',
  textarea_borderColor: 'textarea.borderColor',
  textarea_borderWidth: 'textarea.borderWidth',
  textarea_borderRadius: 'textarea.borderRadius',
  textarea_borderStyle: 'textarea.borderStyle',
  textarea_text: 'textarea.text',
  textarea_fontSize: 'textarea.fontSize',
  textarea_fontWeight: 'textarea.fontWeight',
  textarea_textAlign: 'textarea.textAlign',
  textarea_lineHeight: 'textarea.lineHeight',
  textarea_color: 'textarea.color',
  textarea_width: 'textarea.width',
  textarea_height: 'textarea.height',
  textarea_placeholder: 'textarea.placeholder',
  textarea_rows: 'textarea.rows',
  textarea_readOnly: 'textarea.readOnly',
};

export const TextareaConfigItem: ConfigItem[] = [
  {
    field: TextareaItemFieldEnum.textarea_backgroundColor,
    label: '背景颜色',
    uiType: UiTypeEnum.COLOR_PICKER,
    defaultValue: '#ffffff',
    currentValue: '#ffffff',
  },
  {
    field: TextareaItemFieldEnum.textarea_MarginPadding,
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
        top: 8,
        right: 12,
        bottom: 8,
        left: 12,
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
        right: 12,
        bottom: 8,
        left: 12,
      },
    },
    unit: 'px',
  },
  {
    field: TextareaItemFieldEnum.textarea_borderColor,
    label: '边框颜色',
    uiType: UiTypeEnum.COLOR_PICKER,
    defaultValue: '#d9d9d9',
    currentValue: '#d9d9d9',
  },
  {
    field: TextareaItemFieldEnum.textarea_borderWidth,
    label: '边框宽度',
    uiType: UiTypeEnum.INPUT_NUMBER,
    defaultValue: 1,
    currentValue: 1,
    min: 0,
    max: 100,
    step: 1,
    unit: 'px',
  },
  {
    field: TextareaItemFieldEnum.textarea_borderRadius,
    label: '边框圆角',
    uiType: UiTypeEnum.INPUT_NUMBER,
    defaultValue: 4,
    currentValue: 4,
    min: 0,
    max: 100,
    step: 1,
    unit: 'px',
  },
  {
    field: TextareaItemFieldEnum.textarea_borderStyle,
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
    field: TextareaItemFieldEnum.textarea_text,
    label: '文本内容',
    uiType: UiTypeEnum.INPUT,
    placeholder: '请输入文本',
    defaultValue: '',
    currentValue: '',
  },
  {
    field: TextareaItemFieldEnum.textarea_placeholder,
    label: '占位文本',
    uiType: UiTypeEnum.INPUT,
    placeholder: '请输入占位文本',
    defaultValue: '请输入内容',
    currentValue: '请输入内容',
  },
  {
    field: TextareaItemFieldEnum.textarea_rows,
    label: '行数',
    uiType: UiTypeEnum.INPUT_NUMBER,
    defaultValue: 3,
    currentValue: 3,
    min: 1,
    max: 20,
    step: 1,
  },
  {
    field: TextareaItemFieldEnum.textarea_fontWeight,
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
    field: TextareaItemFieldEnum.textarea_textAlign,
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
    field: TextareaItemFieldEnum.textarea_lineHeight,
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
    field: TextareaItemFieldEnum.textarea_color,
    label: '字体颜色',
    uiType: UiTypeEnum.COLOR_PICKER,
    defaultValue: '#000000',
    currentValue: '#000000',
  },
  {
    field: TextareaItemFieldEnum.textarea_width,
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
  {
    field: TextareaItemFieldEnum.textarea_height,
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
    field: TextareaItemFieldEnum.textarea_fontSize,
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
    field: TextareaItemFieldEnum.textarea_readOnly,
    label: '只读',
    uiType: UiTypeEnum.GROUP,
    defaultValue: false,
    currentValue: false,
    options: [
      { label: '是', value: true },
      { label: '否', value: false },
    ],
  },
];

export const TextareaConfigList: ComponentsConfig = {
  componentName: 'Textarea',
  componentType: ComponentTypeEnum.TEXTAREA,
  config: [
    {
      areaName: ConfigAreaEnum.layout,
      configItem: [
        TextareaItemFieldEnum.textarea_backgroundColor,
        TextareaItemFieldEnum.textarea_MarginPadding,
      ]
    },
    {
      areaName: ConfigAreaEnum.regular,
      configItem: [
        TextareaItemFieldEnum.textarea_width,
        TextareaItemFieldEnum.textarea_height,
        TextareaItemFieldEnum.textarea_rows,
      ]
    },
    {
      areaName: ConfigAreaEnum.border,
      configItem: [
        TextareaItemFieldEnum.textarea_borderColor,
        TextareaItemFieldEnum.textarea_borderWidth,
        TextareaItemFieldEnum.textarea_borderRadius,
        TextareaItemFieldEnum.textarea_borderStyle,
      ]
    },
    {
      areaName: ConfigAreaEnum.text,
      configItem: [
        TextareaItemFieldEnum.textarea_fontSize,
        TextareaItemFieldEnum.textarea_fontWeight,
        TextareaItemFieldEnum.textarea_textAlign,
        TextareaItemFieldEnum.textarea_lineHeight,
        TextareaItemFieldEnum.textarea_color,
      ]
    },
    {
      areaName: ConfigAreaEnum.content,
      configItem: [
        TextareaItemFieldEnum.textarea_text,
        TextareaItemFieldEnum.textarea_placeholder,
        TextareaItemFieldEnum.textarea_readOnly,
      ]
    }
  ],
};