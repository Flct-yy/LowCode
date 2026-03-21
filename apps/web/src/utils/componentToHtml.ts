import { ComponentSchema, ComponentTypeEnum } from '@wect/type';
import { exportAllStyles } from '@wect/components';
import * as React from 'react';
import * as ReactDOMServer from 'react-dom/server';

/**
 * 转义HTML特殊字符
 */
const escapeHtml = (str: string): string => {
  if (!str) return '';
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
};

// 导入所有组件
import { Button } from '@wect/components';
import { Text } from '@wect/components';
import { Image } from '@wect/components';
import { Input } from '@wect/components';
import { Slider } from '@wect/components';
import { Label } from '@wect/components';
import { Textarea } from '@wect/components';
import { Switch } from '@wect/components';
import { Calendar } from '@wect/components';
import { Pagination } from '@wect/components';
import { Table } from '@wect/components';
import { Menu } from '@wect/components';
import { TimePicker } from '@wect/components';
import { LineChart } from '@wect/components';
import { BarChart } from '@wect/components';
import { PieChart } from '@wect/components';
import { RadarChart } from '@wect/components';
import { Timeline } from '@wect/components';
import { Drawer } from '@wect/components';
import { Select } from '@wect/components';
import { Radio } from '@wect/components';
import { Flex } from '@wect/components';
import { Card } from '@wect/components';
import { Form } from '@wect/components';

// 组件映射
const componentMap: Record<string, React.ElementType> = {
  [ComponentTypeEnum.BUTTON]: Button,
  [ComponentTypeEnum.TEXT]: Text,
  [ComponentTypeEnum.IMAGE]: Image,
  [ComponentTypeEnum.INPUT]: Input,
  [ComponentTypeEnum.SLIDER]: Slider,
  [ComponentTypeEnum.LABEL]: Label,
  [ComponentTypeEnum.TEXTAREA]: Textarea,
  [ComponentTypeEnum.SWITCH]: Switch,
  [ComponentTypeEnum.CALENDAR]: Calendar,
  [ComponentTypeEnum.PAGINATION]: Pagination,
  [ComponentTypeEnum.TABLE]: Table,
  [ComponentTypeEnum.MENU]: Menu,
  [ComponentTypeEnum.TIME_PICKER]: TimePicker,
  [ComponentTypeEnum.LINE_CHART]: LineChart,
  [ComponentTypeEnum.BAR_CHART]: BarChart,
  [ComponentTypeEnum.PIE_CHART]: PieChart,
  [ComponentTypeEnum.RADAR_CHART]: RadarChart,
  [ComponentTypeEnum.TIMELINE]: Timeline,
  [ComponentTypeEnum.DRAWER]: Drawer,
  [ComponentTypeEnum.SELECT]: Select,
  [ComponentTypeEnum.RADIO]: Radio,
  [ComponentTypeEnum.FLEX]: Flex,
  [ComponentTypeEnum.CARD]: Card,
  [ComponentTypeEnum.FORM]: Form
};

/**
 * 渲染单个组件为HTML字符串
 */
const renderComponent = (component: ComponentSchema): string => {
  const { metadata } = component;
  const Component = componentMap[metadata.componentType];
  
  if (!Component) {
    // 处理未知组件类型
    return `<div class="component-preview__default component__default">${metadata.componentType}</div>`;
  }
  
  try {
    // 渲染 React 组件为 HTML 字符串
    const element = React.createElement(Component, {
      component,
      componentDep: {
        isSelected: false,
        canDrop: false,
        isOverShallow: false
      }
    });
    return ReactDOMServer.renderToString(element);
  } catch (error) {
    console.error(`Error rendering component ${metadata.componentType}:`, error);
    return `<div class="component-preview__default component__error">Error rendering ${metadata.componentType}</div>`;
  }
};

/**
 * 将组件转换为HTML字符串
 */
export const componentToHtml = (component: ComponentSchema): string => {
  try {
    if (!component || !component.metadata) {
      return '';
    }

    const { metadata, children } = component;
    
    // 渲染当前组件
    let currentHtml = renderComponent(component);
    
    // 处理子组件
    if (children && Array.isArray(children) && children.length > 0) {
      const childrenHtml = children
        .map(child => componentToHtml(child as ComponentSchema))
        .join('');
      
      // 对于容器组件，需要将子组件插入到合适位置
      // 简化处理：替换最后一个闭合标签前的内容
      if ([ComponentTypeEnum.ROOT, ComponentTypeEnum.FLEX, ComponentTypeEnum.FORM, ComponentTypeEnum.CARD, ComponentTypeEnum.TIMELINE, ComponentTypeEnum.DRAWER, ComponentTypeEnum.MENU, ComponentTypeEnum.TABLE].includes(metadata.componentType)) {
        const lastClosingTagIndex = currentHtml.lastIndexOf('</');
        if (lastClosingTagIndex > -1) {
          currentHtml = currentHtml.substring(0, lastClosingTagIndex) + childrenHtml + currentHtml.substring(lastClosingTagIndex);
        }
      }
    }
    
    return currentHtml;
  } catch (error) {
    console.error('Error in componentToHtml:', error);
    return '';
  }
};

/**
 * 生成完整的HTML页面
 */
export const wholeHtml = (title: string, root: ComponentSchema): string => {
  if (!root) {
    return '';
  }

  const contentHtml = componentToHtml(root);
  const contentStyle = exportAllStyles();
  const escapedTitle = escapeHtml(title || 'Low Code Page');

  // 预览样式
  const previewStyle = `.component-preview__pre {
  background-color: rgba(255, 192, 203, 0.5) !important;
  border: 2px dashed #52c41a !important;
  border-radius: 4px !important;
  opacity: 0.7 !important;
  /* 淡入效果：预览节点出现时的过渡动画 */
  animation: fadeIn 0.2s ease-in-out;

  /* 脉冲效果：吸引用户注意力 */
  animation: pulse 1.5s infinite;
}

/* 淡入动画 */
@keyframes fadeIn {
  from {
    opacity: 0;
  }

  to {
    opacity: 0.7;
  }
}

/* 脉冲动画 */
@keyframes pulse {
  0% {
    box-shadow: 0 0 0 0 rgba(82, 196, 26, 0.4);
  }

  70% {
    box-shadow: 0 0 0 10px rgba(82, 196, 26, 0);
  }

  100% {
    box-shadow: 0 0 0 0 rgba(82, 196, 26, 0);
  }
}

/* Calendar组件样式 */
.component__calendar {
  width: 300px;
  height: 300px;
  border: 1px solid #d9d9d9;
  border-radius: 4px;
  overflow: hidden;
  background: #fff;
}

.component__calendar-content {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
}

.component__calendar-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 10px;
  border-bottom: 1px solid #f0f0f0;
  background: #fafafa;
}

.component__calendar-prev,
.component__calendar-next {
  cursor: pointer;
  padding: 4px;
  border-radius: 4px;
  transition: all 0.3s;
}

.component__calendar-prev:hover,
.component__calendar-next:hover {
  background: #e6f7ff;
}

.component__calendar-title {
  font-weight: 500;
}

.component__calendar-weekdays {
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  padding: 8px 0;
  border-bottom: 1px solid #f0f0f0;
  background: #fafafa;
}

.component__calendar-weekdays span {
  text-align: center;
  font-size: 12px;
  color: #999;
  padding: 4px 0;
}

.component__calendar-days {
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  flex: 1;
  padding: 8px 0;
}

.component__calendar-day {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 8px 0;
  font-size: 14px;
  cursor: pointer;
  transition: all 0.3s;
  border-radius: 4px;
}

.component__calendar-day:hover {
  background: #e6f7ff;
}

.component__calendar-day--empty {
  color: #f0f0f0;
  cursor: default;
}

.component__calendar-day--empty:hover {
  background: none;
}

/* Pagination组件样式 */
.component__pagination {
  width: 400px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #fff;
}

.component__pagination-content {
  display: flex;
  align-items: center;
  gap: 8px;
}

.component__pagination-item {
  padding: 4px 12px;
  border: 1px solid #d9d9d9;
  border-radius: 4px;
  cursor: pointer;
  transition: all 0.3s;
  font-size: 14px;
}

.component__pagination-item:hover {
  border-color: #1890ff;
  color: #1890ff;
}

.component__pagination-item--active {
  background: #1890ff;
  border-color: #1890ff;
  color: #fff;
}

.component__pagination-item--disabled {
  color: #bfbfbf;
  border-color: #d9d9d9;
  cursor: not-allowed;
}

.component__pagination-item--disabled:hover {
  color: #bfbfbf;
  border-color: #d9d9d9;
}

/* Table组件样式 */
.component__table {
  width: 500px;
  height: 200px;
  border: 1px solid #d9d9d9;
  border-radius: 4px;
  overflow: hidden;
  background: #fff;
}

.component__table-content {
  width: 100%;
  height: 100%;
  overflow: auto;
}

.component__table table {
  width: 100%;
  border-collapse: collapse;
}

.component__table th,
.component__table td {
  padding: 8px 16px;
  border: 1px solid #f0f0f0;
  text-align: left;
}

.component__table th {
  background: #fafafa;
  font-weight: 500;
  color: #333;
  position: sticky;
  top: 0;
  z-index: 1;
}

.component__table tr:hover {
  background: #f5f5f5;
}

.component__table .component__table-empty {
  text-align: center;
  padding: 40px 0;
  color: #999;
  background: #fafafa;

}

/* Menu组件样式 */
.component__menu {
  width: 300px;
  height: 40px;
  background: #fff;
  border: 1px solid #d9d9d9;
  border-radius: 4px;
  overflow: hidden;
}

.component__menu-content {
  width: 100%;
  height: 100%;
}

.component__menu ul {
  display: flex;
  list-style: none;
  margin: 0;
  padding: 0;
  height: 100%;
}

.component__menu-item {
  padding: 0 16px;
  display: flex;
  align-items: center;
  cursor: pointer;
  transition: all 0.3s;
  font-size: 14px;
  color: #333;
}

.component__menu-item:hover {
  background: #f5f5f5;
  color: #1890ff;
}

.component__menu-item--active {
  background: #1890ff;
  color: #fff;
}

/* TimePicker组件样式 */
.component__time-picker {
  width: 150px;
  height: 40px;
  background: #fff;
  border: 1px solid #d9d9d9;
  border-radius: 4px;
  overflow: hidden;
}

.component__time-picker-content {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  padding: 0 12px;
}

.component__time-picker-input {
  width: 100%;
  height: 100%;
  border: none;
  outline: none;
  font-size: 14px;
  color: #333;
  background: transparent;
}

.component__time-picker-input:focus {
  border-color: #1890ff;
  box-shadow: 0 0 0 2px rgba(24, 144, 255, 0.2);
}

/* Chart组件样式 */
.component__chart {
  width: 400px;
  height: 300px;
  background: #fff;
  border: 1px solid #d9d9d9;
  border-radius: 4px;
  overflow: hidden;
}

.component__chart-content {
  width: 100%;
  height: 100%;
  padding: 20px;
  display: flex;
  flex-direction: column;
}

.component__chart-placeholder {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
}

.component__chart-title {
  font-size: 16px;
  font-weight: 500;
  color: #333;
  margin-bottom: 20px;
  text-align: center;
}

.component__chart-body {
  flex: 1;
  position: relative;
}

.component__chart-data {
  flex: 1;
  display: flex;
  align-items: flex-end;
  justify-content: space-around;
  padding-bottom: 20px;
  height: 100%;
}

.component__chart-data-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 40px;
  height: 100%; /* 确保数据项有足够的高度 */
}

.component__chart-data-label {
  font-size: 12px;
  color: #999;
  margin-bottom: 8px;
}

.component__chart-data-bars {
  display: flex;
  align-items: flex-end;
  gap: 4px;
  height: 100%; /* 确保数据条容器有足够的高度 */
  width: 100%; /* 确保宽度充满 */
}

.component__chart-data-bar {
  width: 16px;
  border-radius: 4px 4px 0 0;
  transition: all 0.3s;
  flex: 1; /* 让数据条充满容器 */
  background-color: rgba(75, 192, 192, 0.2); /* 默认背景色 */
  border: 1px solid rgba(75, 192, 192, 1); /* 默认边框 */
}

/* 柱状图数据集标签 */
.component__chart-data-legend {
  position: absolute;
  top: 10px;
  right: 10px;
  display: flex;
  flex-direction: column;
  gap: 5px;
  z-index: 10;
}

.component__chart-data-legend-item {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 12px;
  color: #666;
}

.component__chart-data-legend-color {
  width: 12px;
  height: 12px;
}

/* Timeline组件样式 */
.component__timeline {
  position: relative;
  padding: 16px;
}

.timeline-container {
  position: relative;
  padding-left: 24px;
}

.timeline-container::before {
  content: '';
  position: absolute;
  left: 8px;
  top: 0;
  bottom: 0;
  width: 2px;
  background-color: #d9d9d9;
}

.timeline-item {
  position: relative;
  margin-bottom: 24px;
  display: flex;
  align-items: flex-start;
}

.timeline-dot {
  position: absolute;
  left: -20px;
  top: 4px;
  width: 16px;
  height: 16px;
  border-radius: 50%;
  background-color: #1890ff;
  border: 2px solid white;
  box-shadow: 0 0 0 2px #1890ff;
}

.timeline-content {
  flex: 1;
  padding: 8px 0;
}

.timeline-time {
  font-size: 14px;
  color: #999;
  margin-bottom: 4px;
}

.timeline-text {
  font-size: 14px;
  color: #333;
  line-height: 1.4;
}

.timeline-item:last-child {
  margin-bottom: 0;
}

/* Drawer组件样式 */
.component__drawer {
  position: relative;
}

.drawer-trigger {
  padding: 8px 16px;
  background-color: #1890ff;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  display: inline-block;
}

.drawer-trigger:hover {
  background-color: #40a9ff;
}

.drawer-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 1000;
  display: flex;
  align-items: stretch;
  justify-content: flex-end;
}

.drawer-content {
  background-color: white;
  box-shadow: -2px 0 8px rgba(0, 0, 0, 0.15);
  display: flex;
  flex-direction: column;
  max-height: 100vh;
  overflow: hidden;
}

.drawer-left {
  margin-left: 0;
  margin-right: auto;
}

.drawer-top {
  width: 100%;
  height: auto;
  max-height: 50vh;
  margin-bottom: auto;
}

.drawer-bottom {
  width: 100%;
  height: auto;
  max-height: 50vh;
  margin-top: auto;
}

.drawer-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 16px;
  border-bottom: 1px solid #f0f0f0;
}

.drawer-title {
  margin: 0;
  font-size: 16px;
  font-weight: 600;
  color: #333;
}

.drawer-close {
  background: none;
  border: none;
  font-size: 20px;
  cursor: pointer;
  color: #999;
  padding: 0;
  width: 24px;
  height: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.drawer-close:hover {
  color: #333;
}

.drawer-body {
  flex: 1;
  padding: 16px;
  overflow-y: auto;
}

/* Select组件样式 */
.component__select {
  position: relative;
  display: inline-block;
}

.select-trigger {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 6px 12px;
  border: 1px solid #d9d9d9;
  border-radius: 4px;
  background-color: #ffffff;
  cursor: pointer;
  min-width: 120px;
  min-height: 32px;
}

.select-trigger:hover {
  border-color: #1890ff;
}

.select-value {
  flex: 1;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.select-arrow {
  margin-left: 8px;
  font-size: 12px;
  color: #999;
  transition: transform 0.3s;
}

.select-arrow--open {
  transform: rotate(180deg);
}

.select-dropdown {
  position: absolute;
  top: 100%;
  left: 0;
  right: 0;
  border: 1px solid #d9d9d9;
  border-radius: 4px;
  background-color: #ffffff;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
  z-index: 1000;
  max-height: 200px;
  overflow-y: auto;
}

.select-option {
  padding: 6px 12px;
  cursor: pointer;
  transition: background-color 0.3s;
}

.select-option:hover {
  background-color: #f5f5f5;
}

.select-option--selected {
  background-color: #e6f7ff;
  color: #1890ff;
}

/* Radio组件样式 */
.component__radio {
  display: inline-block;
}

.radio-group {
  display: flex;
  gap: 16px;
}

.radio-group--vertical {
  flex-direction: column;
  align-items: flex-start;
}

.radio-item {
  display: flex;
  align-items: center;
  gap: 8px;
  cursor: pointer;
}

.radio-input {
  cursor: pointer;
}

.radio-label {
  cursor: pointer;
  user-select: none;
}

.component__chart-data-bar:hover {
  opacity: 0.8;
  transform: scaleY(1.05);
}

/* 折线图样式 */
.component__chart-line {
  position: relative;
  height: 100%;
  width: 100%;
  min-height: 150px;
  padding-bottom: 30px; /* 为标签留出空间 */
}

.component__chart-line-dataset {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: calc(100% - 30px); /* 减去标签高度 */
}

.component__chart-line-labels {
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 30px;
}

.component__chart-line-label {
  position: absolute;
  bottom: 0;
  font-size: 12px;
  color: #666;
  transform: translateX(-50%);
  white-space: nowrap;
}

/* 数据集标签 */
.component__chart-line-legend {
  position: absolute;
  top: 10px;
  right: 10px;
  display: flex;
  flex-direction: column;
  gap: 5px;
  z-index: 10;
}

.component__chart-line-legend-item {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 12px;
  color: #666;
}

.component__chart-line-legend-color {
  width: 12px;
  height: 12px;
  border-radius: 2px;
}

/* 饼图样式 */
.component__chart-pie {
  position: relative;
  height: 100%;
  width: 100%;
  min-height: 150px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.component__chart-pie-segment {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}

.component__chart-pie-label {
  position: absolute;
  font-size: 12px;
  color: #333;
  text-align: center;
  white-space: nowrap;
  z-index: 5;
}

/* 雷达图样式 */
.component__chart-radar {
  position: relative;
  height: 100%;
  width: 100%;
  min-height: 150px;
  display: flex;
  align-items: center;
  justify-content: center;
  box-sizing: border-box;
}

.component__chart-radar-grid {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}

.component__chart-radar-grid-border {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 1;
}

.component__chart-radar-grid-level {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  transform-origin: center;
}

.component__chart-radar-grid-point {
  position: absolute;
  width: 4px;
  height: 4px;
  border-radius: 50%;
  background-color: #999;
  transform: translate(-50%, -50%);
}

.component__chart-radar-dataset {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}

.component__chart-radar-labels {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 10;
}

.component__chart-radar-label {
  position: absolute;
  font-size: 12px;
  color: #666;
  white-space: nowrap;
  z-index: 10;
}


// Card组件样式
.component__card {
  background-color: #ffffff;
  border: 1px solid #e8e8e8;
  border-radius: 4px;
  padding: 16px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.06);
  transition: all 0.3s ease;

  &:hover {
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  }

  .component__card-header {
    padding-bottom: 12px;
    border-bottom: 1px solid #f0f0f0;
    margin-bottom: 16px;
  }

  .component__card-title {
    font-size: 16px;
    font-weight: 600;
    color: #000000;
    margin: 0;
    padding: 0;
  }

  .component__card-body {
    min-height: 80px;
  }

  .component__card-content {
    font-size: 14px;
    color: #666666;
    line-height: 1.5;
  }
}`;

  const htmlString = `
<!DOCTYPE html>
<html lang="zh-CN">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta name="description" content="Low Code Generated Page">
  <meta name="author" content="Low Code Platform">
  <title>${escapedTitle}</title>
  <style>
    * {
      box-sizing: border-box;
      margin: 0;
      padding: 0;
    }
    body {
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
      line-height: 1.6;
      color: #333;
      background-color: #f5f5f5;
    }
    ${previewStyle}
    ${contentStyle}
  </style>
</head>
<body>
  <div class="page-container">
    ${contentHtml}
  </div>
</body>
</html>
      `;

  return htmlString;
};

/**
 * 导出HTML文件内容
 */
export const exportHtml = (title: string, root: ComponentSchema): string => {
  return wholeHtml(title, root);
};
