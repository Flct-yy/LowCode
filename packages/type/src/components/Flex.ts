import { ComponentTypeEnum } from "../ComponentSchema";
import { ComponentsConfig, ConfigAreaEnum } from "../Config";
import { ConfigItem, UiTypeEnum } from "../ConfigItem"

export const FlexItemFieldEnum = {
  flex_backgroundColor: 'flex.backgroundColor',
  flex_flexWrap: 'flex.flexWrap',
  flex_flexDirection: 'flex.flexDirection',
  flex_justifyContent: 'flex.justifyContent',
  flex_alignContent: 'flex.alignContent',
  flex_alignItems: 'flex.alignItems',
  flex_gap: 'flex.gap',
  flex_MarginPadding: 'flex.MarginPadding',
  flex_width: 'flex.width',
  flex_height: 'flex.height',
  flex_borderColor: 'flex.borderColor',
  flex_borderWidth: 'flex.borderWidth',
  flex_borderRadius: 'flex.borderRadius',
  flex_borderStyle: 'flex.borderStyle',
};

export const FlexConfigItem: ConfigItem[] = [
  // 背景颜色
  {
    field: FlexItemFieldEnum.flex_backgroundColor,
    label: '背景颜色',
    uiType: UiTypeEnum.COLOR_PICKER,
    defaultValue: '#ffffff',
    currentValue: 'transparent',
  },
  // 换行
  {
    field: FlexItemFieldEnum.flex_flexWrap,
    label: '换行',
    uiType: UiTypeEnum.GROUP,
    defaultValue: 'nowrap',
    currentValue: 'nowrap',
    options: [
      { label: '换行', value: 'wrap' },
      { label: '不换行', value: 'nowrap' },
    ],
  },
  // 主轴方向
  {
    field: FlexItemFieldEnum.flex_flexDirection,
    label: '主轴方向',
    uiType: UiTypeEnum.GROUP,
    defaultValue: 'row',
    currentValue: 'row',
    options: [
      { label: '水平方向', value: 'row' },
      { label: '垂直方向', value: 'column' },
    ],
  },
  // 主轴对齐
  {
    field: FlexItemFieldEnum.flex_justifyContent,
    label: '主轴对齐',
    uiType: UiTypeEnum.SELECT,
    defaultValue: 'center',
    currentValue: 'center',
    options: [
      { label: '左对齐', value: 'flex-start' },
      { label: '居中', value: 'center' },
      { label: '右对齐', value: 'flex-end' },
      { label: '均匀分布', value: 'space-around' },
      { label: '两侧分布', value: 'space-between' },
    ],
  },
  // 多行对齐
  {
    field: FlexItemFieldEnum.flex_alignContent,
    label: '多行对齐',
    uiType: UiTypeEnum.SELECT,
    defaultValue: 'center',
    currentValue: 'center',
    options: [
      { label: '左对齐', value: 'flex-start' },
      { label: '居中', value: 'center' },
      { label: '右对齐', value: 'flex-end' },
      { label: '均匀分布', value: 'space-around' },
      { label: '两侧分布', value: 'space-between' },
    ],
  },
  // 侧轴对齐
  {
    field: FlexItemFieldEnum.flex_alignItems,
    label: '侧轴对齐',
    uiType: UiTypeEnum.SELECT,
    defaultValue: 'center',
    currentValue: 'center',
    options: [
      { label: '左对齐', value: 'flex-start' },
      { label: '居中', value: 'center' },
      { label: '右对齐', value: 'flex-end' },
      { label: '基线对齐', value: 'baseline' },
      { label: '拉伸', value: 'stretch' },
    ],
  },
  // 间距
  {
    field: FlexItemFieldEnum.flex_gap,
    label: '间距',
    uiType: UiTypeEnum.DOUBLE_INPUT_NUMBER,
    defaultValue: {
      one: 0,
      two: 0,
    },
    currentValue: {
      one: 0,
      two: 0,
    },
    min: 0,
    max: 100,
    step: 1,
    unit: 'px',
  },
  // 宽度
  {
    field: FlexItemFieldEnum.flex_width,
    label: '宽度',
    uiType: UiTypeEnum.INPUT_NUMBER,
    defaultValue: 100,
    currentValue: 100,
    step: 1,
    currentUnit: '%',
    units: [
      { label: 'px', value: 'px' },
      { label: '%', value: '%' },
    ],
    mins: [0, 0],
    maxs: [1000, 100],
  },
  // 高度
  {
    field: FlexItemFieldEnum.flex_height,
    label: '高度',
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
  // 边距
  {
    field: FlexItemFieldEnum.flex_MarginPadding,
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
  // 边距
  {
    field: FlexItemFieldEnum.flex_MarginPadding,
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
    field: FlexItemFieldEnum.flex_borderColor,
    label: '边框颜色',
    uiType: UiTypeEnum.COLOR_PICKER,
    defaultValue: '#000000',
    currentValue: '#000000',
  },
  // 边框宽度
  {
    field: FlexItemFieldEnum.flex_borderWidth,
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
    field: FlexItemFieldEnum.flex_borderRadius,
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
    field: FlexItemFieldEnum.flex_borderStyle,
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
];

export const FlexConfigList: ComponentsConfig = {
  componentName: 'Flex',
  componentType: ComponentTypeEnum.FLEX,
  config: [
    {
      areaName: ConfigAreaEnum.layout,
      configItem: [
        FlexItemFieldEnum.flex_backgroundColor,
        FlexItemFieldEnum.flex_flexWrap,
        FlexItemFieldEnum.flex_flexDirection,
        FlexItemFieldEnum.flex_justifyContent,
        FlexItemFieldEnum.flex_alignContent,
        FlexItemFieldEnum.flex_alignItems,
        FlexItemFieldEnum.flex_gap,
        FlexItemFieldEnum.flex_MarginPadding,
      ]
    },
    {
      areaName: ConfigAreaEnum.regular,
      configItem: [
        FlexItemFieldEnum.flex_width,
        FlexItemFieldEnum.flex_height,
      ]
    },
    {
      areaName: ConfigAreaEnum.border,
      configItem: [
        FlexItemFieldEnum.flex_borderColor,
        FlexItemFieldEnum.flex_borderWidth,
        FlexItemFieldEnum.flex_borderRadius,
        FlexItemFieldEnum.flex_borderStyle,
      ]
    },
  ],
}