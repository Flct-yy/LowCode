import { ComponentTypeEnum } from './ComponentSchema';
import { UiTypeEnum } from './ConfigItem';
import { type ShortConfig, ConfigItemFieldEnum, ConfigAreaEnum } from './Config';

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
        areaName: ConfigAreaEnum.layout,
        configItem: [
          ConfigItemFieldEnum.backgroundColor,
          ConfigItemFieldEnum.flexWrap,
          ConfigItemFieldEnum.flexDirection,
          ConfigItemFieldEnum.justifyContent,
          ConfigItemFieldEnum.alignContent,
          ConfigItemFieldEnum.alignItems,
          ConfigItemFieldEnum.gap,
          ConfigItemFieldEnum.MarginPadding,
        ]
      },
      {
        areaName: ConfigAreaEnum.regular,
        configItem: [
          ConfigItemFieldEnum.width,
          ConfigItemFieldEnum.height,
        ]
      },
      {
        areaName: ConfigAreaEnum.border,
        configItem: [
          ConfigItemFieldEnum.borderColor,
          ConfigItemFieldEnum.borderWidth,
          ConfigItemFieldEnum.borderRadius,
          ConfigItemFieldEnum.borderStyle,
        ]
      },
    ],
  },
  {
    componentName: 'Text',
    componentType: ComponentTypeEnum.TEXT,
    config: [
      {
        areaName: ConfigAreaEnum.layout,
        configItem: [
          ConfigItemFieldEnum.backgroundColor,
          ConfigItemFieldEnum.MarginPadding,
        ]
      },
      {
        areaName: ConfigAreaEnum.border,
        configItem: [
          ConfigItemFieldEnum.borderColor,
          ConfigItemFieldEnum.borderWidth,
          ConfigItemFieldEnum.borderRadius,
          ConfigItemFieldEnum.borderStyle,
        ]
      },
      {
        areaName: ConfigAreaEnum.text,
        configItem: [
          ConfigItemFieldEnum.text,
          ConfigItemFieldEnum.fontSize,
          ConfigItemFieldEnum.fontWeight,
          ConfigItemFieldEnum.textAlign,
          ConfigItemFieldEnum.lineHeight,
          ConfigItemFieldEnum.color,
        ]
      },
    ],
  },
  {
    componentName: 'Image',
    componentType: ComponentTypeEnum.IMAGE,
    config: [
      {
        areaName: ConfigAreaEnum.layout,
        configItem: [
          ConfigItemFieldEnum.backgroundColor,
          ConfigItemFieldEnum.MarginPadding,
        ]
      },
      {
        areaName: ConfigAreaEnum.border,
        configItem: [
          ConfigItemFieldEnum.borderColor,
          ConfigItemFieldEnum.borderWidth,
          ConfigItemFieldEnum.borderRadius,
          ConfigItemFieldEnum.borderStyle,
        ]
      },
      {
        areaName: ConfigAreaEnum.image,
        configItem: [
          ConfigItemFieldEnum.imageUrl,
          ConfigItemFieldEnum.width,
          ConfigItemFieldEnum.height,
          ConfigItemFieldEnum.objectFit,
          ConfigItemFieldEnum.objectPosition,
          ConfigItemFieldEnum.opacity,
        ]
      },
    ],
  },
  {
    componentName: 'Button',
    componentType: ComponentTypeEnum.BUTTON,
    config: [
      {
        areaName: ConfigAreaEnum.layout,
        configItem: [
          ConfigItemFieldEnum.backgroundColor,
          ConfigItemFieldEnum.MarginPadding,
        ]
      },
      {
        areaName: ConfigAreaEnum.border,
        configItem: [
          ConfigItemFieldEnum.borderColor,
          ConfigItemFieldEnum.borderWidth,
          ConfigItemFieldEnum.borderRadius,
          ConfigItemFieldEnum.borderStyle,
        ]
      },
      {
        areaName: ConfigAreaEnum.text,
        configItem: [
          ConfigItemFieldEnum.text,
          ConfigItemFieldEnum.fontSize,
          ConfigItemFieldEnum.fontWeight,
          ConfigItemFieldEnum.textAlign,
          ConfigItemFieldEnum.lineHeight,
          ConfigItemFieldEnum.color,
        ]
      },
      {
        areaName: ConfigAreaEnum.regular,
        configItem: [
          ConfigItemFieldEnum.width,
          ConfigItemFieldEnum.height,
        ]
      },
    ],
  },

]

export default initConfigList;