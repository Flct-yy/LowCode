import { type ConfigItem, UiTypeEnum } from "@type/ConfigItem";
import { ConfigItemFieldEnum } from "@type/Config";


const initConfigItem: ConfigItem[] = [
  // 背景颜色
  {
    field: ConfigItemFieldEnum.backgroundColor,
    label: '背景颜色',
    uiType: UiTypeEnum.COLOR_PICKER,
    defaultValue: '#ffffff',
    currentValue: 'transparent',
  },
  // 换行
  {
    field: ConfigItemFieldEnum.flexWrap,
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
    field: ConfigItemFieldEnum.flexDirection,
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
  // 多行对齐
  {
    field: ConfigItemFieldEnum.alignContent,
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
    field: ConfigItemFieldEnum.alignItems,
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
    field: ConfigItemFieldEnum.gap,
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
  // 边距
  {
    field: ConfigItemFieldEnum.MarginPadding,
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
    field: ConfigItemFieldEnum.borderColor,
    label: '边框颜色',
    uiType: UiTypeEnum.COLOR_PICKER,
    defaultValue: '#000000',
    currentValue: '#000000',
  },
  // 边框宽度
  {
    field: ConfigItemFieldEnum.borderWidth,
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
    field: ConfigItemFieldEnum.borderRadius,
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
    field: ConfigItemFieldEnum.borderStyle,
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
  // 宽度
  {
    field: ConfigItemFieldEnum.width,
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
    field: ConfigItemFieldEnum.height,
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
  // 文字
  {
    field: ConfigItemFieldEnum.text,
    label: '文字',
    uiType: UiTypeEnum.INPUT,
    placeholder: '请输入文字',
    defaultValue: 'Text',
    currentValue: 'Text',
  },
  // 字体大小
  {
    field: ConfigItemFieldEnum.fontSize,
    label: '字体大小',
    uiType: UiTypeEnum.INPUT_NUMBER,
    defaultValue: 16,
    currentValue: 16,
    min: 0,
    max: 100,
    step: 1,
    unit: 'px',
  },
  // 字体粗细
  {
    field: ConfigItemFieldEnum.fontWeight,
    label: '字体粗细',
    uiType: UiTypeEnum.SELECT,
    defaultValue: 'normal',
    currentValue: 'normal',
    options: [
      { label: '正常', value: 'normal' },
      { label: '加粗', value: 'bold' },
    ],
  },
  // 字体居中
  {
    field: ConfigItemFieldEnum.textAlign,
    label: '字体居中',
    uiType: UiTypeEnum.SELECT,
    defaultValue: 'center',
    currentValue: 'center',
    options: [
      { label: '左对齐', value: 'left' },
      { label: '居中', value: 'center' },
      { label: '右对齐', value: 'right' },
    ],
  },
  // 行高
  {
    field: ConfigItemFieldEnum.lineHeight,
    label: '行高',
    uiType: UiTypeEnum.INPUT_NUMBER,
    defaultValue: 16,
    currentValue: 16,
    min: 0,
    max: 100,
    step: 1,
    unit: 'px',
  },
  // 字体颜色
  {
    field: ConfigItemFieldEnum.color,
    label: '字体颜色',
    uiType: UiTypeEnum.COLOR_PICKER,
    defaultValue: '#000000',
    currentValue: '#000000',
  },
  // 图片
  {
    field: ConfigItemFieldEnum.imageUrl,
    label: '图片',
    uiType: UiTypeEnum.IMAGE_UPLOAD,
    defaultValue: '',
    currentValue: '',
  },
  // 图片缩放模式
  {
    field: ConfigItemFieldEnum.objectFit,
    label: '图片缩放模式',
    uiType: UiTypeEnum.SELECT,
    defaultValue: 'contain',
    currentValue: 'contain',
    options: [
      { label: '包含', value: 'contain' },
      { label: '填充', value: 'cover' },
    ],
  },
  // 图片位置
  {
    field: ConfigItemFieldEnum.objectPosition,
    label: '图片位置',
    uiType: UiTypeEnum.SELECT,
    defaultValue: 'center',
    currentValue: 'center',
    options: [
      { label: '居中', value: 'center' },
      { label: '顶部', value: 'top' },
      { label: '底部', value: 'bottom' },
      { label: '左侧', value: 'left' },
      { label: '右侧', value: 'right' },
    ],
  },
  // 图片透明度
  {
    field: ConfigItemFieldEnum.opacity,
    label: '图片透明度',
    uiType: UiTypeEnum.INPUT_NUMBER,
    defaultValue: 1,
    currentValue: 1,
    min: 0,
    max: 1,
    step: 0.1,
    unit: '',
  },
]

export default initConfigItem;