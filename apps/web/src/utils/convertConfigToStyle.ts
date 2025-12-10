import { ComponentSchema } from "@/type/ComponentSchema";
import { InputNumberConfigItem } from "@type/ConfigItem";
import { ConfigItemFieldEnum } from "@type/Config";

const convertConfigToStyle = (config: ComponentSchema['config']): React.CSSProperties => {
  const style: React.CSSProperties = {};

  // 遍历所有配置区域
  config.forEach(configArea => {
    // 遍历当前区域的所有配置项
    configArea.configItem.forEach(configItem => {
      // 根据配置项的field映射到对应的CSS属性
      switch (configItem.field) {
        case ConfigItemFieldEnum.backgroundColor:
          style.backgroundColor = configItem.currentValue as React.CSSProperties['backgroundColor'];
          break;
        case ConfigItemFieldEnum.flexWrap:
          style.flexWrap = configItem.currentValue as React.CSSProperties['flexWrap'];
          break;
        case ConfigItemFieldEnum.flexDirection:
          style.flexDirection = configItem.currentValue as React.CSSProperties['flexDirection'];
          break;
        case ConfigItemFieldEnum.justifyContent:
          style.justifyContent = configItem.currentValue as React.CSSProperties['justifyContent'];
          break;
        case ConfigItemFieldEnum.alignContent:
          style.alignContent = configItem.currentValue as React.CSSProperties['alignContent'];
          break;
        case ConfigItemFieldEnum.MarginPadding:
          // 处理MarginPadding配置项 未完成
          const margin = configItem.currentValue.margin;
          const padding = configItem.currentValue.padding;
          
          style.margin = `${margin.top}${(configItem as InputNumberConfigItem).unit || (configItem as InputNumberConfigItem).unit} ${margin.right}${(configItem as InputNumberConfigItem).currentUnit || (configItem as InputNumberConfigItem).unit} ${margin.bottom}${(configItem as InputNumberConfigItem).currentUnit || (configItem as InputNumberConfigItem).unit} ${margin.left}${(configItem as InputNumberConfigItem).currentUnit || (configItem as InputNumberConfigItem).unit}`;

          style.padding = `${padding.top}${(configItem as InputNumberConfigItem).currentUnit || (configItem as InputNumberConfigItem).unit} ${padding.right}${(configItem as InputNumberConfigItem).currentUnit || (configItem as InputNumberConfigItem).unit} ${padding.bottom}${(configItem as InputNumberConfigItem).currentUnit || (configItem as InputNumberConfigItem).unit} ${padding.left}${(configItem as InputNumberConfigItem).currentUnit || (configItem as InputNumberConfigItem).unit}`;
          break;
        case ConfigItemFieldEnum.borderColor:
          if(configItem.currentValue === configItem.defaultValue) {
            break;
          }
          style.borderColor = configItem.currentValue as React.CSSProperties['borderColor'];
          break;
        case ConfigItemFieldEnum.borderWidth:
          if(configItem.currentValue === configItem.defaultValue) {
            break;
          }
          style.borderWidth = `${configItem.currentValue}${(configItem as InputNumberConfigItem).currentUnit || (configItem as InputNumberConfigItem).unit}`;
          break;
        case ConfigItemFieldEnum.borderRadius:
          if(configItem.currentValue === configItem.defaultValue) {
            break;
          }
          style.borderRadius = `${configItem.currentValue}${(configItem as InputNumberConfigItem).currentUnit || (configItem as InputNumberConfigItem).unit}`;
          break;
        case ConfigItemFieldEnum.borderStyle:
          style.borderStyle = configItem.currentValue as React.CSSProperties['borderStyle'];
          break;
        case ConfigItemFieldEnum.width:
          style.width = `${configItem.currentValue}${(configItem as InputNumberConfigItem).currentUnit || (configItem as InputNumberConfigItem).unit}`;
          break;
        case ConfigItemFieldEnum.height:
          style.height = `${configItem.currentValue}${(configItem as InputNumberConfigItem).currentUnit || (configItem as InputNumberConfigItem).unit}`;
          break;
        // case ConfigItemFieldEnum.text:   没有 text 属性，文本内容通过别的方法设置
        case ConfigItemFieldEnum.fontSize:
          style.fontSize = `${configItem.currentValue}${(configItem as InputNumberConfigItem).currentUnit || (configItem as InputNumberConfigItem).unit}`;
          break;
        case ConfigItemFieldEnum.fontWeight:
          style.fontWeight = configItem.currentValue as React.CSSProperties['fontWeight'];
          break;
        case ConfigItemFieldEnum.lineHeight:
          style.lineHeight = `${configItem.currentValue}${(configItem as InputNumberConfigItem).currentUnit || (configItem as InputNumberConfigItem).unit}`;
          break;
        case ConfigItemFieldEnum.color:
          style.color = configItem.currentValue as React.CSSProperties['color'];
          break;
        default:
          break;
      }
    });
  });

  return style;
};

export default convertConfigToStyle;