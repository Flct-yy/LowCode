import { ComponentTypeEnum } from "../ComponentSchema";
import { ComponentsConfig, ConfigAreaEnum } from "../Config";
import { ConfigItem, UiTypeEnum } from "../ConfigItem";

export const TimelineItemFieldEnum = {
  timeline_backgroundColor: 'timeline.backgroundColor',
  timeline_MarginPadding: 'timeline.MarginPadding',
  timeline_borderColor: 'timeline.borderColor',
  timeline_borderWidth: 'timeline.borderWidth',
  timeline_borderRadius: 'timeline.borderRadius',
  timeline_borderStyle: 'timeline.borderStyle',
  timeline_width: 'timeline.width',
  timeline_height: 'timeline.height',
  timeline_dotColor: 'timeline.dotColor',
  timeline_lineColor: 'timeline.lineColor',
  timeline_fontSize: 'timeline.fontSize',
  timeline_color: 'timeline.color',
  timeline_items: 'timeline.items',
};

export const TimelineConfigItem: ConfigItem[] = [
  // 背景颜色
  {
    field: TimelineItemFieldEnum.timeline_backgroundColor,
    label: '背景颜色',
    uiType: UiTypeEnum.COLOR_PICKER,
    defaultValue: '#ffffff',
    currentValue: '#ffffff',
  },
  // 边距
  {
    field: TimelineItemFieldEnum.timeline_MarginPadding,
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
    field: TimelineItemFieldEnum.timeline_borderColor,
    label: '边框颜色',
    uiType: UiTypeEnum.COLOR_PICKER,
    defaultValue: '#d9d9d9',
    currentValue: '#d9d9d9',
  },
  // 边框宽度
  {
    field: TimelineItemFieldEnum.timeline_borderWidth,
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
    field: TimelineItemFieldEnum.timeline_borderRadius,
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
    field: TimelineItemFieldEnum.timeline_borderStyle,
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
    field: TimelineItemFieldEnum.timeline_width,
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
    field: TimelineItemFieldEnum.timeline_height,
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
  // 时间线点颜色
  {
    field: TimelineItemFieldEnum.timeline_dotColor,
    label: '时间线点颜色',
    uiType: UiTypeEnum.COLOR_PICKER,
    defaultValue: '#1890ff',
    currentValue: '#1890ff',
  },
  // 时间线颜色
  {
    field: TimelineItemFieldEnum.timeline_lineColor,
    label: '时间线颜色',
    uiType: UiTypeEnum.COLOR_PICKER,
    defaultValue: '#d9d9d9',
    currentValue: '#d9d9d9',
  },
  // 字体大小
  {
    field: TimelineItemFieldEnum.timeline_fontSize,
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
    field: TimelineItemFieldEnum.timeline_color,
    label: '字体颜色',
    uiType: UiTypeEnum.COLOR_PICKER,
    defaultValue: '#333333',
    currentValue: '#333333',
  },
  // 时间线数据
  {
    field: TimelineItemFieldEnum.timeline_items,
    label: '时间线数据',
    uiType: UiTypeEnum.TEXTAREA,
    placeholder: '请输入时间线数据，格式为JSON数组: [{"time": "2024-01-01", "content": "事件1"}]',
    defaultValue: JSON.stringify([
      { time: '2024-01-01', content: '事件1' },
      { time: '2024-01-02', content: '事件2' },
      { time: '2024-01-03', content: '事件3' },
    ], null, 2),
    currentValue: JSON.stringify([
      { time: '2024-01-01', content: '事件1' },
      { time: '2024-01-02', content: '事件2' },
      { time: '2024-01-03', content: '事件3' },
    ], null, 2),
  },
];

export const TimelineConfigList: ComponentsConfig = {
  componentName: 'Timeline',
  componentType: ComponentTypeEnum.TIMELINE,
  config: [
    {
      areaName: ConfigAreaEnum.layout,
      configItem: [
        TimelineItemFieldEnum.timeline_backgroundColor,
        TimelineItemFieldEnum.timeline_MarginPadding,
      ]
    },
    {
      areaName: ConfigAreaEnum.regular,
      configItem: [
        TimelineItemFieldEnum.timeline_width,
        TimelineItemFieldEnum.timeline_height,
      ]
    },
    {
      areaName: ConfigAreaEnum.border,
      configItem: [
        TimelineItemFieldEnum.timeline_borderColor,
        TimelineItemFieldEnum.timeline_borderWidth,
        TimelineItemFieldEnum.timeline_borderRadius,
        TimelineItemFieldEnum.timeline_borderStyle,
      ]
    },
    {
      areaName: ConfigAreaEnum.text,
      configItem: [
        TimelineItemFieldEnum.timeline_fontSize,
        TimelineItemFieldEnum.timeline_color,
      ]
    },
    {
      areaName: ConfigAreaEnum.content,
      configItem: [
        TimelineItemFieldEnum.timeline_dotColor,
        TimelineItemFieldEnum.timeline_lineColor,
        TimelineItemFieldEnum.timeline_items,
      ]
    },
  ],
};