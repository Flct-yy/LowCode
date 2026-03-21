import { ComponentTypeEnum } from "../ComponentSchema";
import { ComponentsConfig, ConfigAreaEnum } from "../Config";
import { ConfigItem, UiTypeEnum } from "../ConfigItem";

export const BarChartItemFieldEnum = {
  barChart_backgroundColor: 'barChart.backgroundColor',
  barChart_MarginPadding: 'barChart.MarginPadding',
  barChart_borderColor: 'barChart.borderColor',
  barChart_borderWidth: 'barChart.borderWidth',
  barChart_borderRadius: 'barChart.borderRadius',
  barChart_borderStyle: 'barChart.borderStyle',
  barChart_width: 'barChart.width',
  barChart_height: 'barChart.height',
  barChart_labels: 'barChart.labels',
  barChart_datasets: 'barChart.datasets',
  barChart_dataset_borderColor: 'barChart.dataset.borderColor',
  barChart_dataset_tension: 'barChart.dataset.tension',
};

export const BarChartConfigItem: ConfigItem[] = [
  {
    field: BarChartItemFieldEnum.barChart_backgroundColor,
    label: '背景颜色',
    uiType: UiTypeEnum.COLOR_PICKER,
    defaultValue: '#ffffff',
    currentValue: '#ffffff',
  },
  {
    field: BarChartItemFieldEnum.barChart_MarginPadding,
    label: '边距',
    uiType: UiTypeEnum.MARGIN_PADDING,
    defaultValue: {
      margin: { top: 0, right: 0, bottom: 0, left: 0 },
      padding: { top: 0, right: 0, bottom: 0, left: 0 },
    },
    currentValue: {
      margin: { top: 0, right: 0, bottom: 0, left: 0 },
      padding: { top: 0, right: 0, bottom: 0, left: 0 },
    },
    unit: 'px',
  },
  {
    field: BarChartItemFieldEnum.barChart_borderColor,
    label: '边框颜色',
    uiType: UiTypeEnum.COLOR_PICKER,
    defaultValue: '#d9d9d9',
    currentValue: '#d9d9d9',
  },
  {
    field: BarChartItemFieldEnum.barChart_borderWidth,
    label: '边框宽度',
    uiType: UiTypeEnum.INPUT_NUMBER,
    defaultValue: 1,
    currentValue: 1,
    min: 0,
    max: 10,
    step: 1,
    unit: 'px',
  },
  {
    field: BarChartItemFieldEnum.barChart_borderRadius,
    label: '边框圆角',
    uiType: UiTypeEnum.INPUT_NUMBER,
    defaultValue: 4,
    currentValue: 4,
    min: 0,
    max: 50,
    step: 1,
    unit: 'px',
  },
  {
    field: BarChartItemFieldEnum.barChart_borderStyle,
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
  {
    field: BarChartItemFieldEnum.barChart_width,
    label: '宽度',
    uiType: UiTypeEnum.INPUT_NUMBER,
    defaultValue: 400,
    currentValue: 400,
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
  {
    field: BarChartItemFieldEnum.barChart_height,
    label: '高度',
    uiType: UiTypeEnum.INPUT_NUMBER,
    defaultValue: 300,
    currentValue: 300,
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
  {
    field: BarChartItemFieldEnum.barChart_labels,
    label: '图表标签',
    uiType: UiTypeEnum.TEXTAREA,
    defaultValue: JSON.stringify(['产品A', '产品B', '产品C', '产品D', '产品E'], null, 2),
    currentValue: JSON.stringify(['产品A', '产品B', '产品C', '产品D', '产品E'], null, 2),
    placeholder: '请输入JSON格式的图表标签数组',
  },
  {
    field: BarChartItemFieldEnum.barChart_datasets,
    label: '图表数据集',
    uiType: UiTypeEnum.TEXTAREA,
    defaultValue: JSON.stringify([
      {
        label: '销量',
        data: [120, 85, 150, 90, 110],
        borderColor: 'rgba(75, 192, 192, 1)',
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        tension: 0.4
      },
      {
        label: '库存',
        data: [80, 120, 60, 100, 70],
        borderColor: 'rgba(54, 162, 235, 1)',
        backgroundColor: 'rgba(54, 162, 235, 0.2)',
        tension: 0.4
      }
    ], null, 2),
    currentValue: JSON.stringify([
      {
        label: '销量',
        data: [120, 85, 150, 90, 110],
        borderColor: 'rgba(75, 192, 192, 1)',
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        tension: 0.4
      },
      {
        label: '库存',
        data: [80, 120, 60, 100, 70],
        borderColor: 'rgba(54, 162, 235, 1)',
        backgroundColor: 'rgba(54, 162, 235, 0.2)',
        tension: 0.4
      }
    ], null, 2),
    placeholder: '请输入JSON格式的图表数据集数组',
  },
  {
    field: BarChartItemFieldEnum.barChart_dataset_borderColor,
    label: '数据集边框颜色',
    uiType: UiTypeEnum.COLOR_PICKER,
    defaultValue: 'rgba(75, 192, 192, 1)',
    currentValue: 'rgba(75, 192, 192, 1)',
  },
  {
    field: BarChartItemFieldEnum.barChart_dataset_tension,
    label: '数据集线条张力',
    uiType: UiTypeEnum.INPUT_NUMBER,
    defaultValue: 0.4,
    currentValue: 0.4,
    min: 0,
    max: 1,
    step: 0.1,
  },
];

export const BarChartConfigList: ComponentsConfig = {
  componentName: 'BarChart',
  componentType: ComponentTypeEnum.BAR_CHART,
  config: [
    {
      areaName: ConfigAreaEnum.layout,
      configItem: [
        BarChartItemFieldEnum.barChart_backgroundColor,
        BarChartItemFieldEnum.barChart_MarginPadding,
      ]
    },
    {
      areaName: ConfigAreaEnum.regular,
      configItem: [
        BarChartItemFieldEnum.barChart_width,
        BarChartItemFieldEnum.barChart_height,
        BarChartItemFieldEnum.barChart_labels,
        BarChartItemFieldEnum.barChart_datasets,
        BarChartItemFieldEnum.barChart_dataset_borderColor,
        BarChartItemFieldEnum.barChart_dataset_tension,
      ]
    },
    {
      areaName: ConfigAreaEnum.border,
      configItem: [
        BarChartItemFieldEnum.barChart_borderColor,
        BarChartItemFieldEnum.barChart_borderWidth,
        BarChartItemFieldEnum.barChart_borderRadius,
        BarChartItemFieldEnum.barChart_borderStyle,
      ]
    },
  ],
};
