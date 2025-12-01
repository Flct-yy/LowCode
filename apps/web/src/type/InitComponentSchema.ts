import { type ComponentMetadata, type ComponentSchema, ComponentTypeEnum } from './ComponentSchema';
import InitComponentMetadata from './InitComponentMetaList';
import initConfigList from './InitConfigList';

/**
 * 初始化 Flex 组件的默认 Schema 配置
 */
export const initComSchema: (componentId: number, parentId?: number) => ComponentSchema = (componentId, parentId) => {
  const componentMeta = InitComponentMetadata.find((item) => item.componentId === componentId);
  const componentType = componentMeta?.componentType;
  let config: ComponentSchema['config'] = [];

  switch (componentType) {
    case ComponentTypeEnum.FLEX:
      const flexConfig = initConfigList.find((item) => item.componentType === componentType);
      if (flexConfig) {
        config = flexConfig.config;
      }
      break;
    default:
      break;
  }

  return {
    comSchemaId: new Date().getTime(),
    metadata: componentMeta as ComponentMetadata,
    position: {
      x: 0,
      y: 0,
      width: 0,
      height: 0,
      position: 'static',
      zIndex: 0,
    },
    config,
    children: [],
    parentId: parentId,
    isContainer: false,
    isVisible: true,
  }
};
