import React, { useRef, useMemo, useEffect } from 'react';
import { ComponentSchema, ComTree } from '@wect/type';
import { convertConfigToStyle } from '@/utils/convertConfigToStyle';
import { getConfigValue } from '@/utils/index';
import '@/scss/preview.scss';

function LineChart({
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
    labels: ['一月', '二月', '三月', '四月', '五月', '六月'],
    datasets: [
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

  // 渲染折线图
  const renderChart = () => {
    return (
      <div className="component__chart-line">
        {/* 数据集标签 */}
        <div className="component__chart-line-legend">
          {data.datasets && data.datasets.map((dataset, datasetIndex) => (
            <div key={datasetIndex} className="component__chart-line-legend-item">
              <span
                className="component__chart-line-legend-color"
                style={{ backgroundColor: dataset.borderColor || 'rgba(75, 192, 192, 1)' }}
              />
              <span className="component__chart-line-legend-label">{dataset.label}</span>
            </div>
          ))}
        </div>
        {data.datasets && data.datasets.map((dataset, datasetIndex) => {
          // 计算折线的点
          const points = data.labels && data.labels.map((_, index) => {
            const value = dataset.data && dataset.data[index] !== undefined ? dataset.data[index] : 0;
            const x = (index / (data.labels.length - 1)) * 100;
            const y = 100 - (value * 0.8);
            return { x, y };
          });

          // 创建SVG路径
          let pathD = '';
          if (points && points.length > 0) {
            pathD = `M ${points[0].x} ${points[0].y}`;
            for (let i = 1; i < points.length; i++) {
              pathD += ` L ${points[i].x} ${points[i].y}`;
            }
          }

          return (
            <div key={datasetIndex} className="component__chart-line-dataset">
              <svg width="100%" height="100%" viewBox="0 0 100 100" preserveAspectRatio="none">
                <path
                  d={pathD}
                  fill="none"
                  stroke={dataset.borderColor || 'rgba(75, 192, 192, 1)'}
                  strokeWidth="1"
                />
                {points && points.map((point, index) => (
                  <circle
                    key={index}
                    cx={point.x}
                    cy={point.y}
                    r="1"
                    fill={dataset.borderColor || 'rgba(75, 192, 192, 1)'}
                  />
                ))}
              </svg>
            </div>
          );
        })}
        <div className="component__chart-line-labels">
          {data.labels && data.labels.map((label, index) => (
            <span
              key={index}
              className="component__chart-line-label"
              style={{
                left: `${(index / (data.labels.length - 1)) * 100}%`
              }}
            >
              {label}
            </span>
          ))}
        </div>
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
          <div className="component__chart-title">折线图</div>
          {renderChart()}
        </div>
      </div>
    </div>
  );
}

export { LineChart };
