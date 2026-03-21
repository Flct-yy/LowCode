import { ComponentTypeEnum } from "../ComponentSchema";
import { ComponentsConfig, ConfigAreaEnum } from "../Config";
import { ConfigItem, UiTypeEnum } from "../ConfigItem";

export const LineChartItemFieldEnum = {
  lineChart_backgroundColor: 'lineChart.backgroundColor',
  lineChart_MarginPadding: 'lineChart.MarginPadding',
  lineChart_borderColor: 'lineChart.borderColor',
  lineChart_borderWidth: 'lineChart.borderWidth',
  lineChart_borderRadius: 'lineChart.borderRadius',
  lineChart_borderStyle: 'lineChart.borderStyle',
  lineChart_width: 'lineChart.width',
  lineChart_height: 'lineChart.height',
  lineChart_labels: 'lineChart.labels',
  lineChart_datasets: 'lineChart.datasets',
  lineChart_dataset_borderColor: 'lineChart.dataset.borderColor',
  lineChart_dataset_tension: 'lineChart.dataset.tension',
};

export const LineChartConfigItem: ConfigItem[] = [
  {
    field: LineChartItemFieldEnum.lineChart_backgroundColor,
    label: '背景颜色',
    uiType: UiTypeEnum.COLOR_PICKER,
    defaultValue: '#ffffff',
    currentValue: '#ffffff',
  },
  {
    field: LineChartItemFieldEnum.lineChart_MarginPadding,
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
    field: LineChartItemFieldEnum.lineChart_borderColor,
    label: '边框颜色',
    uiType: UiTypeEnum.COLOR_PICKER,
    defaultValue: '#d9d9d9',
    currentValue: '#d9d9d9',
  },
  {
    field: LineChartItemFieldEnum.lineChart_borderWidth,
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
    field: LineChartItemFieldEnum.lineChart_borderRadius,
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
    field: LineChartItemFieldEnum.lineChart_borderStyle,
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
    field: LineChartItemFieldEnum.lineChart_width,
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
    field: LineChartItemFieldEnum.lineChart_height,
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
    field: LineChartItemFieldEnum.lineChart_labels,
    label: '图表标签',
    uiType: UiTypeEnum.TEXTAREA,
    defaultValue: JSON.stringify(['一月', '二月', '三月', '四月', '五月', '六月'], null, 2),
    currentValue: JSON.stringify(['一月', '二月', '三月', '四月', '五月', '六月'], null, 2),
    placeholder: '请输入JSON格式的图表标签数组',
  },
  {
    field: LineChartItemFieldEnum.lineChart_datasets,
    label: '图表数据集',
    uiType: UiTypeEnum.TEXTAREA,
    defaultValue: JSON.stringify([
      {
        label: '销售额',
        data: [65, 59, 80, 81, 56, 55],
        borderColor: 'rgba(75, 192, 192, 1)',
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        tension: 0.4
      },
      {
        label: '利润',
        data: [28, 48, 40, 19, 86, 27],
        borderColor: 'rgba(54, 162, 235, 1)',
        backgroundColor: 'rgba(54, 162, 235, 0.2)',
        tension: 0.4
      }
    ], null, 2),
    currentValue: JSON.stringify([
      {
        label: '销售额',
        data: [65, 59, 80, 81, 56, 55],
        borderColor: 'rgba(75, 192, 192, 1)',
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        tension: 0.4
      },
      {
        label: '利润',
        data: [28, 48, 40, 19, 86, 27],
        borderColor: 'rgba(54, 162, 235, 1)',
        backgroundColor: 'rgba(54, 162, 235, 0.2)',
        tension: 0.4
      }
    ], null, 2),
    placeholder: '请输入JSON格式的图表数据集数组',
  },
  {
    field: LineChartItemFieldEnum.lineChart_dataset_borderColor,
    label: '数据折线颜色',
    uiType: UiTypeEnum.COLOR_PICKER,
    defaultValue: 'rgba(75, 192, 192, 1)',
    currentValue: 'rgba(75, 192, 192, 1)',
  },
  {
    field: LineChartItemFieldEnum.lineChart_dataset_tension,
    label: '数据折线线条张力',
    uiType: UiTypeEnum.INPUT_NUMBER,
    defaultValue: 0.4,
    currentValue: 0.4,
    min: 0,
    max: 1,
    step: 0.1,
  },
];

export const LineChartConfigList: ComponentsConfig = {
  componentName: 'LineChart',
  componentType: ComponentTypeEnum.LINE_CHART,
  config: [
    {
      areaName: ConfigAreaEnum.layout,
      configItem: [
        LineChartItemFieldEnum.lineChart_backgroundColor,
        LineChartItemFieldEnum.lineChart_MarginPadding,
      ]
    },
    {
      areaName: ConfigAreaEnum.regular,
      configItem: [
        LineChartItemFieldEnum.lineChart_width,
        LineChartItemFieldEnum.lineChart_height,
        LineChartItemFieldEnum.lineChart_labels,
        LineChartItemFieldEnum.lineChart_datasets,
        LineChartItemFieldEnum.lineChart_dataset_borderColor,
        LineChartItemFieldEnum.lineChart_dataset_tension,
      ]
    },
    {
      areaName: ConfigAreaEnum.border,
      configItem: [
        LineChartItemFieldEnum.lineChart_borderColor,
        LineChartItemFieldEnum.lineChart_borderWidth,
        LineChartItemFieldEnum.lineChart_borderRadius,
        LineChartItemFieldEnum.lineChart_borderStyle,
      ]
    },
  ],
};
