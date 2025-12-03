import { type ComponentMetadata, type ComponentSchema, ComponentTypeEnum } from '../type/ComponentSchema';
import InitComponentMetadata from '../type/InitComponentMetaList';
import initConfigList from '../type/InitConfigList';

/**
 * 初始化 组件的默认 Schema 配置
 */
export const generateComSchema: (componentId: number, parentId?: number) => ComponentSchema = (componentId, parentId) => {
  const componentMeta: ComponentMetadata | undefined = InitComponentMetadata.find((item) => item.componentId === componentId);
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
  if (!componentMeta) {
    throw new Error(`组件 ID ${componentId} 不存在`);
  }
  return {
    comSchemaId: new Date().getTime(),
    metadata: componentMeta,
    position: {
      x: 0,
      y: 0,
      width: '100%',
      height: '100%',
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
