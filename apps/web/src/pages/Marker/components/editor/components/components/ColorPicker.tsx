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
      </div>
    </div>
  );
};

export default ColorPicker;

