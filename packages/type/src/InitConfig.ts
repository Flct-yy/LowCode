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
import { PaginationItemFieldEnum, PaginationConfigItem, PaginationConfigList } from "./components/Pagination";
import { TableItemFieldEnum, TableConfigItem, TableConfigList } from "./components/Table";
import { MenuItemFieldEnum, MenuConfigItem, MenuConfigList } from "./components/Menu";
import { TimePickerItemFieldEnum, TimePickerConfigItem, TimePickerConfigList } from "./components/TimePicker";
import { LineChartItemFieldEnum, LineChartConfigItem, LineChartConfigList } from "./components/LineChart";
import { BarChartItemFieldEnum, BarChartConfigItem, BarChartConfigList } from "./components/BarChart";
import { PieChartItemFieldEnum, PieChartConfigItem, PieChartConfigList } from "./components/PieChart";
import { RadarChartItemFieldEnum, RadarChartConfigItem, RadarChartConfigList } from "./components/RadarChart";
import { TimelineItemFieldEnum, TimelineConfigItem, TimelineConfigList } from "./components/Timeline";
import { DrawerItemFieldEnum, DrawerConfigItem, DrawerConfigList } from "./components/Drawer";
import { RadioItemFieldEnum, RadioConfigItem, RadioConfigList } from "./components/Radio";
import { SelectItemFieldEnum, SelectConfigItems, SelectConfigList } from "./components/Select";
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
  ...PaginationItemFieldEnum,
  ...TableItemFieldEnum,
  ...MenuItemFieldEnum,
  ...TimePickerItemFieldEnum,
  ...LineChartItemFieldEnum,
  ...BarChartItemFieldEnum,
  ...PieChartItemFieldEnum,
  ...RadarChartItemFieldEnum,
  ...TimelineItemFieldEnum,
  ...DrawerItemFieldEnum,
  ...RadioItemFieldEnum,
  ...SelectItemFieldEnum,
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
  ...PaginationConfigItem,
  ...TableConfigItem,
  ...MenuConfigItem,
  ...TimePickerConfigItem,
  ...LineChartConfigItem,
  ...BarChartConfigItem,
  ...PieChartConfigItem,
  ...RadarChartConfigItem,
  ...TimelineConfigItem,
  ...DrawerConfigItem,
  ...RadioConfigItem,
  ...SelectConfigItems,
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
  PaginationConfigList,
  TableConfigList,
  MenuConfigList,
  TimePickerConfigList,
  LineChartConfigList,
  BarChartConfigList,
  PieChartConfigList,
  RadarChartConfigList,
  TimelineConfigList,
  DrawerConfigList,
  RadioConfigList,
  SelectConfigList,
];

export { ConfigItemFieldEnum, initConfigItem, initConfigList };
