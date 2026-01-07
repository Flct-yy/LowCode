import { type ComponentSchema, ComponentTypeEnum } from "@wect/type";
import { Default, Flex, Text, Image, Button, Input } from '@wect/components';
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
    default:
      return (
        <Default
          component={component}
        >{renderedChildren}</Default>
      );
  };
}

export default RenderComponentContent;