import React, { useState } from "react";
import { ColorPickerConfigItem } from "@/type/ConfigItem";

interface ColorPickerProps {
  configItem: ColorPickerConfigItem;
  setCurrentValue: (value: string) => void;
}

const ColorPicker: React.FC<ColorPickerProps> = ({
  configItem,
  setCurrentValue
}) => {
  const {
    field,
    label,
    uiType,
    placeholder,
    defaultValue,
    currentValue,
  } = configItem;

  const handleColorChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newColor = e.target.value;
    setCurrentValue(newColor);
  };

  return (
    <div className="config-item">
      <label className="config-item__label">{label}</label>
      <div className="config-item__ui color-picker border">
        <input
          className="color-picker-input border"
          type="color"
          value={currentValue}
          onChange={handleColorChange}
          onBlur={handleColorChange}
        />
        {/* 设置为透明 */}
        <button className="transparent-btn" onClick={() => setCurrentValue(currentValue === 'transparent' ? defaultValue : 'transparent')}>
          {currentValue === 'transparent' ? '取消透明' : '设置透明'}
        </button>
      </div>
    </div>
  );
};

export default ColorPicker;

