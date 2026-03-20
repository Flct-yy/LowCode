import { FlexItemFieldEnum, FlexConfigItem, FlexConfigList } from "./components/Flex";
import { TextItemFieldEnum, TextConfigItem, TextConfigList } from "./components/Text";
import { ImageItemFieldEnum, ImageConfigItem, ImageConfigList } from "./components/Image";
import { InputItemFieldEnum, InputConfigItem, InputConfigList } from "./components/Input";
import { ButtonItemFieldEnum, ButtonConfigItem, ButtonConfigList } from "./components/Button";
import { SliderItemFieldEnum, SliderConfigItem, SliderConfigList } from "./components/Slider";
import { LabelItemFieldEnum, LabelConfigItem, LabelConfigList } from "./components/Label";
import { TextareaItemFieldEnum, TextareaConfigItem, TextareaConfigList } from "./components/Textarea";
import { SwitchItemFieldEnum, SwitchConfigItem, SwitchConfigList } from "./components/Switch";
import { FormItemFieldEnum, FormConfigItem, FormConfigList } from "./components/Form";
import { CardItemFieldEnum, CardConfigItem, CardConfigList } from "./components/Card";
import { CalendarItemFieldEnum, CalendarConfigItem, CalendarConfigList } from "./components/Calendar";
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
  ...SwitchItemFieldEnum,
  ...FormItemFieldEnum,
  ...CardItemFieldEnum,
  ...CalendarItemFieldEnum,
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
  ...SwitchConfigItem,
  ...FormConfigItem,
  ...CardConfigItem,
  ...CalendarConfigItem,
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
  SwitchConfigList,
  FormConfigList,
  CardConfigList,
  CalendarConfigList,
];

export { ConfigItemFieldEnum, initConfigItem, initConfigList };
