import { ComponentTypeEnum } from "../ComponentSchema";
import { ComponentsConfig, ConfigAreaEnum } from "../Config";
import { ConfigItem, UiTypeEnum } from "../ConfigItem";

export const CalendarItemFieldEnum = {
  calendar_backgroundColor: 'calendar.backgroundColor',
  calendar_MarginPadding: 'calendar.MarginPadding',
  calendar_borderColor: 'calendar.borderColor',
  calendar_borderWidth: 'calendar.borderWidth',
  calendar_borderRadius: 'calendar.borderRadius',
  calendar_borderStyle: 'calendar.borderStyle',
  calendar_width: 'calendar.width',
  calendar_height: 'calendar.height',
};

export const CalendarConfigItem: ConfigItem[] = [
  // 背景颜色
  {
    field: CalendarItemFieldEnum.calendar_backgroundColor,
    label: '背景颜色',
    uiType: UiTypeEnum.COLOR_PICKER,
    defaultValue: '#ffffff',
    currentValue: '#ffffff',
  },
  // 边距
  {
    field: CalendarItemFieldEnum.calendar_MarginPadding,
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
    field: CalendarItemFieldEnum.calendar_borderColor,
    label: '边框颜色',
    uiType: UiTypeEnum.COLOR_PICKER,
    defaultValue: '#d9d9d9',
    currentValue: '#d9d9d9',
  },
  // 边框宽度
  {
    field: CalendarItemFieldEnum.calendar_borderWidth,
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
    field: CalendarItemFieldEnum.calendar_borderRadius,
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
    field: CalendarItemFieldEnum.calendar_borderStyle,
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
    field: CalendarItemFieldEnum.calendar_width,
    label: '宽度',
    uiType: UiTypeEnum.INPUT_NUMBER,
    defaultValue: 300,
    currentValue: 300,
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
    field: CalendarItemFieldEnum.calendar_height,
    label: '高度',
    uiType: UiTypeEnum.INPUT_NUMBER,
    defaultValue: 300,
    currentValue: 300,
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
];

export const CalendarConfigList: ComponentsConfig = {
  componentName: 'Calendar',
  componentType: ComponentTypeEnum.CALENDAR,
  config: [
    {
      areaName: ConfigAreaEnum.layout,
      configItem: [
        CalendarItemFieldEnum.calendar_backgroundColor,
        CalendarItemFieldEnum.calendar_MarginPadding,
      ]
    },
    {
      areaName: ConfigAreaEnum.regular,
      configItem: [
        CalendarItemFieldEnum.calendar_width,
        CalendarItemFieldEnum.calendar_height,
      ]
    },
    {
      areaName: ConfigAreaEnum.border,
      configItem: [
        CalendarItemFieldEnum.calendar_borderColor,
        CalendarItemFieldEnum.calendar_borderWidth,
        CalendarItemFieldEnum.calendar_borderRadius,
        CalendarItemFieldEnum.calendar_borderStyle,
      ]
    },
  ],
};