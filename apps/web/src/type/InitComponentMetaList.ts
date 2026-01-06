import { ComponentTypeEnum, ComponentCategoryEnum, type ComponentMetadata } from '@wect/type';

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
  {
    componentId: 4,
    componentName: 'Image',
    componentType: ComponentTypeEnum.IMAGE,
    category: ComponentCategoryEnum.BASIC,
    tags: ['图片', 'Image'],
    version: '1.0.0',
    description: '用于显示图片的组件',
    icon: 'image-icon',
  },
  {
    componentId: 5,
    componentName: 'Input',
    componentType: ComponentTypeEnum.INPUT,
    category: ComponentCategoryEnum.BASIC,
    tags: ['输入框', 'Input'],
    version: '1.0.0',
    description: '用于用户输入的组件',
    icon: 'input-icon',
  }

]

export default initComponentList;