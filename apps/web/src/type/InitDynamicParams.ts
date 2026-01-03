import { ComponentTypeEnum } from "@type/ComponentSchema";
import { ConfigItemFieldEnum } from "@type/Config";
import DynamicParams from "@type/DynamicParams";
export const initDynamicParams: DynamicParams[] = [
  {
    componentType: ComponentTypeEnum.IMAGE,
    [ConfigItemFieldEnum.width]: {
      currentValue: 100,
      defaultValue: 100,
      currentUnit: '%',
    },
    [ConfigItemFieldEnum.height]: {
      currentValue: 100,
      defaultValue: 100,
      currentUnit: '%',
    },
  },
  {
    componentType: ComponentTypeEnum.BUTTON,
    [ConfigItemFieldEnum.width]: {
      currentValue: 48,
      defaultValue: 48,
      currentUnit: 'px',
    },
    [ConfigItemFieldEnum.height]: {
      currentValue: 24,
      defaultValue: 24,
      currentUnit: 'px',
    },
  },
  {
    componentType: ComponentTypeEnum.INPUT,
    [ConfigItemFieldEnum.width]: {
      currentValue: 400,
      defaultValue: 400,
      currentUnit: 'px',
    },
    [ConfigItemFieldEnum.height]: {
      currentValue: 36,
      defaultValue: 36,
      currentUnit: 'px',
    },
    [ConfigItemFieldEnum.text]: {
      currentValue: '请输入文字...',
      defaultValue: '请输入文字...',
    },
  },
]