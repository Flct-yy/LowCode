import React, { useState } from "react";
import { MarginPaddingConfigItem } from "@/type/ConfigItem";

interface MarginPaddingProps {
  configItem: MarginPaddingConfigItem;
  setCurrentValue: (value: { margin: Record<string, number>, padding: Record<string, number> }) => void;
}

const MarginPadding: React.FC<MarginPaddingProps> = ({
  configItem,
  setCurrentValue,
}) => {
  const {
    field,
    label,
    uiType,
    placeholder,
    defaultValue,
    currentValue,
  } = configItem;

  const handleChange = (marginOrPadding: string, direction: string, value: string) => {
    const numValue = Number(value);
    if (Number.isNaN(numValue) || numValue > 1000) {
      return;
    }
    const newCurrentValue = {
      ...currentValue,
      [marginOrPadding]: {
        ...(currentValue[marginOrPadding as keyof typeof currentValue]),
        [direction]: numValue,
      },
    };

    console.log('newCurrentValue', newCurrentValue);
    setCurrentValue(newCurrentValue);
  };

  return (
    <div className="config-item">
      <label className="config-item__label">{label}</label>
      <div className="config-item__ui margin-padding-container">
        <div className="margin border no-select">
          {/* Margin 四个方向的数字 */}
          <input className="dir-text top noBorder noOutline" value={currentValue.margin.top}
            onChange={(e) => handleChange('margin', 'top', e.target.value)}
            onBlur={(e) => handleChange('margin', 'top', e.target.value)} />
          <input className="dir-text right noBorder noOutline" value={currentValue.margin.right}
            onChange={(e) => handleChange('margin', 'right', e.target.value)}
            onBlur={(e) => handleChange('margin', 'right', e.target.value)} />
          <input className="dir-text bottom noBorder noOutline" value={currentValue.margin.bottom}
            onChange={(e) => handleChange('margin', 'bottom', e.target.value)}
            onBlur={(e) => handleChange('margin', 'bottom', e.target.value)} />
          <input className="dir-text left noBorder noOutline" value={currentValue.margin.left}
            onChange={(e) => handleChange('margin', 'left', e.target.value)}
            onBlur={(e) => handleChange('margin', 'left', e.target.value)} />

          <div className="padding border no-select">
            {/* Padding 四个方向的数字 */}
            <input className="dir-text top noBorder noOutline" value={currentValue.padding.top}
              onChange={(e) => handleChange('padding', 'top', e.target.value)}
              onBlur={(e) => handleChange('padding', 'top', e.target.value)} />
            <input className="dir-text right noBorder noOutline" value={currentValue.padding.right}
              onChange={(e) => handleChange('padding', 'right', e.target.value)}
              onBlur={(e) => handleChange('padding', 'right', e.target.value)} />
            <input className="dir-text bottom noBorder noOutline" value={currentValue.padding.bottom}
              onChange={(e) => handleChange('padding', 'bottom', e.target.value)}
              onBlur={(e) => handleChange('padding', 'bottom', e.target.value)} />
            <input className="dir-text left noBorder noOutline" value={currentValue.padding.left}
              onChange={(e) => handleChange('padding', 'left', e.target.value)}
              onBlur={(e) => handleChange('padding', 'left', e.target.value)} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default MarginPadding;