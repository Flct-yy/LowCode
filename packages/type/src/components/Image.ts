import { ComponentTypeEnum } from "../ComponentSchema";
import { ComponentsConfig, ConfigAreaEnum } from "../Config";
import { ConfigItem, UiTypeEnum } from "../ConfigItem";

export const ImageItemFieldEnum = {
  image_backgroundColor: 'image.backgroundColor',
  image_MarginPadding: 'image.MarginPadding',
  image_borderColor: 'image.borderColor',
  image_borderWidth: 'image.borderWidth',
  image_borderRadius: 'image.borderRadius',
  image_borderStyle: 'image.borderStyle',
  image_imageUrl: 'image.imageUrl',
  image_width: 'image.width',
  image_height: 'image.height',
  image_objectFit: 'image.objectFit',
  image_objectPosition: 'image.objectPosition',
  image_opacity: 'image.opacity',
};

export const ImageConfigItem: ConfigItem[] = [
  // 背景颜色
  {
    field: ImageItemFieldEnum.image_backgroundColor,
    label: '背景颜色',
    uiType: UiTypeEnum.COLOR_PICKER,
    defaultValue: '#ffffff',
    currentValue: 'transparent',
  },
  // 边距
  {
    field: ImageItemFieldEnum.image_MarginPadding,
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
  },
  // 边框颜色
  {
    field: ImageItemFieldEnum.image_borderColor,
    label: '边框颜色',
    uiType: UiTypeEnum.COLOR_PICKER,
    defaultValue: '#000000',
    currentValue: 'transparent',
  },
  // 边框宽度
  {
    field: ImageItemFieldEnum.image_borderWidth,
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
    field: ImageItemFieldEnum.image_borderRadius,
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
    field: ImageItemFieldEnum.image_borderStyle,
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
  // 图片链接
  {
    field: ImageItemFieldEnum.image_imageUrl,
    label: '图片链接',
    uiType: UiTypeEnum.IMAGE_UPLOAD,
    defaultValue: '',
    currentValue: '',
  },
  // 宽度
  {
    field: ImageItemFieldEnum.image_width,
    label: '宽度',
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
  // 高度
  {
    field: ImageItemFieldEnum.image_height,
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
  // 图片缩放模式
  {
    field: ImageItemFieldEnum.image_objectFit,
    label: '图片缩放模式',
    uiType: UiTypeEnum.GROUP,
    defaultValue: 'contain',
    currentValue: 'contain',
    options: [
      { label: '包含', value: 'contain' },
      { label: '填充', value: 'cover' },
      { label: '拉伸', value: 'fill' },
      { label: '原始大小', value: 'none' },
      { label: '居中', value: 'scale-down' },
    ],
  },
  // 图片位置
  {
    field: ImageItemFieldEnum.image_objectPosition,
    label: '图片位置',
    uiType: UiTypeEnum.GROUP,
    defaultValue: 'center',
    currentValue: 'center',
    options: [
      { label: '居中', value: 'center' },
      { label: '顶部', value: 'top' },
      { label: '底部', value: 'bottom' },
      { label: '左侧', value: 'left' },
      { label: '右侧', value: 'right' },
      { label: '左上', value: 'top left' },
      { label: '右上', value: 'top right' },
      { label: '左下', value: 'bottom left' },
      { label: '右下', value: 'bottom right' },
    ],
  },
  // 透明度
  {
    field: ImageItemFieldEnum.image_opacity,
    label: '透明度',
    uiType: UiTypeEnum.INPUT_NUMBER,
    defaultValue: 100,
    currentValue: 100,
    min: 0,
    max: 100,
    step: 1,
    unit: '%',
  },
];

export const ImageConfigList: ComponentsConfig = {
  componentName: 'Image',
  componentType: ComponentTypeEnum.IMAGE,
  config: [
    {
      areaName: ConfigAreaEnum.layout,
      configItem: [
        ImageItemFieldEnum.image_backgroundColor,
        ImageItemFieldEnum.image_MarginPadding,
      ]
    },
    {
      areaName: ConfigAreaEnum.regular,
      configItem: [
        ImageItemFieldEnum.image_width,
        ImageItemFieldEnum.image_height,
      ]
    },
    {
      areaName: ConfigAreaEnum.border,
      configItem: [
        ImageItemFieldEnum.image_borderColor,
        ImageItemFieldEnum.image_borderWidth,
        ImageItemFieldEnum.image_borderRadius,
        ImageItemFieldEnum.image_borderStyle,
      ]
    },
    {
      areaName: ConfigAreaEnum.image,
      configItem: [
        ImageItemFieldEnum.image_imageUrl,
        ImageItemFieldEnum.image_objectFit,
        ImageItemFieldEnum.image_objectPosition,
        ImageItemFieldEnum.image_opacity,
      ]
    },
  ],
};