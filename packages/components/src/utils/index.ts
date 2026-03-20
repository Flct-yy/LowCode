/**
 * 从配置中获取组件内容
 * @param config 组件配置
 * @param field 组件内容字段
 * @returns 组件内容
 */
export const getConfigText = (config: any[], field: string): string => {
  if (!config || !Array.isArray(config)) return '';

  for (const configItem of config) {
    if (configItem && Array.isArray(configItem.configItem)) {
      for (const item of configItem.configItem) {
        const itemName = item.field.replace(/^[a-zA-Z]+\./, '');
        if (itemName === field && typeof item.currentValue === 'string') {
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
        const itemName = item.field.replace(/^[a-zA-Z]+\./, '');
        if (itemName === field) {
          return item.currentValue as T;
        }
      }
    }
  }
  return undefined;
};