import { type ConfigItem } from './ConfigItem';

export enum ConfigAreaEnum {
  layout = '布局',
  border = '边框',
  regular = '常规',
  text = '文字',
  image = '图片',
}

export enum ConfigItemFieldEnum {
  // 布局
  backgroundColor = 'backgroundColor',
  flexWrap = 'flexWrap',
  flexDirection = 'flexDirection',
  justifyContent = 'justifyContent',
  alignContent = 'alignContent',
  alignItems = 'alignItems',
  gap = 'gap',
  MarginPadding = 'MarginPadding',
  // 边框
  borderColor = 'borderColor',
  borderWidth = 'borderWidth',
  borderRadius = 'borderRadius',
  borderStyle = 'borderStyle',
  // 常规
  width = 'width',
  height = 'height',
  // 文字
  text = 'text',
  fontSize = 'fontSize',
  fontWeight = 'fontWeight',
  textAlign = 'textAlign',
  lineHeight = 'lineHeight',
  color = 'color',
  // 图片
  imageUrl = 'imageUrl',
  imageWidth = 'imageWidth',
  imageHeight = 'imageHeight',
  objectFit = 'objectFit',
  objectPosition = 'objectPosition',
  opacity = 'opacity',
  // 按钮
  buttonWidth = 'buttonWidth',
  buttonHeight = 'buttonHeight',

}

interface ConfigArea {
  areaName: string;
}

export interface ShortConfig extends ConfigArea {
  configItem: ConfigItemFieldEnum[];
}

export interface TotesConfig extends ConfigArea {
  configItem: ConfigItem[];
}