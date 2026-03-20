import { ComponentTypeEnum } from "../ComponentSchema";
import { ComponentsConfig, ConfigAreaEnum } from "../Config";
import { ConfigItem, UiTypeEnum } from "../ConfigItem";

export const TableItemFieldEnum = {
  table_backgroundColor: 'table.backgroundColor',
  table_MarginPadding: 'table.MarginPadding',
  table_borderColor: 'table.borderColor',
  table_borderWidth: 'table.borderWidth',
  table_borderRadius: 'table.borderRadius',
  table_borderStyle: 'table.borderStyle',
  table_width: 'table.width',
  table_height: 'table.height',
  table_disabled: 'table.disabled',
  table_columns: 'table.columns',
  table_sample_config: 'table.sampleConfig',
};

export const TableConfigItem: ConfigItem[] = [
  // 背景颜色
  {
    field: TableItemFieldEnum.table_backgroundColor,
    label: '背景颜色',
    uiType: UiTypeEnum.COLOR_PICKER,
    defaultValue: '#ffffff',
    currentValue: '#ffffff',
  },
  // 边距
  {
    field: TableItemFieldEnum.table_MarginPadding,
    label: '边距',
    uiType: UiTypeEnum.MARGIN_PADDING,
    defaultValue: {
      margin: {
        top: 0,
        right: 0,
        bottom: 0,
        left: 0,
      },
      padding: {
        top: 0,
        right: 0,
        bottom: 0,
        left: 0,
      },
    },
    currentValue: {
      margin: {
        top: 0,
        right: 0,
        bottom: 0,
        left: 0,
      },
      padding: {
        top: 0,
        right: 0,
        bottom: 0,
        left: 0,
      },
    },
    unit: 'px',
  },
  // 边框颜色
  {
    field: TableItemFieldEnum.table_borderColor,
    label: '边框颜色',
    uiType: UiTypeEnum.COLOR_PICKER,
    defaultValue: '#d9d9d9',
    currentValue: '#d9d9d9',
  },
  // 边框宽度
  {
    field: TableItemFieldEnum.table_borderWidth,
    label: '边框宽度',
    uiType: UiTypeEnum.INPUT_NUMBER,
    defaultValue: 1,
    currentValue: 1,
    min: 0,
    max: 10,
    step: 1,
    unit: 'px',
  },
  // 边框圆角
  {
    field: TableItemFieldEnum.table_borderRadius,
    label: '边框圆角',
    uiType: UiTypeEnum.INPUT_NUMBER,
    defaultValue: 4,
    currentValue: 4,
    min: 0,
    max: 50,
    step: 1,
    unit: 'px',
  },
  // 边框样式
  {
    field: TableItemFieldEnum.table_borderStyle,
    label: '边框样式',
    uiType: UiTypeEnum.GROUP,
    defaultValue: 'solid',
    currentValue: 'solid',
    options: [
      { label: '实线', value: 'solid' },
      { label: '虚线', value: 'dashed' },
      { label: '点线', value: 'dotted' },
      { label: '双实线', value: 'double' },
    ],
  },
  // 宽度
  {
    field: TableItemFieldEnum.table_width,
    label: '宽度',
    uiType: UiTypeEnum.INPUT_NUMBER,
    defaultValue: 500,
    currentValue: 500,
    step: 1,
    currentUnit: 'px',
    units: [
      { label: 'px', value: 'px' },
      { label: '%', value: '%' },
      { label: 'auto', value: 'auto' },
    ],
    mins: [0, 0, 0],
    maxs: [1000, 100, 0],
  },
  // 高度
  {
    field: TableItemFieldEnum.table_height,
    label: '高度',
    uiType: UiTypeEnum.INPUT_NUMBER,
    defaultValue: 200,
    currentValue: 200,
    step: 1,
    currentUnit: 'px',
    units: [
      { label: 'px', value: 'px' },
      { label: '%', value: '%' },
      { label: 'auto', value: 'auto' },
    ],
    mins: [0, 0, 0],
    maxs: [1000, 100, 0],
  },
  // 禁用
  {
    field: TableItemFieldEnum.table_disabled,
    label: '禁用',
    uiType: UiTypeEnum.GROUP,
    defaultValue: false,
    currentValue: false,
    options: [
      { label: '启用', value: false },
      { label: '禁用', value: true },
    ],
  },
  // 表头配置
  {
    field: TableItemFieldEnum.table_columns,
    label: '表头配置',
    uiType: UiTypeEnum.TEXTAREA,
    defaultValue: JSON.stringify([
      { title: '姓名', dataIndex: 'name' },
      { title: '年龄', dataIndex: 'age' },
      { title: '性别', dataIndex: 'gender' },
      { title: '职业', dataIndex: 'job' },
    ], null, 2),
    currentValue: JSON.stringify([
      { title: '姓名', dataIndex: 'name' },
      { title: '年龄', dataIndex: 'age' },
      { title: '性别', dataIndex: 'gender' },
      { title: '职业', dataIndex: 'job' },
    ], null, 2),
    placeholder: '请输入JSON格式的表头配置',
  },
  // 样例配置
  {
    field: TableItemFieldEnum.table_sample_config,
    label: '样例配置',
    uiType: UiTypeEnum.TEXTAREA,
    defaultValue: JSON.stringify([
      { name: '张三', age: 25, gender: '男', job: '工程师' },
      { name: '李四', age: 30, gender: '女', job: '设计师' },
      { name: '王五', age: 28, gender: '男', job: '产品经理' },
    ], null, 2),
    currentValue: JSON.stringify([
      { name: '张三', age: 25, gender: '男', job: '工程师' },
      { name: '李四', age: 30, gender: '女', job: '设计师' },
      { name: '王五', age: 28, gender: '男', job: '产品经理' },
    ], null, 2),
    placeholder: '请输入JSON格式的表头配置',
  },
];

export const TableConfigList: ComponentsConfig = {
  componentName: 'Table',
  componentType: ComponentTypeEnum.TABLE,
  config: [
    {
      areaName: ConfigAreaEnum.layout,
      configItem: [
        TableItemFieldEnum.table_backgroundColor,
        TableItemFieldEnum.table_MarginPadding,
      ]
    },
    {
      areaName: ConfigAreaEnum.regular,
      configItem: [
        TableItemFieldEnum.table_width,
        TableItemFieldEnum.table_height,
        TableItemFieldEnum.table_disabled,
      ]
    },
    {
      areaName: ConfigAreaEnum.border,
      configItem: [
        TableItemFieldEnum.table_borderColor,
        TableItemFieldEnum.table_borderWidth,
        TableItemFieldEnum.table_borderRadius,
        TableItemFieldEnum.table_borderStyle,
      ]
    },
    {
      areaName: ConfigAreaEnum.content,
      configItem: [
        TableItemFieldEnum.table_columns,
        TableItemFieldEnum.table_sample_config,
      ]
    },
  ],
};