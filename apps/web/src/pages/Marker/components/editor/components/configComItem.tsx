import React from 'react';
import { type ConfigItem, UiTypeEnum } from '@type/ConfigItem';
import ConvertConfigToDom from './convertConfigToDom';
import useWebsContext from '@context/WebsContext/useWebsContext';



const ConfigItem: React.FC<{ item: ConfigItem }> = ({ item }) => {
  const { field, label, uiType, defaultValue, currentValue } = item;
  const divRef = React.useRef<HTMLDivElement>(null);
  const { state, actions } = useWebsContext();
  const { selectedComponentId } = state;

  return (
    <div className='config-item' ref={divRef}>
      <ConvertConfigToDom configItem={item} onChange={(field, value) => {
        actions.edit_component;
      }} />
    </div>
  );
}

export default ConfigItem;