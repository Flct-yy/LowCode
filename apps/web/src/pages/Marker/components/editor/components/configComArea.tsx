import React from 'react';
import { type TotesConfig } from '@wect/type';
import { type ConfigItem } from '@wect/type';
import ConfigComItem from './configComItem';



const ConfigComArea: React.FC<{ config: TotesConfig }> = ({ config }) => {
  return (
    <div className='config-com-area'>
      <div className='config-com-info'>
        {config.areaName}
      </div>
      {(config.configItem || []).map((item: ConfigItem,index) => (
        <ConfigComItem key={index} item={item} areaName={config.areaName} />
      ))}
    </div>
  );
}

export default ConfigComArea;