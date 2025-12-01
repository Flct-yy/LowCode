import { ComponentTypeEnum } from './ComponentSchema';
import { UiTypeEnum } from './ConfigItem';
import { type Config } from './Config';

interface InitConfigItem {
  componentName: string;
  componentType: ComponentTypeEnum;
  config: Config[];
}

// 组件列表 默认组件
const initConfigList: InitConfigItem[] = [
  {
    componentName: 'Flex',
    componentType: ComponentTypeEnum.FLEX,
    config: [
      {
        areaName: '布局',
        configItem: [
          {
            field: '主轴方向',
            label: 'Flex 方向',
            uiType: UiTypeEnum.SELECT,
            defaultValue: 'row',
            options: [
              { label: '水平方向', value: 'row' },
              { label: '垂直方向', value: 'column' },
            ],
            rules: [{ required: true, message: '请选择 Flex 方向' }],
          }
        ]
      }
    ],
  },

]

export default initConfigList;