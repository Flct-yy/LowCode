import { type ComponentSchema, ComponentTypeEnum } from "@wect/type";
import { Default, Flex, Text, Image, Button, Input, Slider, Label, Textarea, Switch, Form, Card, Calendar, Pagination, Table, Menu, TimePicker, LineChart, BarChart, PieChart, RadarChart, Timeline, Drawer, Radio, Select } from '@wect/components';
import '@wect/components/index.css';

const RenderComponentContent = ({ component }: { component: ComponentSchema }) => {
  const { children } = component;
  const renderedChildren = children?.map(child => (
    <RenderComponentContent key={child.comSchemaId} component={child} />
  ));
  switch (component.metadata.componentType) {
    case ComponentTypeEnum.FLEX:
      return (
        <Flex
          component={component}
        >{renderedChildren}</Flex>
      );
    case ComponentTypeEnum.TEXT:
      return (
        <Text
          component={component}
        />
      );
    case ComponentTypeEnum.BUTTON:
      return (
        <Button
          component={component}
        />
      );
    case ComponentTypeEnum.IMAGE:
      return (
        <Image
          component={component}
        />
      );
    case ComponentTypeEnum.INPUT:
      return (
        <Input
          component={component}
        />
      );
    case ComponentTypeEnum.SLIDER:
      return (
        <Slider
          component={component}
        />
      );
    case ComponentTypeEnum.LABEL:
      return (
        <Label
          component={component}
        />
      );
    case ComponentTypeEnum.TEXTAREA:
      return (
        <Textarea
          component={component}
        />
      );
    case ComponentTypeEnum.SWITCH:
      return (
        <Switch
          component={component}
        />
      );
    case ComponentTypeEnum.FORM:
      return (
        <Form
          component={component}
        >
          {renderedChildren}
        </Form>
      );
    case ComponentTypeEnum.CARD:
      return (
        <Card
          component={component}
        >
          {renderedChildren}
        </Card>
      );
    case ComponentTypeEnum.CALENDAR:
      return (
        <Calendar
          component={component}
        />
      );
    case ComponentTypeEnum.PAGINATION:
      return (
        <Pagination
          component={component}
        />
      );
    case ComponentTypeEnum.TABLE:
      return (
        <Table
          component={component}
        />
      );
    case ComponentTypeEnum.MENU:
      return (
        <Menu
          component={component}
        >
          {renderedChildren}
        </Menu>
      );
    case ComponentTypeEnum.TIME_PICKER:
      return (
        <TimePicker
          component={component}
        />
      );
    case ComponentTypeEnum.LINE_CHART:
      return (
        <LineChart
          component={component}
        />
      );
    case ComponentTypeEnum.BAR_CHART:
      return (
        <BarChart
          component={component}
        />
      );
    case ComponentTypeEnum.PIE_CHART:
      return (
        <PieChart
          component={component}
        />
      );
    case ComponentTypeEnum.RADAR_CHART:
      return (
        <RadarChart
          component={component}
        />
      );
    case ComponentTypeEnum.TIMELINE:
      return (
        <Timeline
          component={component}
        />
      );
    case ComponentTypeEnum.DRAWER:
      return (
        <Drawer
          component={component}
        />
      );
    case ComponentTypeEnum.RADIO:
      return (
        <Radio
          component={component}
        />
      );
    case ComponentTypeEnum.SELECT:
      return (
        <Select
          component={component}
        />
      );
    default:
      return (
        <Default
          component={component}
        >
          {renderedChildren}
        </Default>
      );
  };
}

export default RenderComponentContent;