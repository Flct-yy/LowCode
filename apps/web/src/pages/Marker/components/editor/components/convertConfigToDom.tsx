import React from 'react';
import { Radio,  } from 'antd';
import { ConfigItem, UiTypeEnum } from '@type/ConfigItem';
import Input from './components/Input';
import Select from './components/Select';
import MColorPicker from './components/ColorPicker';
import InputNumber from './components/InputNumber';
import useWebsContext from '@context/WebsContext/useWebsContext';
import { ConfigAreaEnum, ConfigItemFieldEnum } from '@type/Config';



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
        <Select
          configItem={configItem}
          setCurrentValue={(value: string) => handleChangeValue(configItem.field as ConfigItemFieldEnum, value)}
        />
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
        <InputNumber
          configItem={configItem}
          setCurrentValue={(value: number) => handleChangeValue(configItem.field as ConfigItemFieldEnum, value)}
        />
      );

    case UiTypeEnum.COLOR_PICKER:
      return (
        <MColorPicker
          configItem={configItem}
          setCurrentValue={(value: string) => handleChangeValue(configItem.field as ConfigItemFieldEnum, value)}
        />
      );

    case UiTypeEnum.MARGIN_PADDING:
      return (
        <div className="config-item margin-padding-item">
          <label className="config-item__label">{label + 'margin_padding'}</label>
          <div className="margin-padding-display">
            <div className="margin-padding-row">
            ...............
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