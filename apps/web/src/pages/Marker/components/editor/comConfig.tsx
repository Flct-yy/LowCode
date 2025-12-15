import React, { useState } from "react";
import ConfigComArea from './components/configComArea';
import { type ComponentSchema } from '@/type/ComponentSchema';
import { type TotesConfig } from '@/type/Config';

const ComConfig: React.FC<{ selectedComponent: ComponentSchema }> = ({ selectedComponent }) => {
  return (
    <div>
      <div className='config-com-info'>
        <div className='config-com-info__item'>
          组件：{selectedComponent?.metadata?.componentType}
        </div>
        <div className='config-com-info__item'>
          {selectedComponent?.metadata?.description}
        </div>
      </div>
      {
        selectedComponent?.config.map((item: TotesConfig, index: number) => (
          <ConfigComArea key={item.areaName || index.toString()} config={item} />
        ))
      }
    </div>
  )
}
export default ComConfig;