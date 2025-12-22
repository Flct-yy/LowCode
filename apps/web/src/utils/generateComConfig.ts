import initConfigItem from "@type/InitConfigItem";
import initConfigList from '@type/InitConfigList';
import { type TotesConfig } from "@type/Config";
import { type ConfigItem } from "@type/ConfigItem";
import { ComponentTypeEnum } from "@type/ComponentSchema";

// 生成组件的配置
export default function generateComConfig(componentType: ComponentTypeEnum): TotesConfig[] {
  let config: TotesConfig[] = [];
  const configList = initConfigList.find((item) => item.componentType === componentType);
  if (configList) {
    config = configList.config.map((item) => ({
      ...item,
      configItem: item.configItem.map((field) => ({
        ...initConfigItem.find((configItem) => configItem.field === field),
      } as ConfigItem)),
    } as TotesConfig));
  }
  return config;
}