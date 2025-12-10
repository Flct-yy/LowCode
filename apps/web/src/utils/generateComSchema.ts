import { type ComponentMetadata, type ComponentSchema, ComponentTypeEnum } from '../type/ComponentSchema';
import InitComponentMetadata from '../type/InitComponentMetaList';
import generateComConfig from '@utils/generateComConfig';

/**
 * 初始化 组件的默认 Schema 配置
 */
// 使用计数器确保ID唯一性
let schemaIdCounter = 0;
export const generateComSchema: (componentId: number, parentId: number) => ComponentSchema = (componentId, parentId) => {
  const componentMeta: ComponentMetadata | undefined = InitComponentMetadata.find((item) => item.componentId === componentId);
  const componentType = componentMeta?.componentType;
  let config: ComponentSchema['config'] = generateComConfig(componentType as ComponentTypeEnum);

  if (!componentMeta) {
    throw new Error(`组件 ID ${componentId} 不存在`);
  }
  // 生成唯一ID：时间戳 + 计数器
  const uniqueId = new Date().getTime() + (schemaIdCounter++);
  return {
    comSchemaId: uniqueId,
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
    isLocked: false,
    isVisible: true,
  }
};
