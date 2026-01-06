import { ConfigItemFieldEnum,ConfigAreaEnum } from "@wect/type";
import { ComponentTypeEnum } from "@wect/type";
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