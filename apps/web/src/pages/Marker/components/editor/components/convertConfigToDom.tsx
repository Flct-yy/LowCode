import React from 'react';
import { Input, Select, Radio, InputNumber, ColorPicker } from 'antd';
import { ConfigItem, UiTypeEnum, InputTypeEnum } from '@type/ConfigItem';

interface ConvertConfigToDomProps {
  configItem: ConfigItem;
  onChange: (field: number, value: any) => void;
}

/**
 * 将配置项转换为对应的React组件
 */
export const ConvertConfigToDom: React.FC<ConvertConfigToDomProps> = ({ configItem, onChange }) => {
  const { field, label, uiType, currentValue, placeholder } = configItem;

  const handleChangeValue = (value: any) => {

  };

  switch (uiType) {
    case UiTypeEnum.INPUT:
      return (
        <div className="config-item">
          <label className="config-item__label">{label}</label>
          <Input
            type={(configItem as any).type || InputTypeEnum.TEXT}
            value={currentValue || ''}
            onChange={(e) => handleChangeValue(e.target.value)}
            placeholder={placeholder}
          />
        </div>
      );

    case UiTypeEnum.SELECT:
      return (
        <div className="config-item">
          <label className="config-item__label">{label}</label>
          <Select
            value={currentValue}
            options={(configItem as any).options}
            onChange={handleChangeValue}
            style={{ width: 200 }}
          />
        </div>
      );

    case UiTypeEnum.RADIO:
      return (
        <div className="config-item">
          <label className="config-item__label">{label}</label>
          <Radio.Group value={currentValue} onChange={(e) => handleChangeValue(e.target.value)}>
            {(configItem as any).options?.map((option: any) => (
              <Radio key={option.value} value={option.value}>
                {option.label}
              </Radio>
            ))}
          </Radio.Group>
        </div>
      );

    case UiTypeEnum.INPUT_NUMBER:
      return (
        <div className="config-item">
          <label className="config-item__label">{label}</label>
          <InputNumber
            value={currentValue}
            min={(configItem as any).min}
            max={(configItem as any).max}
            step={(configItem as any).step}
            onChange={handleChangeValue}
            style={{ width: 150 }}
            formatter={(value) => `${value}${(configItem as any).unit || ''}`}
          />
        </div>
      );

    case UiTypeEnum.COLOR_PICKER:
      return (
        <div className="config-item">
          <label className="config-item__label">{label}</label>
          <ColorPicker
            value={currentValue}
            onChange={handleChangeValue}
          />
        </div>
      );

    case UiTypeEnum.MARGIN_PADDING:
      return (
        <div className="config-item margin-padding-item">
          <label className="config-item__label">{label}</label>
          <div className="margin-padding-display">
            <div className="margin-padding-row">
              <span>Margin:</span>
              {(['topMargin', 'rightMargin', 'bottomMargin', 'leftMargin'] as const).map((key) => (
                <InputNumber
                  key={key}
                  value={currentValue?.[key] || 0}
                  onChange={(value) => handleChangeValue({ ...currentValue, [key]: value })}
                  style={{ width: 80, marginLeft: 8 }}
                  formatter={(value) => `${value}px`}
                />
              ))}
            </div>
            <div className="margin-padding-row">
              <span>Padding:</span>
              {(['topPadding', 'rightPadding', 'bottomPadding', 'leftPadding'] as const).map((key) => (
                <InputNumber
                  key={key}
                  value={currentValue?.[key] || 0}
                  onChange={(value) => handleChangeValue({ ...currentValue, [key]: value })}
                  style={{ width: 80, marginLeft: 8 }}
                  formatter={(value) => `${value}px`}
                />
              ))}
            </div>
          </div>
        </div>
      );

    case UiTypeEnum.GROUP:
      return (
        <div className="config-item-group">
          <div className="group-label">{label}</div>
          <div className="group-children">

          </div>
        </div>
      );

    default:
      return (
        <div className="config-item">
          <label className="config-item__label">{label}</label>
          <Input
            value={currentValue || ''}
            onChange={(e) => handleChangeValue(e.target.value)}
            placeholder={placeholder}
          />
        </div>
      );
  }
};

export default ConvertConfigToDom;