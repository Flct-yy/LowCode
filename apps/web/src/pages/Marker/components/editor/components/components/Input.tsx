import React from "react";
import { InputConfigItem } from "@wect/type";


const Input = ({
  configItem,
  setCurrentValue,
}: {
  configItem: InputConfigItem;
  setCurrentValue: (value: string) => void;
}) => {
  const {
    field,
    label,
    uiType,
    placeholder,
    defaultValue,
    currentValue,
  } = configItem;

  return (
    <div className="config-item">
      <label className="config-item__label">{label}</label>
      <input
        className="config-item__ui border padding noOutline"
        type="text"
        value={currentValue || ''}
        onChange={(e) => setCurrentValue(e.target.value)}
        onBlur={(e) => setCurrentValue(e.target.value)}
        placeholder={placeholder}
      />
    </div>
  )
} 

export default Input;