import React, { useState } from "react";
import { ColorPickerConfigItem } from "@/type/ConfigItem";

interface ColorPickerProps {
  configItem: ColorPickerConfigItem;
  setCurrentValue: (value: string) => void;
}

const MColorPicker: React.FC<ColorPickerProps> = ({
  configItem,
}) => {
  const {
    field,
    label,
    uiType,
    placeholder,
    defaultValue,
    currentValue,
  } = configItem;
  const [currentColor, setCurrentColor] = useState(currentValue);

  const handleColorChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newColor = e.target.value;
    setCurrentColor(newColor);
  };

  return (
    <div className="config-item">
      <label className="config-item__label">{label}</label>
      <div className="config-item__ui color-picker border">
        <input
          className="color-picker-input border"
          type="color"
          value={currentColor}
          onChange={handleColorChange}
        />
      </div>
    </div>
  );
};

export default MColorPicker;

