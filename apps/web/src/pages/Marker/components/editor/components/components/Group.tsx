import { GroupConfigItem } from "@/type/ConfigItem";
import React from "react";

const Group = ({ configItem,
  setCurrentValue, }: {
    configItem: GroupConfigItem;
    setCurrentValue: (value: string) => void;
  }) => {
  const {
    field,
    label,
    uiType,
    placeholder,
    defaultValue,
    currentValue,
    options,
  } = configItem;
  return (
    <div className="config-item">
      <label className="config-item__label">{label}</label>
      <div className="config-item__group">
        {configItem.options.map((item) => (
          <div className={`border padding no-select config-item__ui config-item__group__item ${currentValue === item.value ? 'active' : ''}`} key={item.value}
          onClick={() => setCurrentValue(item.value)}>
            {item.label}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Group;