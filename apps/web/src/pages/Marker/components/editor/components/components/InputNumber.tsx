import React, { useState, useEffect } from "react";
import { Select } from "antd";
import { InputNumberConfigItem } from "@/type/ConfigItem";

const InputNumber = ({
  configItem,
  setCurrentValue,
  setCurrentUnit,
}: {
  configItem: InputNumberConfigItem;
  setCurrentValue: (value: number) => void;
  setCurrentUnit: (unit: string) => void;
}) => {
  const {
    field,
    label,
    uiType,
    min,
    max,
    step,
    defaultValue,
    currentValue,
    currentUnit,
    units,
    unit,
    maxs,
    mins,
  } = configItem;


  // 当前显示的值
  const [currentNumber, setCurrentNumber] = useState(currentValue);

  useEffect(() => {
    setCurrentNumber(currentValue);
    handleChange(currentValue.toString());
  }, [currentValue, currentUnit]);

  // 获取步长的小数位数
  const getDecimalPlaces = (step: number): number => {
    if (step === 0) {
      return 0;
    }

    // 处理负数步长的情况
    const absStep = Math.abs(step);
    if (absStep % 1 === 0) {
      return 0; // 整数步长，无小数位
    }

    const stepStr = absStep.toString();
    const decimalIndex = stepStr.indexOf('.');
    if (decimalIndex === -1) {
      return 0;
    }

    return stepStr.length - decimalIndex - 1; // 计算小数位数
  };

  const handleChange = (value: string) => {
    const trimmedValue = value.trim();
    let numValue = +Number(trimmedValue).toFixed(getDecimalPlaces(step || 0));
    // 检查是否为有效数字
    if (!Number.isNaN(numValue)) {
      // 修复单位索引查找逻辑
      let unitIndex: number = -1;
      let minValue: number = min ?? 0;
      let maxValue: number = max ?? Number.MAX_SAFE_INTEGER;
      if (units && units.length > 0) {
        unitIndex = units.findIndex(item => String(item.value) === String(currentUnit));
        minValue = mins && mins[unitIndex] ? mins[unitIndex] : minValue;
        maxValue = maxs && maxs[unitIndex] ? maxs[unitIndex] : maxValue;
      }

      if (typeof minValue === 'number' && numValue < minValue) {
        numValue = minValue;
      }
      if (typeof maxValue === 'number' && numValue > maxValue) {
        numValue = maxValue;
      }

      setCurrentNumber(numValue);
      setCurrentValue(numValue);
    } else {
      setCurrentNumber(currentValue);
    }
  }

  return (
    <div className="config-item">
      <label className="config-item__label">{label}</label>
      <div className="input_number-container config-item__ui border padding noOutline">
        <input
          type="text"
          className="border noBorder noOutline"
          value={currentNumber}
          onChange={(e) => setCurrentNumber(e.target.value)}
          onBlur={(e) => handleChange((e.target as HTMLInputElement).value)}
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
      <div className="input_number-unit-container">
        {
          configItem.unit && <div className="input_number-unit">{configItem.unit}</div>
        }
        {
          configItem.units && <div className="input_number-units">
            <Select
              options={configItem.units}
              value={currentUnit}
              onChange={setCurrentUnit}
            />
          </div>
        }
      </div>
    </div>
  );
}

export default InputNumber;
