import { FlexItemFieldEnum, FlexConfigItem, FlexConfigList } from "./components/Flex";
import { TextItemFieldEnum, TextConfigItem, TextConfigList } from "./components/Text";
import { ImageItemFieldEnum, ImageConfigItem, ImageConfigList } from "./components/Image";
import { InputItemFieldEnum, InputConfigItem, InputConfigList } from "./components/Input";
import { ButtonItemFieldEnum, ButtonConfigItem, ButtonConfigList } from "./components/Button";
import { SliderItemFieldEnum, SliderConfigItem, SliderConfigList } from "./components/Slider";
import { LabelItemFieldEnum, LabelConfigItem, LabelConfigList } from "./components/Label";
import { TextareaItemFieldEnum, TextareaConfigItem, TextareaConfigList } from "./components/Textarea";
import { ComponentsConfig } from "./Config";
import { ConfigItem } from "./ConfigItem";

const ConfigItemFieldEnum = {
  ...FlexItemFieldEnum,
  ...TextItemFieldEnum,
  ...ImageItemFieldEnum,
  ...InputItemFieldEnum,
  ...ButtonItemFieldEnum,
  ...SliderItemFieldEnum,
  ...LabelItemFieldEnum,
  ...TextareaItemFieldEnum,
} as const;

type ConfigItemFieldEnum = (typeof ConfigItemFieldEnum)[keyof typeof ConfigItemFieldEnum];

const initConfigItem: ConfigItem[] = [
  ...FlexConfigItem,
  ...TextConfigItem,
  ...ImageConfigItem,
  ...InputConfigItem,
  ...ButtonConfigItem,
  ...SliderConfigItem,
  ...LabelConfigItem,
  ...TextareaConfigItem,
];

const initConfigList: ComponentsConfig[] = [
  FlexConfigList,
  TextConfigList,
  ImageConfigList,
  InputConfigList,
  ButtonConfigList,
  SliderConfigList,
  LabelConfigList,
  TextareaConfigList,
];

export { ConfigItemFieldEnum, initConfigItem, initConfigList };
