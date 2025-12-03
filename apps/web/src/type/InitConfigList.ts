import { ComponentTypeEnum } from './ComponentSchema';
import { UiTypeEnum } from './ConfigItem';
import { type ShortConfig, ConfigItemFieldEnum } from './Config';

export interface InitConfigItem {
  componentName: string;
  componentType: ComponentTypeEnum;
  config: ShortConfig[];
}

// 组件列表 默认组件
const initConfigList: InitConfigItem[] = [
  {
    componentName: 'Flex',
    componentType: ComponentTypeEnum.FLEX,
    config: [
      {
        areaName: '布局',
        configItem: [
          ConfigItemFieldEnum.backgroundColor,
          ConfigItemFieldEnum.flexWrap,
          ConfigItemFieldEnum.flexDirection,
          ConfigItemFieldEnum.justifyContent,
          ConfigItemFieldEnum.alignContent,
          ConfigItemFieldEnum.MarginPadding,
        ]
      },
      {
        areaName: '边框',
        configItem: [
          ConfigItemFieldEnum.borderColor,
          ConfigItemFieldEnum.borderWidth,
          ConfigItemFieldEnum.borderRadius,
          ConfigItemFieldEnum.borderStyle,
        ]
      }
    ],
  },

]

export default initConfigList;