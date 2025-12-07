import { type ConfigItem } from './ConfigItem';

export enum ConfigAreaEnum {
  layout = '布局',
  border = '边框',
  regular = '常规',
  text = '文字',
}

export enum ConfigItemFieldEnum {
  // 布局
  backgroundColor = 'backgroundColor',
  flexWrap = 'flexWrap',
  flexDirection = 'flexDirection',
  justifyContent = 'justifyContent',
  alignContent = 'alignContent',
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
  lineHeight = 'lineHeight',
  color = 'color',
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