import React, { useRef, useMemo, useEffect } from 'react';
import { ComponentSchema, ComTree } from '@wect/type';
import { convertConfigToStyle } from '@/utils/convertConfigToStyle';
import { getConfigValue } from '@/utils/index';
import '@/scss/preview.scss';

function RadarChart({
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
  const divRef = useRef<HTMLDivElement>(null);

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
    labels: ['速度', '可靠性', '价格', '功能', '设计'],
    datasets: [
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
    handleDnD?.(divRef);
  }, [handleDnD]);

  // 转换组件配置为 内联样式和类名
  const { isSelected, canDrop, isOverShallow } = componentDep || {}
  const { style: inlineStyle, className } = convertConfigToStyle(component)
  const newClassName = useMemo(() => {
    return `${isSelected ? 'component-preview__selected' : ''} ${canDrop && isOverShallow && component.comSchemaId !== ComTree.PREVIEW_NODE_ID ? 'component-preview__can-drop' : ''} ${className} ${component.comSchemaId === ComTree.PREVIEW_NODE_ID ? 'component-preview__pre' : ''}`
  }, [isSelected, canDrop, isOverShallow, className, component.comSchemaId])

  // 渲染雷达图
  const renderChart = () => {
    const maxValue = data.datasets && data.datasets.length > 0 ? Math.max(...data.datasets[0].data) : 100;

    return (
      <div className="component__chart-radar">
        <div className="component__chart-radar-grid">
          {/* 五边形边框 */}
          <div className="component__chart-radar-grid-border">
            <svg width="100%" height="100%" viewBox="0 0 100 100">
              <polygon
                points={data.labels && data.labels.map((label, index) => {
                  const angle = (index / data.labels.length) * Math.PI * 2 - Math.PI / 2;
                  const x = 50 + 55 * Math.cos(angle);
                  const y = 50 + 55 * Math.sin(angle);
                  return `${x},${y}`;
                }).join(' ')}
                fill="none"
                stroke="#999"
                strokeWidth="1"
              />
            </svg>
          </div>
          {[1, 0.75, 0.5, 0.25].map((level, levelIndex) => (
            <div key={levelIndex} className="component__chart-radar-grid-level" style={{ transform: `scale(${level})` }}>
              {data.labels && data.labels.map((label, labelIndex) => {
                const angle = (labelIndex / data.labels.length) * Math.PI * 2 - Math.PI / 2;
                const x = 50 + 50 * level * Math.cos(angle);
                const y = 50 + 50 * level * Math.sin(angle);
                return (
                  <div key={labelIndex} className="component__chart-radar-grid-point" style={{ left: `${x}%`, top: `${y}%` }} />
                );
              })}
            </div>
          ))}
        </div>
        <div className="component__chart-radar-labels">
          {data.labels && data.labels.map((label, labelIndex) => {
            const angle = (labelIndex / data.labels.length) * Math.PI * 2 - Math.PI / 2;
            const x = 50 + 60 * Math.cos(angle);
            const y = 50 + 60 * Math.sin(angle);
            return (
              <span
                key={labelIndex}
                className="component__chart-radar-label"
                style={{
                  left: `${x}%`,
                  top: `${y}%`,
                  transform: 'translate(-50%, -50%)'
                }}
              >
                {label}
              </span>
            );
          })}
        </div>
        {data.datasets && data.datasets.map((dataset, datasetIndex) => (
          <div key={datasetIndex} className="component__chart-radar-dataset">
            <svg width="100%" height="100%" viewBox="0 0 100 100">
              <polygon
                points={data.labels && data.labels.map((label, index) => {
                  const value = dataset.data && dataset.data[index] !== undefined ? dataset.data[index] : 0;
                  const normalizedValue = value / maxValue;
                  const angle = (index / data.labels.length) * Math.PI * 2 - Math.PI / 2;
                  const x = 50 + 50 * normalizedValue * Math.cos(angle);
                  const y = 50 + 50 * normalizedValue * Math.sin(angle);
                  return `${x},${y}`;
                }).join(' ')}
                fill={dataset.backgroundColor || 'rgba(75, 192, 192, 0.2)'}
                stroke={dataset.borderColor || 'rgba(75, 192, 192, 1)'}
                strokeWidth="1"
              />
            </svg>
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
          <div className="component__chart-title">雷达图</div>
          <div className="component__chart-body">
            {renderChart()}
          </div>
        </div>
      </div>
    </div>
  );
}

export { RadarChart };
