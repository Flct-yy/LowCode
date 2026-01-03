import initConfigItem from "@type/InitConfigItem";
import initConfigList from '@type/InitConfigList';
import { ConfigItemFieldEnum, type TotesConfig } from "@type/Config";
import { type ConfigItem } from "@type/ConfigItem";
import { ComponentTypeEnum } from "@type/ComponentSchema";
import type DynamicParams from "@type/DynamicParams";

// 生成组件的配置
export default function generateComConfig(componentType: ComponentTypeEnum, dynamicParams: DynamicParams): TotesConfig[] {
  const dynamicParamsFields = Object.keys(dynamicParams);
  let config: TotesConfig[] = [];
  const configList = initConfigList.find((item) => item.componentType === componentType);
  if (configList) {
    config = configList.config.map((item) => ({
      ...item,
      configItem: item.configItem.map((field) => {
        const configItem = initConfigItem.find((configItem) => configItem.field === field);
        const params = dynamicParamsFields.includes(field) ? dynamicParams[field as keyof DynamicParams] ?? {} : {};
        return (
          {
            ...configItem,
            ...params,
          } as ConfigItem
        ) as ConfigItem;
      }),
    } as TotesConfig));
  }
  return config;
}