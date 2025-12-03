import { type ComponentMetadata, type ComponentSchema, ComponentTypeEnum } from '../type/ComponentSchema';
import InitComponentMetadata from '../type/InitComponentMetaList';
import generateComConfig from '@utils/generateComConfig';

/**
 * 初始化 组件的默认 Schema 配置
 */
export const generateComSchema: (componentId: number, parentId?: number) => ComponentSchema = (componentId, parentId) => {
  const componentMeta: ComponentMetadata | undefined = InitComponentMetadata.find((item) => item.componentId === componentId);
  const componentType = componentMeta?.componentType;
  let config: ComponentSchema['config'] = generateComConfig(componentType as ComponentTypeEnum);

  if (!componentMeta) {
    throw new Error(`组件 ID ${componentId} 不存在`);
  }
  return {
    comSchemaId: new Date().getTime(),
    metadata: componentMeta,
    position: {
      x: 0,
      y: 0,
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
