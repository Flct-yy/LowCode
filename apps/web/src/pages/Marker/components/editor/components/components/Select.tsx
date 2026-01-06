import React, { useEffect } from "react";
import { DownOutlined, UpOutlined } from "@ant-design/icons";
import { SelectConfigItem } from "@wect/type";
import { useState } from "react";

const Select = ({
  configItem,
  setCurrentValue,
}: {
  configItem: SelectConfigItem;
  setCurrentValue: (value: string) => void;
}) => {
  const {
    field,
    label,
    uiType,
    placeholder,
    options,
    defaultValue,
    currentValue,
  } = configItem;

  const [isOpen, setIsOpen] = useState(false);

  // 获取当前选中的选项标签
  const selectedLabel = options?.find(opt => opt.value === currentValue)?.label || placeholder || '';
  
  const selectRef = React.useRef<HTMLDivElement>(null);
  const optionsRef = React.useRef<HTMLDivElement>(null);
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        selectRef.current && !selectRef.current.contains(event.target as Node) &&
        optionsRef.current && !optionsRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);
  return (
    <div className="config-item">
      <label className="config-item__label">{label}</label>
      <div className="select-container" ref={selectRef}>
        {/* 自定义选择框 */}
        <div
          className="config-item__ui border padding noOutline select"
          onClick={() => setIsOpen(!isOpen)}
        >
          <span>{selectedLabel}</span>
          {isOpen ? <UpOutlined /> : <DownOutlined />}
        </div>

        {/* 自定义下拉选项 */}
        {isOpen && (
          <div className="select-options" ref={optionsRef}>
            {options?.map((item) => (
              <div
                key={item.value}
                className={`select-option ${currentValue === item.value ? 'selected' : ''}`}
                onClick={() => {
                  setCurrentValue(item.value);
                  setIsOpen(false);
                }}
              >
                {item.label}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default Select;