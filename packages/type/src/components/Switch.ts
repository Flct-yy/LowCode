import { ComponentTypeEnum } from '../ComponentSchema';
import { ComponentsConfig, ConfigAreaEnum } from '../Config';
import { ConfigItem, UiTypeEnum } from '../ConfigItem';

export const SwitchItemFieldEnum = {
  switch_backgroundColor: 'switch.backgroundColor',
  switch_MarginPadding: 'switch.MarginPadding',
  switch_borderColor: 'switch.borderColor',
  switch_borderWidth: 'switch.borderWidth',
  switch_borderRadius: 'switch.borderRadius',
  switch_borderStyle: 'switch.borderStyle',
  switch_text: 'switch.text',
  switch_fontSize: 'switch.fontSize',
  switch_fontWeight: 'switch.fontWeight',
  switch_textAlign: 'switch.textAlign',
  switch_lineHeight: 'switch.lineHeight',
  switch_color: 'switch.color',
  switch_width: 'switch.width',
  switch_height: 'switch.height',
  switch_checked: 'switch.checked',
  switch_disabled: 'switch.disabled',
  switch_activeColor: 'switch.activeColor',
  switch_inactiveColor: 'switch.inactiveColor',
};

export const SwitchConfigItem: ConfigItem[] = [
  {
    field: SwitchItemFieldEnum.switch_backgroundColor,
    label: '背景颜色',
    uiType: UiTypeEnum.COLOR_PICKER,
    defaultValue: '#ffffff',
    currentValue: '#ffffff',
  },
  {
    field: SwitchItemFieldEnum.switch_MarginPadding,
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
    field: SwitchItemFieldEnum.switch_borderColor,
    label: '边框颜色',
    uiType: UiTypeEnum.COLOR_PICKER,
    defaultValue: '#d9d9d9',
    currentValue: '#d9d9d9',
  },
  {
    field: SwitchItemFieldEnum.switch_borderWidth,
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
    field: SwitchItemFieldEnum.switch_borderRadius,
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
    field: SwitchItemFieldEnum.switch_borderStyle,
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
    field: SwitchItemFieldEnum.switch_text,
    label: '开关文本',
    uiType: UiTypeEnum.INPUT,
    placeholder: '请输入开关文本',
    defaultValue: '',
    currentValue: '',
  },
  {
    field: SwitchItemFieldEnum.switch_checked,
    label: '默认选中',
    uiType: UiTypeEnum.GROUP,
    defaultValue: false,
    currentValue: false,
    options: [
      { label: '是', value: true },
      { label: '否', value: false },
    ],
  },
  {
    field: SwitchItemFieldEnum.switch_disabled,
    label: '禁用',
    uiType: UiTypeEnum.GROUP,
    defaultValue: false,
    currentValue: false,
    options: [
      { label: '是', value: true },
      { label: '否', value: false },
    ],
  },
  {
    field: SwitchItemFieldEnum.switch_activeColor,
    label: '激活颜色',
    uiType: UiTypeEnum.COLOR_PICKER,
    defaultValue: '#1890ff',
    currentValue: '#1890ff',
  },
  {
    field: SwitchItemFieldEnum.switch_inactiveColor,
    label: '未激活颜色',
    uiType: UiTypeEnum.COLOR_PICKER,
    defaultValue: '#d9d9d9',
    currentValue: '#d9d9d9',
  },
  {
    field: SwitchItemFieldEnum.switch_fontWeight,
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
    field: SwitchItemFieldEnum.switch_textAlign,
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
    field: SwitchItemFieldEnum.switch_lineHeight,
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
    field: SwitchItemFieldEnum.switch_color,
    label: '字体颜色',
    uiType: UiTypeEnum.COLOR_PICKER,
    defaultValue: '#000000',
    currentValue: '#000000',
  },
  {
    field: SwitchItemFieldEnum.switch_width,
    label: '宽度',
    uiType: UiTypeEnum.INPUT_NUMBER,
    defaultValue: 60,
    currentValue: 60,
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
    field: SwitchItemFieldEnum.switch_height,
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
  {
    field: SwitchItemFieldEnum.switch_fontSize,
    label: '字体大小',
    uiType: UiTypeEnum.INPUT_NUMBER,
    defaultValue: 14,
    currentValue: 14,
    min: 0,
    max: 100,
    step: 1,
    unit: 'px',
  },
];

export const SwitchConfigList: ComponentsConfig = {
  componentName: 'Switch',
  componentType: ComponentTypeEnum.SWITCH,
  config: [
    {
      areaName: ConfigAreaEnum.layout,
      configItem: [
        SwitchItemFieldEnum.switch_backgroundColor,
        SwitchItemFieldEnum.switch_MarginPadding,
      ]
    },
    {
      areaName: ConfigAreaEnum.regular,
      configItem: [
        SwitchItemFieldEnum.switch_width,
        SwitchItemFieldEnum.switch_height,
      ]
    },
    {
      areaName: ConfigAreaEnum.border,
      configItem: [
        SwitchItemFieldEnum.switch_borderColor,
        SwitchItemFieldEnum.switch_borderWidth,
        SwitchItemFieldEnum.switch_borderRadius,
        SwitchItemFieldEnum.switch_borderStyle,
      ]
    },
    {
      areaName: ConfigAreaEnum.text,
      configItem: [
        SwitchItemFieldEnum.switch_fontSize,
        SwitchItemFieldEnum.switch_fontWeight,
        SwitchItemFieldEnum.switch_textAlign,
        SwitchItemFieldEnum.switch_lineHeight,
        SwitchItemFieldEnum.switch_color,
      ]
    },
    {
      areaName: ConfigAreaEnum.content,
      configItem: [
        SwitchItemFieldEnum.switch_text,
        SwitchItemFieldEnum.switch_checked,
        SwitchItemFieldEnum.switch_disabled,
        SwitchItemFieldEnum.switch_activeColor,
        SwitchItemFieldEnum.switch_inactiveColor,
      ]
    }
  ],
};