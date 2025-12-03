import { type ConfigItem } from './ConfigItem';

export enum ConfigItemFieldEnum {
  backgroundColor = 'backgroundColor',
  flexWrap = 'flexWrap',
  flexDirection = 'flexDirection',
  justifyContent = 'justifyContent',
  alignContent = 'alignContent',
  MarginPadding = 'MarginPadding',
  borderColor = 'borderColor',
  borderWidth = 'borderWidth',
  borderRadius = 'borderRadius',
  borderStyle = 'borderStyle',
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