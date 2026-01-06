import React from 'react';
import { type ConfigItem, UiTypeEnum } from '@wect/type';
import ConvertConfigToDom from './convertConfigToDom';
import useWebsContext from '@context/WebsContext/useWebsContext';



const ConfigItem: React.FC<{ item: ConfigItem, areaName: string }> = ({ item, areaName }) => {
  const { field, label, uiType, defaultValue, currentValue } = item;
  const { state, actions } = useWebsContext();
  const { selectedComponentId } = state;

  return (
    <ConvertConfigToDom configItem={item} areaName={areaName} />
  );
}

export default ConfigItem;