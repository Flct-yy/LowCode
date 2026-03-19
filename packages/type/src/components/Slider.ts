import { ComponentTypeEnum } from "../ComponentSchema";
import { ComponentsConfig, ConfigAreaEnum } from "../Config";
import { ConfigItem, UiTypeEnum } from "../ConfigItem";

export const SliderItemFieldEnum = {
  slider_backgroundColor: 'slider.backgroundColor',
  slider_MarginPadding: 'slider.MarginPadding',
  slider_borderColor: 'slider.borderColor',
  slider_borderWidth: 'slider.borderWidth',
  slider_borderRadius: 'slider.borderRadius',
  slider_borderStyle: 'slider.borderStyle',
  slider_width: 'slider.width',
  slider_height: 'slider.height',
  slider_min: 'slider.min',
  slider_max: 'slider.max',
  slider_step: 'slider.step',
  slider_value: 'slider.value',
  slider_disabled: 'slider.disabled',
  slider_showTooltip: 'slider.showTooltip',
  slider_showMarks: 'slider.showMarks',
};

export const SliderConfigItem: ConfigItem[] = [
  // 背景颜色
  {
    field: SliderItemFieldEnum.slider_backgroundColor,
    label: '背景颜色',
    uiType: UiTypeEnum.COLOR_PICKER,
    defaultValue: '#ffffff',
    currentValue: '#ffffff',
  },
  // 边距
  {
    field: SliderItemFieldEnum.slider_MarginPadding,
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
  },
  // 边框颜色
  {
    field: SliderItemFieldEnum.slider_borderColor,
    label: '边框颜色',
    uiType: UiTypeEnum.COLOR_PICKER,
    defaultValue: '#d9d9d9',
    currentValue: '#d9d9d9',
  },
  // 边框宽度
  {
    field: SliderItemFieldEnum.slider_borderWidth,
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
    field: SliderItemFieldEnum.slider_borderRadius,
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
    field: SliderItemFieldEnum.slider_borderStyle,
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
    field: SliderItemFieldEnum.slider_width,
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
    field: SliderItemFieldEnum.slider_height,
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
  // 最小值
  {
    field: SliderItemFieldEnum.slider_min,
    label: '最小值',
    uiType: UiTypeEnum.INPUT_NUMBER,
    defaultValue: 0,
    currentValue: 0,
    min: 0,
    max: 1000,
    step: 1,
  },
  // 最大值
  {
    field: SliderItemFieldEnum.slider_max,
    label: '最大值',
    uiType: UiTypeEnum.INPUT_NUMBER,
    defaultValue: 100,
    currentValue: 100,
    min: 0,
    max: 1000,
    step: 1,
  },
  // 步长
  {
    field: SliderItemFieldEnum.slider_step,
    label: '步长',
    uiType: UiTypeEnum.INPUT_NUMBER,
    defaultValue: 1,
    currentValue: 1,
    min: 0.1,
    max: 100,
    step: 0.1,
  },
  // 当前值
  {
    field: SliderItemFieldEnum.slider_value,
    label: '当前值',
    uiType: UiTypeEnum.INPUT_NUMBER,
    defaultValue: 50,
    currentValue: 50,
  },
  // 禁用
  {
    field: SliderItemFieldEnum.slider_disabled,
    label: '禁用',
    uiType: UiTypeEnum.GROUP,
    defaultValue: false,
    currentValue: false,
    options: [
      { label: '启用', value: false },
      { label: '禁用', value: true },
    ],
  },
  // 显示 tooltip
  {
    field: SliderItemFieldEnum.slider_showTooltip,
    label: '显示数值',
    uiType: UiTypeEnum.GROUP,
    defaultValue: true,
    currentValue: true,
    options: [
      { label: '显示', value: true },
      { label: '隐藏', value: false },
    ],
  },
  // 显示刻度
  {
    field: SliderItemFieldEnum.slider_showMarks,
    label: '显示刻度',
    uiType: UiTypeEnum.GROUP,
    defaultValue: false,
    currentValue: false,
    options: [
      { label: '显示', value: true },
      { label: '隐藏', value: false },
    ],
  },
];

export const SliderConfigList: ComponentsConfig = {
  componentName: 'Slider',
  componentType: ComponentTypeEnum.SLIDER,
  config: [
    {
      areaName: ConfigAreaEnum.layout,
      configItem: [
        SliderItemFieldEnum.slider_backgroundColor,
        SliderItemFieldEnum.slider_MarginPadding,
      ]
    },
    {
      areaName: ConfigAreaEnum.regular,
      configItem: [
        SliderItemFieldEnum.slider_width,
        SliderItemFieldEnum.slider_height,
        SliderItemFieldEnum.slider_min,
        SliderItemFieldEnum.slider_max,
        SliderItemFieldEnum.slider_step,
        SliderItemFieldEnum.slider_value,
        SliderItemFieldEnum.slider_disabled,
        SliderItemFieldEnum.slider_showTooltip,
        SliderItemFieldEnum.slider_showMarks,
      ]
    },
    {
      areaName: ConfigAreaEnum.border,
      configItem: [
        SliderItemFieldEnum.slider_borderColor,
        SliderItemFieldEnum.slider_borderWidth,
        SliderItemFieldEnum.slider_borderRadius,
        SliderItemFieldEnum.slider_borderStyle,
      ]
    },
  ],
};