import React, { useRef, useMemo, useEffect } from 'react';
import { ComponentSchema, ComTree } from '@wect/type';
import { convertConfigToStyle } from '@/utils/convertConfigToStyle';
import { getConfigValue } from '@/utils/index';
import '@/scss/preview.scss';

function BarChart({
  component,
  componentDep,
  handleDnD,
  handleComponentSelect,
}: {
  component: ComponentSchema;
  componentDep?: { isSelected: boolean, canDrop: boolean, isOverShallow: boolean };
  handleDnD?: (ref: React.RefObject<HTMLDivElement | null>) => void;
  handleComponentSelect?: (e: React.MouseEvent) => void;
}) {
  const divRef = useRef<HTMLDivElement | null>(null);

  // 从配置中获取图表标签
  const chartLabels = getConfigValue<string | any>(component.config, 'labels');
  // 从配置中获取图表数据集
  const chartDatasets = getConfigValue<string | any>(component.config, 'datasets');
  // 从配置中获取数据集边框颜色
  const datasetBorderColor = getConfigValue<string>(component.config, 'dataset.borderColor');
  // 从配置中获取数据集线条张力
  const datasetTension = getConfigValue<number>(component.config, 'dataset.tension');

  // 默认数据
  const defaultData = {
    labels: ['产品A', '产品B', '产品C', '产品D', '产品E'],
    datasets: [
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
    ]
  };

  // 处理图表数据
  let data = { ...defaultData };

  try {
    // 解析标签
    if (chartLabels) {
      if (typeof chartLabels === 'string') {
        data.labels = JSON.parse(chartLabels);
      } else if (Array.isArray(chartLabels)) {
        data.labels = chartLabels;
      }
    }

    // 解析数据集
    if (chartDatasets) {
      if (typeof chartDatasets === 'string') {
        data.datasets = JSON.parse(chartDatasets);
      } else if (Array.isArray(chartDatasets)) {
        data.datasets = chartDatasets;
      }
    }

    // 应用数据集边框颜色
    if (datasetBorderColor && data.datasets) {
      data.datasets = data.datasets.map((dataset: any) => ({
        ...dataset,
        borderColor: datasetBorderColor
      }));
    }

    // 应用数据集线条张力
    if (datasetTension !== undefined && data.datasets) {
      data.datasets = data.datasets.map((dataset: any) => ({
        ...dataset,
        tension: datasetTension
      }));
    }
  } catch (error) {
    console.error('Error parsing chart data:', error);
  }

  // 处理拖拽
  useEffect(() => {
    if (!divRef.current) return;
    handleDnD?.(divRef);
  }, [handleDnD]);

  // 转换组件配置为 内联样式和类名
  const { isSelected, canDrop, isOverShallow } = componentDep || {}
  const { style: inlineStyle, className } = convertConfigToStyle(component)
  const newClassName = useMemo(() => {
    return `${isSelected ? 'component-preview__selected' : ''} ${canDrop && isOverShallow && component.comSchemaId !== ComTree.PREVIEW_NODE_ID ? 'component-preview__can-drop' : ''} ${className} ${component.comSchemaId === ComTree.PREVIEW_NODE_ID ? 'component-preview__pre' : ''}`
  }, [isSelected, canDrop, isOverShallow, className, component.comSchemaId])

  // 渲染柱状图
  const renderChart = () => {
    return (
      <div className="component__chart-data">
        {/* 数据集标签 */}
        <div className="component__chart-data-legend">
          {data.datasets && data.datasets.map((dataset, datasetIndex) => (
            <div key={datasetIndex} className="component__chart-data-legend-item">
              <span
                className="component__chart-data-legend-color"
                style={{ backgroundColor: dataset.borderColor || 'rgba(75, 192, 192, 1)' }}
              />
              <span className="component__chart-data-legend-label">{dataset.label}</span>
            </div>
          ))}
        </div>
        {data.labels && data.labels.map((label, index) => (
          <div key={index} className="component__chart-data-item">
            <span className="component__chart-data-label">{label}</span>
            <div className="component__chart-data-bars">
              {data.datasets && data.datasets.map((dataset, datasetIndex) => {
                const barHeight = dataset.data && dataset.data[index] !== undefined ? dataset.data[index] * 0.8 : 0;
                return (
                  <div
                    key={datasetIndex}
                    className="component__chart-data-bar"
                    style={{
                      height: `${Math.max(0, barHeight)}%`,
                      backgroundColor: dataset.backgroundColor || 'rgba(75, 192, 192, 0.2)',
                      borderColor: dataset.borderColor || 'rgba(75, 192, 192, 1)'
                    }}
                  />
                );
              })}
            </div>
          </div>
        ))}
      </div>
    );
  };

  return (
    <div
      ref={divRef}
      className={`component-preview__default component__chart ${newClassName}`}
      style={inlineStyle}
      onMouseDown={(e) => handleComponentSelect?.(e)}
    >
      <div className="component__chart-content">
        <div className="component__chart-placeholder">
          <div className="component__chart-title">柱状图</div>
          <div className="component__chart-body">
            {renderChart()}
          </div>
        </div>
      </div>
    </div>
  );
}

export { BarChart };
