import { type ConfigItem, UiTypeEnum } from "@type/ConfigItem";
import { ConfigItemFieldEnum } from "@type/Config";


const initConfigItem: ConfigItem[] = [
  {
    field: ConfigItemFieldEnum.backgroundColor,
    label: '背景颜色',
    uiType: UiTypeEnum.COLOR_PICKER,
    defaultValue: '#ffffff',
    currentValue: '#ffffff',
  },
  {
    field: ConfigItemFieldEnum.flexWrap,
    label: '换行',
    uiType: UiTypeEnum.SELECT,
    defaultValue: 'nowrap',
    currentValue: 'nowrap',
    options: [
      { label: '换行', value: 'wrap' },
      { label: '不换行', value: 'nowrap' },
    ],
  },
  {
    field: ConfigItemFieldEnum.flexDirection,
    label: '主轴方向',
    uiType: UiTypeEnum.SELECT,
    defaultValue: 'row',
    currentValue: 'row',
    options: [
      { label: '水平方向', value: 'row' },
      { label: '垂直方向', value: 'column' },
    ],
  },
  {
    field: ConfigItemFieldEnum.justifyContent,
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
  {
    field: ConfigItemFieldEnum.alignContent,
    label: '侧轴对齐',
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
  {
    field: ConfigItemFieldEnum.MarginPadding,
    label: '边距',
    uiType: UiTypeEnum.MARGIN_PADDING,
    defaultValue: {
      topMargin: 0,
      rightMargin: 0,
      bottomMargin: 0,
      leftMargin: 0,
      topPadding: 0,
      rightPadding: 0,
      bottomPadding: 0,
      leftPadding: 0,
    },
    currentValue: {
      topMargin: 0,
      rightMargin: 0,
      bottomMargin: 0,
      leftMargin: 0,
      topPadding: 0,
      rightPadding: 0,
      bottomPadding: 0,
      leftPadding: 0,
    },
  },
  {
    field: ConfigItemFieldEnum.borderColor,
    label: '边框颜色',
    uiType: UiTypeEnum.COLOR_PICKER,
    defaultValue: '#000000',
    currentValue: '#000000',
  },
  {
    field: ConfigItemFieldEnum.borderWidth,
    label: '边框宽度',
    uiType: UiTypeEnum.INPUT_NUMBER,
    defaultValue: 0,
    currentValue: 0,
    min: 0,
    max: 100,
    step: 1,
  },
  {
    field: ConfigItemFieldEnum.borderRadius,
    label: '边框圆角',
    uiType: UiTypeEnum.INPUT_NUMBER,
    defaultValue: 0,
    currentValue: 0,
    min: 0,
    max: 100,
    step: 1,
  },
  {
    field: ConfigItemFieldEnum.borderStyle,
    label: '边框样式',
    uiType: UiTypeEnum.SELECT,
    defaultValue: 'solid',
    currentValue: 'solid',
    options: [
      { label: '实线', value: 'solid' },
      { label: '虚线', value: 'dashed' },
      { label: '点线', value: 'dotted' },
    ],
  },
]

export default initConfigItem;