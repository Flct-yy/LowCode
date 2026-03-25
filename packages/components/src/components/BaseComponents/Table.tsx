import React, { useRef, useMemo, useEffect } from 'react';
import { ComponentSchema, ComTree } from '@wect/type';
import { convertConfigToStyle } from '@/utils/convertConfigToStyle';
import { getConfigValue } from '@/utils/index';
import '@/scss/preview.scss';

function Table({
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

  // 处理拖拽 - 移到useEffect中避免渲染期间状态更新
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

  // 从配置中获取表头信息
  const columnsConfig = getConfigValue<string | any[]>(component.config, 'columns');
  let columns: any[];
  
  // 从配置中获取数据源信息
  const dataSourceConfig = getConfigValue<string | any[]>(component.config, 'sampleConfig');
  
  let dataSource: any[] = [];

  try {
    // 尝试解析JSON字符串
    if (typeof columnsConfig === 'string') {
      columns = JSON.parse(columnsConfig);
    } else if (Array.isArray(columnsConfig)) {
      columns = columnsConfig;
    } else {
      // 默认表头
      columns = [
        { title: '姓名', dataIndex: 'name' },
        { title: '年龄', dataIndex: 'age' },
        { title: '性别', dataIndex: 'gender' },
        { title: '职业', dataIndex: 'job' },
      ];
    }
    
    // 尝试解析数据源配置
    if (typeof dataSourceConfig === 'string') {
      dataSource = JSON.parse(dataSourceConfig);
    } else if (Array.isArray(dataSourceConfig)) {
      dataSource = dataSourceConfig;
    } else {
      // 默认空数据
      dataSource = [];
    }

    console.log('dataSource', dataSource);
  } catch (error) {
    // 解析失败时使用默认表头和空数据
    columns = [
      { title: '姓名', dataIndex: 'name' },
      { title: '年龄', dataIndex: 'age' },
      { title: '性别', dataIndex: 'gender' },
      { title: '职业', dataIndex: 'job' },
    ];
    dataSource = [];
  }

  return (
    <div
      ref={divRef}
      className={`component-preview__default component__table ${newClassName}`}
      style={inlineStyle}
      onMouseDown={(e) => handleComponentSelect?.(e)}
    >
      <div className="component__table-content">
        <table>
          <thead>
            <tr>
              {columns.map((column, index) => (
                <th key={index}>{column.title}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {dataSource.length > 0 ? (
              dataSource.map((row, rowIndex) => (
                <tr key={rowIndex}>
                  {columns.map((column, colIndex) => (
                    <td key={colIndex}>{row[column.dataIndex]}</td>
                  ))}
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={columns.length} className="component__table-empty">
                  <span>暂无数据</span>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export { Table };