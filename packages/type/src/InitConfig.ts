import { FlexItemFieldEnum, FlexConfigItem, FlexConfigList } from "./components/Flex";
import { TextItemFieldEnum, TextConfigItem, TextConfigList } from "./components/Text";
import { ImageItemFieldEnum, ImageConfigItem, ImageConfigList } from "./components/Image";
import { InputItemFieldEnum, InputConfigItem, InputConfigList } from "./components/Input";
import { ButtonItemFieldEnum, ButtonConfigItem, ButtonConfigList } from "./components/Button";
import { ComponentsConfig } from "./Config";
import { ConfigItem } from "./ConfigItem";

const ConfigItemFieldEnum = {
  ...FlexItemFieldEnum,
  ...TextItemFieldEnum,
  ...ImageItemFieldEnum,
  ...InputItemFieldEnum,
  ...ButtonItemFieldEnum,
} as const;

type ConfigItemFieldEnum = (typeof ConfigItemFieldEnum)[keyof typeof ConfigItemFieldEnum];

const initConfigItem: ConfigItem[] = [
  ...FlexConfigItem,
  ...TextConfigItem,
  ...ImageConfigItem,
  ...InputConfigItem,
  ...ButtonConfigItem,
];

const initConfigList: ComponentsConfig[] = [
  FlexConfigList,
  TextConfigList,
  ImageConfigList,
  InputConfigList,
  ButtonConfigList,
];

export { ConfigItemFieldEnum, initConfigItem, initConfigList };
