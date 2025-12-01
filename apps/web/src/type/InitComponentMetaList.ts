import { ComponentTypeEnum, ComponentCategoryEnum, type ComponentMetadata } from '@/type/ComponentSchema';

// 组件列表 默认组件
const initComponentList: ComponentMetadata[] = [
  {
    componentId: '1',
    componentName: 'Flex',
    componentType: ComponentTypeEnum.FLEX,
    category: ComponentCategoryEnum.LAYOUT,
    tags: ['布局', 'Flex'],
    version: '1.0.0',
    description: '用于布局的Flex组件',
    icon: 'flex-icon',
  },

]

export default initComponentList;