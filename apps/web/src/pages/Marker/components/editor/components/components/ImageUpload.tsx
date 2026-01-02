import React from 'react';
import { ImageUploadConfigItem, UiTypeEnum } from '@type/ConfigItem';

const ImageUpload = ({ configItem, setCurrentValue }: {
  configItem: ImageUploadConfigItem,
  setCurrentValue: (value: string) => void;
}) => {
  const { field, label, defaultValue, currentValue } = configItem;
  return (
    <div className="config-item">
      <label className="config-item__label">{label}</label>
      <input
        type="file"
        accept="image/*"
        onChange={(e) => {
          const file = e.target.files?.[0];
          if (file) {
            setCurrentValue(URL.createObjectURL(file));
          }
        }}
      />
    </div>
  );
};


export default ImageUpload;