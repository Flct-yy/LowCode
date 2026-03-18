import { ComponentTypeEnum } from './ComponentSchema';
import { ConfigItemFieldEnum } from './InitConfig';
import { type ConfigItem } from './ConfigItem';

export enum ConfigAreaEnum {
  layout = '布局',
  border = '边框',
  regular = '常规',
  text = '文字',
  image = '图片',
}

interface ConfigArea {
  areaName: string;
}

export interface ShortConfig extends ConfigArea {
  configItem: string[];
}

export interface TotesConfig extends ConfigArea {
  configItem: ConfigItem[];
}

export interface ComponentsConfig {
  componentName: ConfigItemFieldEnum;
  componentType: ComponentTypeEnum;
  config: ShortConfig[];
}