import { ComponentTypeEnum } from "../ComponentSchema";
import { ComponentsConfig, ConfigAreaEnum } from "../Config";
import { ConfigItem, UiTypeEnum } from "../ConfigItem";

export const PaginationItemFieldEnum = {
  pagination_backgroundColor: 'pagination.backgroundColor',
  pagination_MarginPadding: 'pagination.MarginPadding',
  pagination_width: 'pagination.width',
  pagination_height: 'pagination.height',
  pagination_total: 'pagination.total',
  pagination_pageSize: 'pagination.pageSize',
  pagination_current: 'pagination.current',
};

export const PaginationConfigItem: ConfigItem[] = [
  // 背景颜色
  {
    field: PaginationItemFieldEnum.pagination_backgroundColor,
    label: '背景颜色',
    uiType: UiTypeEnum.COLOR_PICKER,
    defaultValue: '#ffffff',
    currentValue: '#ffffff',
  },
  // 边距
  {
    field: PaginationItemFieldEnum.pagination_MarginPadding,
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
  {
    field: PaginationItemFieldEnum.pagination_width,
    label: '宽度',
    uiType: UiTypeEnum.INPUT_NUMBER,
    defaultValue: 600,
    currentValue: 600,
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
    field: PaginationItemFieldEnum.pagination_height,
    label: '高度',
    uiType: UiTypeEnum.INPUT_NUMBER,
    defaultValue: 40,
    currentValue: 40,
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
  // 总条数
  {
    field: PaginationItemFieldEnum.pagination_total,
    label: '总条数',
    uiType: UiTypeEnum.INPUT_NUMBER,
    defaultValue: 100,
    currentValue: 100,
    min: 0,
    max: 10000,
    step: 1,
  },
  // 每页条数
  {
    field: PaginationItemFieldEnum.pagination_pageSize,
    label: '每页条数',
    uiType: UiTypeEnum.GROUP,
    defaultValue: 10,
    currentValue: 10,
    options: [
      { label: '10', value: 10 },
      { label: '20', value: 20 },
      { label: '50', value: 50 },
      { label: '100', value: 100 },
    ],
  },
  // 当前页码
  {
    field: PaginationItemFieldEnum.pagination_current,
    label: '当前页码',
    uiType: UiTypeEnum.INPUT_NUMBER,
    defaultValue: 1,
    currentValue: 1,
    min: 1,
    max: 1000,
    step: 1,
  },
];

export const PaginationConfigList: ComponentsConfig = {
  componentName: 'Pagination',
  componentType: ComponentTypeEnum.PAGINATION,
  config: [
    {
      areaName: ConfigAreaEnum.layout,
      configItem: [
        PaginationItemFieldEnum.pagination_backgroundColor,
        PaginationItemFieldEnum.pagination_MarginPadding,
      ]
    },
    {
      areaName: ConfigAreaEnum.regular,
      configItem: [
        PaginationItemFieldEnum.pagination_width,
        PaginationItemFieldEnum.pagination_height,
        PaginationItemFieldEnum.pagination_total,
        PaginationItemFieldEnum.pagination_pageSize,
        PaginationItemFieldEnum.pagination_current,
      ]
    },
  ],
};