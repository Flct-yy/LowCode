import { ComponentTypeEnum } from "../ComponentSchema";
import { ComponentsConfig, ConfigAreaEnum } from "../Config";
import { ConfigItem, UiTypeEnum } from "../ConfigItem";

export const PieChartItemFieldEnum = {
  pieChart_backgroundColor: 'pieChart.backgroundColor',
  pieChart_MarginPadding: 'pieChart.MarginPadding',
  pieChart_borderColor: 'pieChart.borderColor',
  pieChart_borderWidth: 'pieChart.borderWidth',
  pieChart_borderRadius: 'pieChart.borderRadius',
  pieChart_borderStyle: 'pieChart.borderStyle',
  pieChart_width: 'pieChart.width',
  pieChart_height: 'pieChart.height',
  pieChart_labels: 'pieChart.labels',
  pieChart_datasets: 'pieChart.datasets',
  pieChart_dataset_borderColor: 'pieChart.dataset.borderColor',
  pieChart_dataset_tension: 'pieChart.dataset.tension',
};

export const PieChartConfigItem: ConfigItem[] = [
  {
    field: PieChartItemFieldEnum.pieChart_backgroundColor,
    label: '背景颜色',
    uiType: UiTypeEnum.COLOR_PICKER,
    defaultValue: '#ffffff',
    currentValue: '#ffffff',
  },
  {
    field: PieChartItemFieldEnum.pieChart_MarginPadding,
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
    field: PieChartItemFieldEnum.pieChart_borderColor,
    label: '边框颜色',
    uiType: UiTypeEnum.COLOR_PICKER,
    defaultValue: '#d9d9d9',
    currentValue: '#d9d9d9',
  },
  {
    field: PieChartItemFieldEnum.pieChart_borderWidth,
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
    field: PieChartItemFieldEnum.pieChart_borderRadius,
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
    field: PieChartItemFieldEnum.pieChart_borderStyle,
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
    field: PieChartItemFieldEnum.pieChart_width,
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
    field: PieChartItemFieldEnum.pieChart_height,
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
    field: PieChartItemFieldEnum.pieChart_labels,
    label: '图表标签',
    uiType: UiTypeEnum.TEXTAREA,
    defaultValue: JSON.stringify(['产品A', '产品B', '产品C', '产品D', '产品E'], null, 2),
    currentValue: JSON.stringify(['产品A', '产品B', '产品C', '产品D', '产品E'], null, 2),
    placeholder: '请输入JSON格式的图表标签数组',
  },
  {
    field: PieChartItemFieldEnum.pieChart_datasets,
    label: '图表数据集',
    uiType: UiTypeEnum.TEXTAREA,
    defaultValue: JSON.stringify([
      {
        label: '市场份额',
        data: [30, 25, 20, 15, 10],
        borderColor: 'rgba(75, 192, 192, 1)',
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        tension: 0.4
      }
    ], null, 2),
    currentValue: JSON.stringify([
      {
        label: '市场份额',
        data: [30, 25, 20, 15, 10],
        borderColor: 'rgba(75, 192, 192, 1)',
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        tension: 0.4
      }
    ], null, 2),
    placeholder: '请输入JSON格式的图表数据集数组',
  },
  {
    field: PieChartItemFieldEnum.pieChart_dataset_borderColor,
    label: '数据集边框颜色',
    uiType: UiTypeEnum.COLOR_PICKER,
    defaultValue: 'rgba(75, 192, 192, 1)',
    currentValue: 'rgba(75, 192, 192, 1)',
  },
  {
    field: PieChartItemFieldEnum.pieChart_dataset_tension,
    label: '数据集线条张力',
    uiType: UiTypeEnum.INPUT_NUMBER,
    defaultValue: 0.4,
    currentValue: 0.4,
    min: 0,
    max: 1,
    step: 0.1,
  },
];

export const PieChartConfigList: ComponentsConfig = {
  componentName: 'PieChart',
  componentType: ComponentTypeEnum.PIE_CHART,
  config: [
    {
      areaName: ConfigAreaEnum.layout,
      configItem: [
        PieChartItemFieldEnum.pieChart_backgroundColor,
        PieChartItemFieldEnum.pieChart_MarginPadding,
      ]
    },
    {
      areaName: ConfigAreaEnum.regular,
      configItem: [
        PieChartItemFieldEnum.pieChart_width,
        PieChartItemFieldEnum.pieChart_height,
        PieChartItemFieldEnum.pieChart_labels,
        PieChartItemFieldEnum.pieChart_datasets,
        PieChartItemFieldEnum.pieChart_dataset_borderColor,
        PieChartItemFieldEnum.pieChart_dataset_tension,
      ]
    },
    {
      areaName: ConfigAreaEnum.border,
      configItem: [
        PieChartItemFieldEnum.pieChart_borderColor,
        PieChartItemFieldEnum.pieChart_borderWidth,
        PieChartItemFieldEnum.pieChart_borderRadius,
        PieChartItemFieldEnum.pieChart_borderStyle,
      ]
    },
  ],
};
