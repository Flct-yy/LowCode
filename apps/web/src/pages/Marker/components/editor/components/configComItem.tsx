import React from 'react';
import { type ConfigItem } from '@wect/type';
import ConvertConfigToDom from './convertConfigToDom';

const ConfigItem: React.FC<{ item: ConfigItem, areaName: string }> = ({ item, areaName }) => {

  return (
    <ConvertConfigToDom configItem={item} areaName={areaName} />
  );
}

export default ConfigItem;