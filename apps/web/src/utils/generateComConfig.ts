import { type TotesConfig } from "@wect/type";
import { type ConfigItem } from "@wect/type";
import { ComponentTypeEnum, initConfigList, initConfigItem } from "@wect/type";

// 生成组件的配置
export default function generateComConfig(componentType: ComponentTypeEnum): TotesConfig[] {
  let config: TotesConfig[] = [];
  const configList = initConfigList.find((item) => item.componentType === componentType);
  if (configList) {
    config = configList.config.map((item) => ({
      ...item,
      configItem: item.configItem.map((field: any) => {
        const configItem = initConfigItem.find((configItem) => configItem.field === field);
        return (
          {
            ...configItem,
          } as ConfigItem
        ) as ConfigItem;
      }),
    } as TotesConfig));
  }
  return config;
}