import { ComponentTypeEnum, ComponentCategoryEnum, type ComponentMetadata } from '@/type/ComponentSchema';

// 组件列表 默认组件
const initComponentList: ComponentMetadata[] = [
  {
    componentId: 1,
    componentName: 'Flex',
    componentType: ComponentTypeEnum.FLEX,
    category: ComponentCategoryEnum.LAYOUT,
    tags: ['布局', 'Flex'],
    version: '1.0.0',
    description: '用于布局的Flex组件',
    icon: 'flex-icon',
  },
  {
    componentId: 2,
    componentName: 'Text',
    componentType: ComponentTypeEnum.TEXT,
    category: ComponentCategoryEnum.BASIC,
    tags: ['文本', 'Text'],
    version: '1.0.0',
    description: '用于显示文本的组件',
    icon: 'text-icon',
  },
  {
    componentId: 3,
    componentName: 'Button',
    componentType: ComponentTypeEnum.BUTTON,
    category: ComponentCategoryEnum.BASIC,
    tags: ['按钮', 'Button'],
    version: '1.0.0',
    description: '用于触发操作的按钮组件',
    icon: 'button-icon',
  },

]

export default initComponentList;