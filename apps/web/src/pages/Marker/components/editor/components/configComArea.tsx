import React from 'react';
import { type TotesConfig } from '@type/Config';
import { type ConfigItem } from '@type/ConfigItem';
import ConfigComItem from './configComItem';



const ConfigComArea: React.FC<{ config: TotesConfig }> = ({ config }) => {
  return (
    <div>
      <div className='config-com-area'>
        {config.areaName}
      </div>
      {config.configItem.map((item: ConfigItem,index) => (
        <ConfigComItem key={index} item={item} areaName={config.areaName} />
      ))}
    </div>
  );
}

export default ConfigComArea;