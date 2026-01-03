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
      <div className="custom-image-upload">
        <label htmlFor="image-upload" className="custom-image-button no-select">
          {currentValue ? '更换图片' : '选择图片'}
        </label>
        <input
          id="image-upload"
          type="file"
          accept="image/*"
          style={{ display: 'none' }}
          onChange={(e) => {
            const file = e.target.files?.[0];
            if (file) {
              setCurrentValue(URL.createObjectURL(file));
            }
          }}
        />
        <div className="custom-image-name no-select">
          {currentValue ? '已选择图片' : '未选择图片'}
        </div>
      </div>
    </div>
  );
};


export default ImageUpload;