// UI组件类型枚举
export enum UiTypeEnum {
  INPUT = 'Input',
  SELECT = 'Select',
  INPUT_NUMBER = 'InputNumber',
  DOUBLE_INPUT_NUMBER = 'DoubleInputNumber',
  COLOR_PICKER = 'ColorPicker',
  GROUP = 'Group',
  MARGIN_PADDING = 'MarginPadding',
  // 图片上传
  IMAGE_UPLOAD = 'ImageUpload',
}

/**
 * 配置项选项接口
 */
interface ConfigOption {
  label: string; // 显示名称
  value: any; // 实际值
}

/**
 * 校验规则接口
 */
export interface ValidationRule {
  required?: boolean; // 是否必填
  message?: string; // 错误提示
  min?: number; // 最小值（适用于字符串或数组）
  max?: number; // 最大值（适用于字符串或数组）
  pattern?: RegExp; // 正则表达式校验
  [key: string]: any; // 其他校验规则
}


/**
 * 基础配置项类型，所有可配置字段都继承自此
 */
interface BaseConfigItem {
  // 配置项的字段名，用于在组件实例中引用
  field: string;
  // 配置项的标签名，用于在配置界面显示
  label: string;
  // 配置项的UI类型，用于渲染对应的组件
  uiType: UiTypeEnum;
  // 配置项的默认值
  defaultValue?: any;
  // 配置项的当前值，用于在组件实例中引用
  currentValue?: any;
  // 配置项的占位符，用于输入框等组件
  placeholder?: string;
  // 配置项的校验规则，用于表单校验
  rules?: Array<ValidationRule>;
}

/**
 * 输入框配置项
 */
export interface InputConfigItem extends BaseConfigItem {
  uiType: UiTypeEnum.INPUT;
}

/**
 * 下拉选择框配置项
 */
export interface SelectConfigItem extends BaseConfigItem {
  uiType: UiTypeEnum.SELECT;
  options: Array<ConfigOption>;
}

/**
 * 数字输入框配置项
 */
export interface InputNumberConfigItem extends BaseConfigItem {
  uiType: UiTypeEnum.INPUT_NUMBER;
  unit?: string;
  min?: number;
  max?: number;
  step?: number;
  currentUnit?: string;
  units?: Array<ConfigOption>;
  mins?: Array<number>;
  maxs?: Array<number>;
}

/**
 * 双数字配置项
 */
export interface DoubleInputNumberConfigItem extends BaseConfigItem {
  uiType: UiTypeEnum.DOUBLE_INPUT_NUMBER;
  defaultValue: {
    one: number;
    two: number;
  };
  currentValue: {
    one: number;
    two: number;
  };
  unit: string;
  min?: number;
  max?: number;
  step?: number;
}

/**
 * 颜色选择器配置项
 */
export interface ColorPickerConfigItem extends BaseConfigItem {
  uiType: UiTypeEnum.COLOR_PICKER;
}

/**
 * 分组配置项，用于折叠一组相关的配置
 */
export interface GroupConfigItem extends BaseConfigItem {
  uiType: UiTypeEnum.GROUP;
  options: Array<ConfigOption>;
}

/**
 * 边距/内边距配置项
 */
export interface MarginPaddingConfigItem extends BaseConfigItem {
  uiType: UiTypeEnum.MARGIN_PADDING;
  defaultValue: {
    margin: {
      top: 0,
      right: 0,
      bottom: 0,
      left: 0,
    },
    padding: {
      top: 0,
      right: 0,
      bottom: 0,
      left: 0,
    },
  };
  currentValue: {
    margin: {
      top: 0,
      right: 0,
      bottom: 0,
      left: 0,
    },
    padding: {
      top: 0,
      right: 0,
      bottom: 0,
      left: 0,
    },
  };
  unit?: string;
}

/**
 * 图片上传配置项
 */
export interface ImageUploadConfigItem extends BaseConfigItem {
  uiType: UiTypeEnum.IMAGE_UPLOAD;
}



/**
 * 所有可视化配置项的联合类型
 */
export type ConfigItem =
  | InputConfigItem
  | SelectConfigItem
  | InputNumberConfigItem
  | DoubleInputNumberConfigItem
  | ColorPickerConfigItem
  | GroupConfigItem
  | MarginPaddingConfigItem
  | ImageUploadConfigItem;
