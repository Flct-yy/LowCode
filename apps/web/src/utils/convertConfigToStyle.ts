import { ComponentSchema } from "@/type/ComponentSchema";

const convertConfigToStyle = (config: ComponentSchema['config']): React.CSSProperties => {
  const style: React.CSSProperties = {};
  
  // 遍历所有配置区域
  config.forEach(configArea => {
    // 遍历当前区域的所有配置项
    configArea.configItem.forEach(configItem => {
      // 根据配置项的field映射到对应的CSS属性
      switch (configItem.field) {
        case 'flexDirection':
          style.flexDirection = configItem.currentValue as React.CSSProperties['flexDirection'];
          break;
        case 'backgroundColor':
          style.backgroundColor = configItem.currentValue as React.CSSProperties['backgroundColor'];
          break;
        case 'color':
          style.color = configItem.currentValue as React.CSSProperties['color'];
          break;
        case 'fontSize':
          style.fontSize = `${configItem.currentValue}px`;
          break;

        default:
          break;
      }
    });
  });
  
  return style;
};