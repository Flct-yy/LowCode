/**
 * 从配置中获取文本内容
 * @param config 组件配置
 * @returns 文本内容1
 */
export const getConfigText = (config: any[]): string => {
  if (!config || !Array.isArray(config)) return '';
  
  for (const configItem of config) {
    if (configItem && Array.isArray(configItem.configItem)) {
      for (const item of configItem.configItem) {
        if (item.field === 'text' && typeof item.currentValue === 'string') {
          return item.currentValue;
        }
      }
    }
  }
  return '';
};

/**
 * 从配置中获取图片URL
 * @param config 组件配置
 * @returns 图片URL
 */
export const getConfigImageUrl = (config: any[]): string | undefined => {
  if (!config || !Array.isArray(config)) return undefined;
  
  for (const configItem of config) {
    if (configItem && Array.isArray(configItem.configItem)) {
      for (const item of configItem.configItem) {
        if (item.field === 'imageUrl' && typeof item.currentValue === 'string') {
          return item.currentValue;
        }
      }
    }
  }
  return undefined;
};

/**
 * 从配置中获取指定字段的值
 * @param config 组件配置
 * @param field 字段名称
 * @returns 字段值
 */
export const getConfigValue = <T = any>(config: any[], field: string): T | undefined => {
  if (!config || !Array.isArray(config)) return undefined;
  
  for (const configItem of config) {
    if (configItem && Array.isArray(configItem.configItem)) {
      for (const item of configItem.configItem) {
        if (item.field === field) {
          return item.currentValue as T;
        }
      }
    }
  }
  return undefined;
};