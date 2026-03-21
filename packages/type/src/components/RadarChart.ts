import { ComponentTypeEnum } from "../ComponentSchema";
import { ComponentsConfig, ConfigAreaEnum } from "../Config";
import { ConfigItem, UiTypeEnum } from "../ConfigItem";

export const RadarChartItemFieldEnum = {
  radarChart_backgroundColor: 'radarChart.backgroundColor',
  radarChart_MarginPadding: 'radarChart.MarginPadding',
  radarChart_borderColor: 'radarChart.borderColor',
  radarChart_borderWidth: 'radarChart.borderWidth',
  radarChart_borderRadius: 'radarChart.borderRadius',
  radarChart_borderStyle: 'radarChart.borderStyle',
  radarChart_width: 'radarChart.width',
  radarChart_height: 'radarChart.height',
  radarChart_labels: 'radarChart.labels',
  radarChart_datasets: 'radarChart.datasets',
  radarChart_dataset_borderColor: 'radarChart.dataset.borderColor',
  radarChart_dataset_tension: 'radarChart.dataset.tension',
};

export const RadarChartConfigItem: ConfigItem[] = [
  {
    field: RadarChartItemFieldEnum.radarChart_backgroundColor,
    label: '背景颜色',
    uiType: UiTypeEnum.COLOR_PICKER,
    defaultValue: '#ffffff',
    currentValue: '#ffffff',
  },
  {
    field: RadarChartItemFieldEnum.radarChart_MarginPadding,
    label: '边距',
    uiType: UiTypeEnum.MARGIN_PADDING,
    defaultValue: {
      margin: { top: 0, right: 0, bottom: 0, left: 0 },
      padding: { top: 20, right: 20, bottom: 20, left: 20 },
    },
    currentValue: {
      margin: { top: 0, right: 0, bottom: 0, left: 0 },
      padding: { top: 20, right: 20, bottom: 20, left: 20 },
    },
    unit: 'px',
  },
  {
    field: RadarChartItemFieldEnum.radarChart_borderColor,
    label: '边框颜色',
    uiType: UiTypeEnum.COLOR_PICKER,
    defaultValue: '#d9d9d9',
    currentValue: '#d9d9d9',
  },
  {
    field: RadarChartItemFieldEnum.radarChart_borderWidth,
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
    field: RadarChartItemFieldEnum.radarChart_borderRadius,
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
    field: RadarChartItemFieldEnum.radarChart_borderStyle,
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
    field: RadarChartItemFieldEnum.radarChart_width,
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
    field: RadarChartItemFieldEnum.radarChart_height,
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
    field: RadarChartItemFieldEnum.radarChart_labels,
    label: '图表标签',
    uiType: UiTypeEnum.TEXTAREA,
    defaultValue: JSON.stringify(['速度', '可靠性', '价格', '功能', '设计'], null, 2),
    currentValue: JSON.stringify(['速度', '可靠性', '价格', '功能', '设计'], null, 2),
    placeholder: '请输入JSON格式的图表标签数组',
  },
  {
    field: RadarChartItemFieldEnum.radarChart_datasets,
    label: '图表数据集',
    uiType: UiTypeEnum.TEXTAREA,
    defaultValue: JSON.stringify([
      {
        label: '产品A',
        data: [85, 90, 70, 75, 80],
        borderColor: 'rgba(75, 192, 192, 1)',
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        tension: 0.4
      },
      {
        label: '产品B',
        data: [70, 75, 85, 90, 85],
        borderColor: 'rgba(54, 162, 235, 1)',
        backgroundColor: 'rgba(54, 162, 235, 0.2)',
        tension: 0.4
      }
    ], null, 2),
    currentValue: JSON.stringify([
      {
        label: '产品A',
        data: [85, 90, 70, 75, 80],
        borderColor: 'rgba(75, 192, 192, 1)',
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        tension: 0.4
      },
      {
        label: '产品B',
        data: [70, 75, 85, 90, 85],
        borderColor: 'rgba(54, 162, 235, 1)',
        backgroundColor: 'rgba(54, 162, 235, 0.2)',
        tension: 0.4
      }
    ], null, 2),
    placeholder: '请输入JSON格式的图表数据集数组',
  },
  {
    field: RadarChartItemFieldEnum.radarChart_dataset_borderColor,
    label: '数据集边框颜色',
    uiType: UiTypeEnum.COLOR_PICKER,
    defaultValue: 'rgba(75, 192, 192, 1)',
    currentValue: 'rgba(75, 192, 192, 1)',
  },
  {
    field: RadarChartItemFieldEnum.radarChart_dataset_tension,
    label: '数据集线条张力',
    uiType: UiTypeEnum.INPUT_NUMBER,
    defaultValue: 0.4,
    currentValue: 0.4,
    min: 0,
    max: 1,
    step: 0.1,
  },
];

export const RadarChartConfigList: ComponentsConfig = {
  componentName: 'RadarChart',
  componentType: ComponentTypeEnum.RADAR_CHART,
  config: [
    {
      areaName: ConfigAreaEnum.layout,
      configItem: [
        RadarChartItemFieldEnum.radarChart_backgroundColor,
        RadarChartItemFieldEnum.radarChart_MarginPadding,
      ]
    },
    {
      areaName: ConfigAreaEnum.regular,
      configItem: [
        RadarChartItemFieldEnum.radarChart_width,
        RadarChartItemFieldEnum.radarChart_height,
        RadarChartItemFieldEnum.radarChart_labels,
        RadarChartItemFieldEnum.radarChart_datasets,
        RadarChartItemFieldEnum.radarChart_dataset_borderColor,
        RadarChartItemFieldEnum.radarChart_dataset_tension,
      ]
    },
    {
      areaName: ConfigAreaEnum.border,
      configItem: [
        RadarChartItemFieldEnum.radarChart_borderColor,
        RadarChartItemFieldEnum.radarChart_borderWidth,
        RadarChartItemFieldEnum.radarChart_borderRadius,
        RadarChartItemFieldEnum.radarChart_borderStyle,
      ]
    },
  ],
};
