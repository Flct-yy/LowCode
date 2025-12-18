import React, { useEffect, useState } from 'react';
import { DoubleInputNumberConfigItem } from '@type/ConfigItem';

const DoubleInputNumber = ({
  configItem,
  setCurrentValue,
}: {
  configItem: DoubleInputNumberConfigItem;
  setCurrentValue: (value: DoubleInputNumberConfigItem['currentValue']) => void;
}) => {

  const { label, currentValue, min, max, step } = configItem;

  // 当前显示的值
  const [currentNumberOne, setCurrentNumberOne] = useState(currentValue.one);
  const [currentNumberTwo, setCurrentNumberTwo] = useState(currentValue.two);

  useEffect(() => {
    setCurrentNumberOne(currentValue.one);
    setCurrentNumberTwo(currentValue.two);
    handleChange(currentValue.one.toString(), currentValue.two.toString());
  }, [currentValue.one]);

  // 移除不必要的useEffect，当前单位变化时不需要立即调用handleChange
  // 单位变化由父组件通过setCurrentUnit处理，值变化在失焦或按Enter时提交

  const handleChange = (valueOne: string, valueTwo: string) => {
    const trimmedValueOne = Number(valueOne.trim());
    const trimmedValueTwo = Number(valueTwo.trim());
    // 检查是否为有效数字
    if (!Number.isNaN(trimmedValueOne) && !Number.isNaN(trimmedValueTwo)) {
      // 修复单位索引查找逻辑
      let minValue: number = min ?? 0;
      let maxValue: number = max ?? Number.MAX_SAFE_INTEGER;
      let numValueOne = trimmedValueOne;
      let numValueTwo = trimmedValueTwo;

      if (typeof minValue === 'number' && numValueOne < minValue) {
        numValueOne = minValue;
      }
      if (typeof maxValue === 'number' && numValueOne > maxValue) {
        numValueOne = maxValue;
      }
      if (typeof minValue === 'number' && numValueTwo < minValue) {
        numValueTwo = minValue;
      }
      if (typeof maxValue === 'number' && numValueTwo > maxValue) {
        numValueTwo = maxValue;
      }

      setCurrentNumberOne(numValueOne);
      setCurrentNumberTwo(numValueTwo);

      setCurrentValue({
        one: numValueOne,
        two: numValueTwo,
      });
    } else {
      const curValue: DoubleInputNumberConfigItem['currentValue'] = {
        one: currentNumberOne,
        two: currentNumberTwo,
      }
      setCurrentValue(curValue);
    }
  }

  return (
    <div className="config-item">
      <label className="config-item__label">{label}</label>
      <div className="double-input-number-container">
        <div className="input_number-container config-item__ui border padding noOutline">
          <input
            type="text"
            className="double-input-number-input border noBorder noOutline"
            value={currentNumberOne}
            onChange={(e) => setCurrentNumberOne(Number(e.target.value))}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                handleChange((e.target as HTMLInputElement).value, currentNumberTwo.toString());
              }
            }}
          />
          <div className="input_number-actions">
            <div className="input_number-action input_number-action-subtract"
              onClick={() => handleChange((currentNumberOne - (typeof step === 'number' ? step : 1)).toString(), currentNumberTwo.toString())}>-</div>
            <div className="input_number-action input_number-action-add"
              onClick={() => handleChange((currentNumberOne + (typeof step === 'number' ? step : 1)).toString(), currentNumberTwo.toString())}>+</div>
          </div>
        </div>
        <div className="input_number-unit-container">
          <div className="input_number-unit">{configItem.unit}</div>
        </div>
        <div className="input_number-container config-item__ui border padding noOutline">
          <input
            type="text"
            className="double-input-number-input border noBorder noOutline"
            value={currentNumberTwo}
            onChange={(e) => setCurrentNumberTwo(Number(e.target.value))}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                handleChange(currentNumberOne.toString(), (e.target as HTMLInputElement).value);
              }
            }}
          />
          <div className="input_number-actions">
            <div className="input_number-action input_number-action-subtract"
              onClick={() => handleChange(currentNumberOne.toString(), (currentNumberTwo - (typeof step === 'number' ? step : 1)).toString())}>-</div>
            <div className="input_number-action input_number-action-add"
              onClick={() => handleChange(currentNumberOne.toString(), (currentNumberTwo + (typeof step === 'number' ? step : 1)).toString())}>+</div>
          </div>
        </div>
        <div className="input_number-unit-container">
          <div className="input_number-unit">{configItem.unit}</div>
        </div>
      </div>
    </div>
  );
};

export default DoubleInputNumber;