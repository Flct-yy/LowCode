import React from 'react';
import { Select, Radio, InputNumber, ColorPicker } from 'antd';
import { ConfigItem, UiTypeEnum, InputTypeEnum } from '@type/ConfigItem';
import Input from './components/Input';
import useWebsContext from '@context/WebsContext/useWebsContext';
import { ConfigAreaEnum,ConfigItemFieldEnum } from '@type/Config';


interface ConvertConfigToDomProps {
  configItem: ConfigItem;
  areaName: string;
}

/**
 * 将配置项转换为对应的React组件
 */
export const ConvertConfigToDom: React.FC<ConvertConfigToDomProps> = ({ configItem, areaName }) => {
  const { field, label, uiType, currentValue, placeholder } = configItem;
  const { actions } = useWebsContext();

  const handleChangeValue = (field: ConfigItemFieldEnum, value: any) => {
    console.log('handleChangeValue', areaName, field, value);
    actions.edit_change_value(areaName as ConfigAreaEnum, field, value);
  };

  switch (uiType) {
    case UiTypeEnum.INPUT:
      return (
        <Input
          configItem={configItem}
          setCurrentValue={(value: string) => handleChangeValue(configItem.field as ConfigItemFieldEnum, value)}
        />
      );

    case UiTypeEnum.SELECT:
      return (
        <div className="config-item">
          <label className="config-item__label">{label + 'select'}</label>
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
          <label className="config-item__label">{label + 'radio'}</label>
          <Radio.Group value={currentValue} onChange={(e) => handleChangeValue(configItem.field as ConfigItemFieldEnum, e.target.value)}>
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
          <label className="config-item__label">{label + 'input_number'}</label>
          <InputNumber
            value={currentValue}
            min={(configItem as any).min}
            max={(configItem as any).max}
            step={(configItem as any).step}
            onChange={(value) => handleChangeValue(configItem.field as ConfigItemFieldEnum, value)}
            style={{ width: 150 }}
            formatter={(value) => `${value}${(configItem as any).unit || ''}`}
          />
        </div>
      );

    case UiTypeEnum.COLOR_PICKER:
      return (
        <div className="config-item">
          <label className="config-item__label">{label + 'color_picker'}</label>
          <ColorPicker
            value={currentValue}
            onChange={(value) => handleChangeValue(configItem.field as ConfigItemFieldEnum, value)}
          />
        </div>
      );

    case UiTypeEnum.MARGIN_PADDING:
      return (
        <div className="config-item margin-padding-item">
          <label className="config-item__label">{label + 'margin_padding'}</label>
          <div className="margin-padding-display">
            <div className="margin-padding-row">
              <span>Margin:</span>
              {(['topMargin', 'rightMargin', 'bottomMargin', 'leftMargin'] as const).map((key) => (
                <InputNumber
                  key={key}
                  value={currentValue?.[key] || 0}
                  onChange={(value) => handleChangeValue(configItem.field as ConfigItemFieldEnum, { ...currentValue, [key]: value })}
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
                  onChange={(value) => handleChangeValue(configItem.field as ConfigItemFieldEnum, { ...currentValue, [key]: value })}
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
          <div className="group-label">{label + 'group'}</div>
          <div className="group-children">

          </div>
        </div>
      );

    default:
      return (
        <div className="config-item">
          <label className="config-item__label">{label + 'default'}</label>
        </div>
      );
  }
};

export default ConvertConfigToDom;