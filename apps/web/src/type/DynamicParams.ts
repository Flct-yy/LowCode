import { ConfigItemFieldEnum,ConfigAreaEnum } from "@type/Config";
import { ComponentTypeEnum } from "@type/ComponentSchema";
export default interface DynamicParams {
  componentType: ComponentTypeEnum;
  [ConfigItemFieldEnum.width]?: {
    currentValue: any;
    defaultValue: any;
    currentUnit: string;
  };
  [ConfigItemFieldEnum.height]?: {
    currentValue: any;
    defaultValue: any;
    currentUnit: string;
  };
  [ConfigItemFieldEnum.text]?: {
    currentValue: any;
    defaultValue: any;
  };
}