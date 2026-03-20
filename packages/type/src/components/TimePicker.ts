import { ComponentTypeEnum } from "../ComponentSchema";
import { ComponentsConfig, ConfigAreaEnum } from "../Config";
import { ConfigItem, UiTypeEnum } from "../ConfigItem";

export const TimePickerItemFieldEnum = {
  timePicker_backgroundColor: 'timePicker.backgroundColor',
  timePicker_MarginPadding: 'timePicker.MarginPadding',
  timePicker_borderColor: 'timePicker.borderColor',
  timePicker_borderWidth: 'timePicker.borderWidth',
  timePicker_borderRadius: 'timePicker.borderRadius',
  timePicker_borderStyle: 'timePicker.borderStyle',
  timePicker_width: 'timePicker.width',
  timePicker_height: 'timePicker.height',
  timePicker_defaultValue: 'timePicker.defaultValue',
  timePicker_format: 'timePicker.format',
};

export const TimePickerConfigItem: ConfigItem[] = [
  // 背景颜色
  {
    field: TimePickerItemFieldEnum.timePicker_backgroundColor,
    label: '背景颜色',
    uiType: UiTypeEnum.COLOR_PICKER,
    defaultValue: '#ffffff',
    currentValue: '#ffffff',
  },
  // 边距
  {
    field: TimePickerItemFieldEnum.timePicker_MarginPadding,
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
    field: TimePickerItemFieldEnum.timePicker_borderColor,
    label: '边框颜色',
    uiType: UiTypeEnum.COLOR_PICKER,
    defaultValue: '#d9d9d9',
    currentValue: '#d9d9d9',
  },
  // 边框宽度
  {
    field: TimePickerItemFieldEnum.timePicker_borderWidth,
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
    field: TimePickerItemFieldEnum.timePicker_borderRadius,
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
    field: TimePickerItemFieldEnum.timePicker_borderStyle,
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
    field: TimePickerItemFieldEnum.timePicker_width,
    label: '宽度',
    uiType: UiTypeEnum.INPUT_NUMBER,
    defaultValue: 150,
    currentValue: 150,
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
    field: TimePickerItemFieldEnum.timePicker_height,
    label: '高度',
    uiType: UiTypeEnum.INPUT_NUMBER,
    defaultValue: 40,
    currentValue: 40,
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
  // 默认值
  {
    field: TimePickerItemFieldEnum.timePicker_defaultValue,
    label: '默认值',
    uiType: UiTypeEnum.INPUT,
    defaultValue: '12:00',
    currentValue: '12:00',
    placeholder: '请输入默认时间，格式为HH:MM',
  },
  // 时间格式
  {
    field: TimePickerItemFieldEnum.timePicker_format,
    label: '时间格式',
    uiType: UiTypeEnum.GROUP,
    defaultValue: '24h',
    currentValue: '24h',
    options: [
      { label: '24小时制', value: '24h' },
      { label: '12小时制', value: '12h' },
    ],
  },
];

export const TimePickerConfigList: ComponentsConfig = {
  componentName: 'TimePicker',
  componentType: ComponentTypeEnum.TIME_PICKER,
  config: [
    {
      areaName: ConfigAreaEnum.layout,
      configItem: [
        TimePickerItemFieldEnum.timePicker_backgroundColor,
        TimePickerItemFieldEnum.timePicker_MarginPadding,
      ]
    },
    {
      areaName: ConfigAreaEnum.regular,
      configItem: [
        TimePickerItemFieldEnum.timePicker_width,
        TimePickerItemFieldEnum.timePicker_height,
        TimePickerItemFieldEnum.timePicker_defaultValue,
        TimePickerItemFieldEnum.timePicker_format,
      ]
    },
    {
      areaName: ConfigAreaEnum.border,
      configItem: [
        TimePickerItemFieldEnum.timePicker_borderColor,
        TimePickerItemFieldEnum.timePicker_borderWidth,
        TimePickerItemFieldEnum.timePicker_borderRadius,
        TimePickerItemFieldEnum.timePicker_borderStyle,
      ]
    },
  ],
};