import { ComponentTypeEnum } from '../ComponentSchema';
import { ComponentsConfig, ConfigAreaEnum } from '../Config';
import { ConfigItem, UiTypeEnum } from '../ConfigItem';

export const FormItemFieldEnum = {
  form_backgroundColor: 'form.backgroundColor',
  form_MarginPadding: 'form.MarginPadding',
  form_borderColor: 'form.borderColor',
  form_borderWidth: 'form.borderWidth',
  form_borderRadius: 'form.borderRadius',
  form_borderStyle: 'form.borderStyle',
  form_width: 'form.width',
  form_height: 'form.height',
  form_title: 'form.title',
  form_submitText: 'form.submitText',
  form_resetText: 'form.resetText',
};

export const FormConfigItem: ConfigItem[] = [
  {
    field: FormItemFieldEnum.form_backgroundColor,
    label: '背景颜色',
    uiType: UiTypeEnum.COLOR_PICKER,
    defaultValue: '#ffffff',
    currentValue: '#ffffff',
  },
  {
    field: FormItemFieldEnum.form_MarginPadding,
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
    field: FormItemFieldEnum.form_borderColor,
    label: '边框颜色',
    uiType: UiTypeEnum.COLOR_PICKER,
    defaultValue: '#d9d9d9',
    currentValue: '#d9d9d9',
  },
  {
    field: FormItemFieldEnum.form_borderWidth,
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
    field: FormItemFieldEnum.form_borderRadius,
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
    field: FormItemFieldEnum.form_borderStyle,
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
    field: FormItemFieldEnum.form_title,
    label: '表单标题',
    uiType: UiTypeEnum.INPUT,
    placeholder: '请输入表单标题',
    defaultValue: '表单',
    currentValue: '表单',
  },
  {
    field: FormItemFieldEnum.form_submitText,
    label: '提交按钮文本',
    uiType: UiTypeEnum.INPUT,
    placeholder: '请输入提交按钮文本',
    defaultValue: '提交',
    currentValue: '提交',
  },
  {
    field: FormItemFieldEnum.form_resetText,
    label: '重置按钮文本',
    uiType: UiTypeEnum.INPUT,
    placeholder: '请输入重置按钮文本',
    defaultValue: '重置',
    currentValue: '重置',
  },
  {
    field: FormItemFieldEnum.form_width,
    label: '宽度',
    uiType: UiTypeEnum.INPUT_NUMBER,
    defaultValue: 400,
    currentValue: 400,
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
    field: FormItemFieldEnum.form_height,
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
];

export const FormConfigList: ComponentsConfig = {
  componentName: 'Form',
  componentType: ComponentTypeEnum.FORM,
  config: [
    {
      areaName: ConfigAreaEnum.layout,
      configItem: [
        FormItemFieldEnum.form_backgroundColor,
        FormItemFieldEnum.form_MarginPadding,
      ]
    },
    {
      areaName: ConfigAreaEnum.regular,
      configItem: [
        FormItemFieldEnum.form_width,
        FormItemFieldEnum.form_height,
      ]
    },
    {
      areaName: ConfigAreaEnum.border,
      configItem: [
        FormItemFieldEnum.form_borderColor,
        FormItemFieldEnum.form_borderWidth,
        FormItemFieldEnum.form_borderRadius,
        FormItemFieldEnum.form_borderStyle,
      ]
    },
    {
      areaName: ConfigAreaEnum.content,
      configItem: [
        FormItemFieldEnum.form_title,
        FormItemFieldEnum.form_submitText,
        FormItemFieldEnum.form_resetText,
      ]
    }
  ],
};