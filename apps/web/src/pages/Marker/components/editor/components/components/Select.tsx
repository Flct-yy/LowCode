import React from "react";
import { DownOutlined, UpOutlined } from "@ant-design/icons";
import { SelectConfigItem } from "@type/ConfigItem";
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

  return (
    <div className="config-item">
      <label className="config-item__label">{label + 'select'}</label>
      <div className="select-container">
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
          <div className="select-options">
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