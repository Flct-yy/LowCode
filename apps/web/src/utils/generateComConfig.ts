import initConfigItem from "@type/InitConfigItem";
import initConfigList from '@type/InitConfigList';
import { type TotesConfig } from "@type/Config";
import { type ConfigItem } from "@type/ConfigItem";
import { ComponentTypeEnum } from "@type/ComponentSchema";

export default function generateComConfig(componentType: ComponentTypeEnum): TotesConfig[] {
  let config: TotesConfig[] = [];
  switch (componentType) {
    case ComponentTypeEnum.VIRTUAL:
      const virtualConfig = initConfigList.find((item) => item.componentType === componentType);
      if (virtualConfig) {
        config = virtualConfig.config.map((item) => ({
          ...item,
          configItem: item.configItem.map((field) => ({
            ...initConfigItem.find((configItem) => configItem.field === field),
          } as ConfigItem)),
        } as TotesConfig));
      }
      break;
    case ComponentTypeEnum.FLEX:
      // flexConfig: Flex组件的简写配置数组 
      const flexConfig = initConfigList.find((item) => item.componentType === componentType);
      if (flexConfig) {
        config = flexConfig.config.map((item) => ({
          ...item,
          configItem: item.configItem.map((field) => ({
            ...initConfigItem.find((configItem) => configItem.field === field),
          } as ConfigItem)),
        } as TotesConfig));
      }
      break;
    default:
      break;
  }

  return config;
}