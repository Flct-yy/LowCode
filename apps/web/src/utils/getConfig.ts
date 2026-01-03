import { type ComponentSchema } from "@type/ComponentSchema";
import { ConfigItemFieldEnum, ConfigAreaEnum, type TotesConfig } from "@type/Config";

// 从组件配置中提取文字内容
export const getConfigText = (config: ComponentSchema['config']): string => {
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

// 从组件配置中提取图片内容
export const getConfigImageUrl = (config: ComponentSchema['config']): string => {
  const imageConfig: TotesConfig = config.find((item) => item.areaName === ConfigAreaEnum.image) || {
    areaName: ConfigAreaEnum.image,
    configItem: [],
  };
  let imageUrl = '';
  imageConfig.configItem.forEach((configItem) => {
    if (configItem.field === ConfigItemFieldEnum.imageUrl) {
      imageUrl = configItem.currentValue;
    }
  });
  return imageUrl;
}