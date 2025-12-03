import React from 'react';
import { type ConfigItem } from '@type/ConfigItem';

const ConfigItem: React.FC<{ item: ConfigItem }> = ({ item }) => {
  return (
    <div>
      {item.label}: {item.field !== 'MarginPadding' ? item.currentValue : 0}

    </div>
  );
}

export default ConfigItem;