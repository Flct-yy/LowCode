import React, { useRef, useMemo, useEffect } from 'react';
import { ComponentSchema, ComTree } from '@wect/type';
import { convertConfigToStyle } from '@/utils/convertConfigToStyle';
import { getConfigValue } from '@/utils/index';
import '@/scss/preview.scss';

function PieChart({
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
    labels: ['产品A', '产品B', '产品C', '产品D', '产品E'],
    datasets: [
      {
        label: '市场份额',
        data: [30, 25, 20, 15, 10],
        borderColor: 'rgba(75, 192, 192, 1)',
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
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

  // 渲染饼图
  const renderChart = () => {
    const total = data.datasets && data.datasets.length > 0 ? data.datasets[0].data.reduce((sum: number, value: number) => sum + value, 0) : 0;
    let currentAngle = 0;
    
    return (
      <div className="component__chart-pie">
        {data.datasets && data.datasets.length > 0 && data.datasets[0].data.map((value, index) => {
          const percentage = total > 0 ? (value / total) * 100 : 0;
          const angle = (value / total) * 360;
          const startAngle = currentAngle;
          currentAngle += angle;
          
          const radius = 50;
          const centerX = 50;
          const centerY = 50;
          const startX = centerX + radius * Math.cos((startAngle - 90) * Math.PI / 180);
          const startY = centerY + radius * Math.sin((startAngle - 90) * Math.PI / 180);
          const endX = centerX + radius * Math.cos((currentAngle - 90) * Math.PI / 180);
          const endY = centerY + radius * Math.sin((currentAngle - 90) * Math.PI / 180);
          const largeArcFlag = angle > 180 ? 1 : 0;
          
          const path = `M ${centerX},${centerY} L ${startX},${startY} A ${radius},${radius} 0 ${largeArcFlag},1 ${endX},${endY} Z`;
          
          // 计算标签位置（在扇形的中间位置）
          const labelAngle = startAngle + angle / 2;
          const labelRadius = radius * 0.7; // 标签距离中心的距离
          const labelX = centerX + labelRadius * Math.cos((labelAngle - 90) * Math.PI / 180);
          const labelY = centerY + labelRadius * Math.sin((labelAngle - 90) * Math.PI / 180);
          
          return (
            <div key={index} className="component__chart-pie-segment">
              <svg width="100%" height="100%" viewBox="0 0 100 100">
                <path d={path} fill={data.datasets[0].backgroundColor || 'rgba(75, 192, 192, 0.2)'} stroke={data.datasets[0].borderColor || 'rgba(75, 192, 192, 1)'} strokeWidth="1" />
              </svg>
              <div 
                className="component__chart-pie-label"
                style={{
                  left: `${labelX}%`,
                  top: `${labelY}%`,
                  transform: 'translate(-50%, -50%)'
                }}
              >
                {data.labels && data.labels[index]}: {percentage.toFixed(1)}%
              </div>
            </div>
          );
        })}
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
          <div className="component__chart-title">饼图</div>
          {renderChart()}
        </div>
      </div>
    </div>
  );
}

export { PieChart };
