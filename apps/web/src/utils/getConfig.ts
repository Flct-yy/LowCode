import { type ComponentSchema } from "@wect/type";
import { ConfigItemFieldEnum, ConfigAreaEnum, type TotesConfig } from "@wect/type";

// 从组件配置中提取图片内容
export const getConfigImageUrl = (config: ComponentSchema['config']): string => {
  const imageConfig: TotesConfig = config.find((item) => item.areaName === ConfigAreaEnum.image) || {
    areaName: ConfigAreaEnum.image,
    configItem: [],
  };
  let imageUrl = '';
  imageConfig.configItem.forEach((configItem) => {
    if (configItem.field === ConfigItemFieldEnum.image_imageUrl) {
      imageUrl = configItem.currentValue;
    }
  });
  return imageUrl;
}