import { type ComponentSchema } from "@type/ComponentSchema";
import { ConfigItemFieldEnum, ConfigAreaEnum, type TotesConfig } from "@type/Config";

// 从组件配置中提取文字内容
const convertConfigToStyle = (config: ComponentSchema['config']): string => {
  const textConfig: TotesConfig = config.find((item) => item.areaName === ConfigAreaEnum.text) || {
    areaName: ConfigAreaEnum.text,
    configItem: [],
  };
  let text = '';
  textConfig.configItem.forEach((configItem) => {
    if (configItem.field === ConfigItemFieldEnum.text) {
      text = configItem.currentValue;
    }
  });
  return text;
}

export default convertConfigToStyle;