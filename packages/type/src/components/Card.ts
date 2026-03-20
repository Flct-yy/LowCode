import { ComponentTypeEnum } from "../ComponentSchema";
import { ComponentsConfig, ConfigAreaEnum } from "../Config";
import { ConfigItem, UiTypeEnum } from "../ConfigItem";

export const CardItemFieldEnum = {
  card_backgroundColor: 'card.backgroundColor',
  card_MarginPadding: 'card.MarginPadding',
  card_borderColor: 'card.borderColor',
  card_borderWidth: 'card.borderWidth',
  card_borderRadius: 'card.borderRadius',
  card_borderStyle: 'card.borderStyle',
  card_width: 'card.width',
  card_height: 'card.height',
  card_title: 'card.title',
  card_content: 'card.content',
};

export const CardConfigItem: ConfigItem[] = [
  // 背景颜色
  {
    field: CardItemFieldEnum.card_backgroundColor,
    label: '背景颜色',
    uiType: UiTypeEnum.COLOR_PICKER,
    defaultValue: '#ffffff',
    currentValue: '#ffffff',
  },
  // 边距
  {
    field: CardItemFieldEnum.card_MarginPadding,
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
        top: 16,
        right: 16,
        bottom: 16,
        left: 16,
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
        top: 16,
        right: 16,
        bottom: 16,
        left: 16,
      },
    },
    unit: 'px',
  },
  // 边框颜色
  {
    field: CardItemFieldEnum.card_borderColor,
    label: '边框颜色',
    uiType: UiTypeEnum.COLOR_PICKER,
    defaultValue: '#e8e8e8',
    currentValue: '#e8e8e8',
  },
  // 边框宽度
  {
    field: CardItemFieldEnum.card_borderWidth,
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
    field: CardItemFieldEnum.card_borderRadius,
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
    field: CardItemFieldEnum.card_borderStyle,
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
    field: CardItemFieldEnum.card_width,
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
    field: CardItemFieldEnum.card_height,
    label: '高度',
    uiType: UiTypeEnum.INPUT_NUMBER,
    defaultValue: 200,
    currentValue: 200,
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
  // 标题
  {
    field: CardItemFieldEnum.card_title,
    label: '标题',
    uiType: UiTypeEnum.INPUT,
    placeholder: '请输入卡片标题',
    defaultValue: '卡片标题',
    currentValue: '卡片标题',
  },
  // 内容
  {
    field: CardItemFieldEnum.card_content,
    label: '内容',
    uiType: UiTypeEnum.INPUT,
    placeholder: '请输入卡片内容',
    defaultValue: '卡片内容',
    currentValue: '卡片内容',
  },
];

export const CardConfigList: ComponentsConfig = {
  componentName: 'Card',
  componentType: ComponentTypeEnum.CARD,
  config: [
    {
      areaName: ConfigAreaEnum.layout,
      configItem: [
        CardItemFieldEnum.card_backgroundColor,
        CardItemFieldEnum.card_MarginPadding,
      ]
    },
    {
      areaName: ConfigAreaEnum.regular,
      configItem: [
        CardItemFieldEnum.card_width,
        CardItemFieldEnum.card_height,
      ]
    },
    {
      areaName: ConfigAreaEnum.border,
      configItem: [
        CardItemFieldEnum.card_borderColor,
        CardItemFieldEnum.card_borderWidth,
        CardItemFieldEnum.card_borderRadius,
        CardItemFieldEnum.card_borderStyle,
      ]
    },
    {
      areaName: ConfigAreaEnum.content,
      configItem: [
        CardItemFieldEnum.card_title,
        CardItemFieldEnum.card_content,
      ]
    },
  ],
};