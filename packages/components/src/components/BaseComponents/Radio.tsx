import React, { useRef, useMemo, useEffect, useState } from 'react';
import { ComponentSchema, ComTree } from '@wect/type';
import { convertConfigToStyle } from '@/utils/convertConfigToStyle';
import { getConfigValue } from '@/utils/index';
import '@/scss/preview.scss';

function Radio({
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
  const [value, setValue] = useState<string>('');
  
  // 处理拖拽 - 移到useEffect中避免渲染期间状态更新
  useEffect(() => {
    handleDnD?.(divRef);
  }, [handleDnD]);

  // 转换组件配置为 内联样式和类名
  const { isSelected, canDrop, isOverShallow } = componentDep || {}
  const { style: inlineStyle, className } = convertConfigToStyle(component)
  const newClassName = useMemo(() => {
    return `${isSelected ? 'component-preview__selected' : ''} ${canDrop && isOverShallow && component.comSchemaId !== ComTree.PREVIEW_NODE_ID ? 'component-preview__can-drop' : ''} ${className} ${component.comSchemaId === ComTree.PREVIEW_NODE_ID ? 'component-preview__pre' : ''}`
  }, [isSelected, canDrop, isOverShallow, className, component.comSchemaId])

  // 从配置中获取选项数据
  const getOptions = () => {
    try {
      const optionsConfig = getConfigValue<string>(component.config, 'options');
      if (optionsConfig) {
        const parsedOptions = JSON.parse(optionsConfig);
        if (Array.isArray(parsedOptions)) {
          return parsedOptions;
        }
      }
    } catch (error) {
      console.error('Failed to parse radio options:', error);
    }
    // 默认选项
    return [
      { label: '选项1', value: 'option1' },
      { label: '选项2', value: 'option2' },
      { label: '选项3', value: 'option3' },
    ];
  };

  const options = getOptions();
  // 从配置中获取默认值
  const defaultValue = getConfigValue<string>(component.config, 'defaultValue') || '';
  // 从配置中获取方向
  const direction = getConfigValue<string>(component.config, 'direction') || 'horizontal';
  
  // 初始化默认值
  useEffect(() => {
    setValue(defaultValue);
  }, [defaultValue]);

  // 处理选择
  const handleSelect = (optionValue: string) => {
    setValue(optionValue);
  };

  return (
    <div
      ref={divRef}
      className={`component-preview__default component__radio ${newClassName}`}
      style={inlineStyle}
      onMouseDown={(e) => handleComponentSelect?.(e)}
    >
      <div className={`radio-group radio-group--${direction}`}>
        {options.map((option) => (
          <div key={option.value} className="radio-item">
            <input
              type="radio"
              id={`radio-${option.value}`}
              name="radio-group"
              value={option.value}
              checked={value === option.value}
              onChange={() => handleSelect(option.value)}
              className="radio-input"
            />
            <label htmlFor={`radio-${option.value}`} className="radio-label">
              {option.label}
            </label>
          </div>
        ))}
      </div>
    </div>
  );
}

export { Radio };