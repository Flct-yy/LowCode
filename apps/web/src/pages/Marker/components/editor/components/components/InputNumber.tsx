import React, { useState, useEffect } from "react";
import { InputNumberConfigItem } from "@/type/ConfigItem";

const InputNumber = ({
  configItem,
  setCurrentValue,
}: {
  configItem: InputNumberConfigItem;
  setCurrentValue: (value: number) => void;
}) => {
  const {
    field,
    label,
    uiType,
    placeholder,
    min,
    max,
    step,
    defaultValue,
    currentValue,
  } = configItem;


  // 当前显示的值
  const [currentNumber, setCurrentNumber] = useState(currentValue);

  useEffect(() => {
    setCurrentNumber(currentValue);
  }, [currentValue]);

  const handleChange = (value: string) => {
    const trimmedValue = value.trim();
    let numValue = Number(trimmedValue);
    // 检查是否为有效数字
    if (!Number.isNaN(numValue)) {
      if (typeof min === 'number' && numValue < min) {
        numValue = min;
      }
      if (typeof max === 'number' && numValue > max) {
        numValue = max;
      }
      console.log('numValue', numValue);
      setCurrentNumber(numValue);
      setCurrentValue(numValue);
    } else {
      console.log('输入无效，回滚到当前值', currentValue);
      setCurrentNumber(currentValue);
    }
  }
  return (
    <div className="config-item">
      <label className="config-item__label">{label + 'number'}</label>
      <div className="input_number-container config-item__ui border padding noOutline">
        <input
          type="text"
          className="border noBorder noOutline"
          value={currentNumber}
          onChange={(e) => setCurrentNumber(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              handleChange((e.target as HTMLInputElement).value);
            }
          }}
        />
        <div className="input_number-actions">
          <div className="input_number-action input_number-action-subtract"
            onClick={() => handleChange((currentNumber - (typeof step === 'number' ? step : 1)).toString())}>-</div>
          <div className="input_number-action input_number-action-add"
            onClick={() => handleChange((currentNumber + (typeof step === 'number' ? step : 1)).toString())}>+</div>
        </div>
      </div>
    </div>
  );
}

export default InputNumber;
