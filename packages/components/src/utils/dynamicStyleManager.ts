import { ComponentSchema } from "@wect/type";
import { ConfigItemFieldEnum } from "@wect/type";
import { InputNumberConfigItem } from "@wect/type";

// 动态样式管理器类
class DynamicStyleManager {
  private static instance: DynamicStyleManager; // 存储 DynamicStyleManager 类的唯一实例
  private styleElement: HTMLStyleElement | null = null; // 存储动态创建的 <style> 元素引用
  private componentStyles: Map<string, string> = new Map();// 存储所有组件的CSS样式映射表

  private constructor() {
    this.initializeStyleElement();
  }

  // 获取 DynamicStyleManager 类的唯一实例
  public static getInstance(): DynamicStyleManager {
    if (!DynamicStyleManager.instance) {
      DynamicStyleManager.instance = new DynamicStyleManager();
    }
    return DynamicStyleManager.instance;
  }

  // 初始化样式元素 并将其添加到文档头
  private initializeStyleElement(): void {
    this.styleElement = document.createElement('style');
    this.styleElement.id = 'dynamic-component-styles';
    this.styleElement.type = 'text/css';
    document.head.appendChild(this.styleElement);
  }

  // 生成组件CSS变量
  private generateComponentVariables(component: ComponentSchema): string {
    let cssVariables = '';
    const componentId = component.comSchemaId.toString();

    if (component.config) {
      component.config.forEach(configArea => {
        configArea.configItem.forEach(configItem => {
          switch (configItem.field) {
            case ConfigItemFieldEnum.backgroundColor:
              cssVariables += `  --${componentId}-background-color: ${configItem.currentValue};\n`;
              break;
            case ConfigItemFieldEnum.flexWrap:
              cssVariables += `  --${componentId}-flex-wrap: ${configItem.currentValue};\n`;
              break;
            case ConfigItemFieldEnum.flexDirection:
              cssVariables += `  --${componentId}-flex-direction: ${configItem.currentValue};\n`;
              break;
            case ConfigItemFieldEnum.justifyContent:
              cssVariables += `  --${componentId}-justify-content: ${configItem.currentValue};\n`;
              break;
            case ConfigItemFieldEnum.alignContent:
              cssVariables += `  --${componentId}-align-content: ${configItem.currentValue};\n`;
              break;
            case ConfigItemFieldEnum.alignItems:
              cssVariables += `  --${componentId}-align-items: ${configItem.currentValue};\n`;
              break;
            case ConfigItemFieldEnum.gap:
              const gapUnit = (configItem as InputNumberConfigItem).currentUnit || (configItem as InputNumberConfigItem).unit || 'px';
              cssVariables += `  --${componentId}-gap: ${configItem.currentValue.one}${gapUnit} ${configItem.currentValue.two}${gapUnit};\n`;
              break;
            case ConfigItemFieldEnum.MarginPadding:
              const mpUnit = (configItem as any).unit || (configItem as any).currentUnit || 'px';
              const margin = configItem.currentValue.margin;
              const padding = configItem.currentValue.padding;
              cssVariables += `  --${componentId}-margin: ${margin.top}${mpUnit} ${margin.right}${mpUnit} ${margin.bottom}${mpUnit} ${margin.left}${mpUnit};\n`;
              cssVariables += `  --${componentId}-padding: ${padding.top}${mpUnit} ${padding.right}${mpUnit} ${padding.bottom}${mpUnit} ${padding.left}${mpUnit};\n`;
              break;
            case ConfigItemFieldEnum.borderColor:
              cssVariables += `  --${componentId}-border-color: ${configItem.currentValue};\n`;
              break;
            case ConfigItemFieldEnum.borderWidth:
              const borderWidthUnit = (configItem as InputNumberConfigItem).currentUnit || (configItem as InputNumberConfigItem).unit || 'px';
              cssVariables += `  --${componentId}-border-width: ${configItem.currentValue}${borderWidthUnit};\n`;
              break;
            case ConfigItemFieldEnum.borderRadius:
              const borderRadiusUnit = (configItem as InputNumberConfigItem).currentUnit || (configItem as InputNumberConfigItem).unit || 'px';
              cssVariables += `  --${componentId}-border-radius: ${configItem.currentValue}${borderRadiusUnit};\n`;
              break;
            case ConfigItemFieldEnum.borderStyle:
              cssVariables += `  --${componentId}-border-style: ${configItem.currentValue};\n`;
              break;
            case ConfigItemFieldEnum.width:
              const widthUnit = (configItem as InputNumberConfigItem).currentUnit || (configItem as InputNumberConfigItem).unit || 'px';
              cssVariables += `  --${componentId}-width: ${configItem.currentValue}${widthUnit};\n`;
              break;
            case ConfigItemFieldEnum.height:
              const heightUnit = (configItem as InputNumberConfigItem).currentUnit || (configItem as InputNumberConfigItem).unit || 'px';
              cssVariables += `  --${componentId}-height: ${configItem.currentValue}${heightUnit};\n`;
              break;
            case ConfigItemFieldEnum.fontSize:
              const fontSizeUnit = (configItem as InputNumberConfigItem).currentUnit || (configItem as InputNumberConfigItem).unit || 'px';
              cssVariables += `  --${componentId}-font-size: ${configItem.currentValue}${fontSizeUnit};\n`;
              break;
            case ConfigItemFieldEnum.fontWeight:
              cssVariables += `  --${componentId}-font-weight: ${configItem.currentValue};\n`;
              break;
            case ConfigItemFieldEnum.textAlign:
              cssVariables += `  --${componentId}-text-align: ${configItem.currentValue};\n`;
              break;
            case ConfigItemFieldEnum.lineHeight:
              const lineHeightUnit = (configItem as InputNumberConfigItem).currentUnit || (configItem as InputNumberConfigItem).unit || 'px';
              cssVariables += `  --${componentId}-line-height: ${configItem.currentValue}${lineHeightUnit};\n`;
              break;
            case ConfigItemFieldEnum.color:
              cssVariables += `  --${componentId}-color: ${configItem.currentValue};\n`;
              break;
            case ConfigItemFieldEnum.objectFit:
              cssVariables += `  --${componentId}-object-fit: ${configItem.currentValue};\n`;
              break;
            case ConfigItemFieldEnum.objectPosition:
              cssVariables += `  --${componentId}-object-position: ${configItem.currentValue};\n`;
              break;
            case ConfigItemFieldEnum.opacity:
              cssVariables += `  --${componentId}-opacity: ${configItem.currentValue};\n`;
              break;
            default:
              break;
          }
        });
      });
    }

    return cssVariables;
  }

  // 生成组件CSS类
  private generateComponentCSS(component: ComponentSchema): string {
    const componentId = component.comSchemaId.toString();
    const componentType = component.metadata.componentType;
    const cssVariables = this.generateComponentVariables(component);

    let css = `.component-instance-${componentId} {\n`;
    css += cssVariables;
    css += `  background-color: var(--${componentId}-background-color);\n`;
    css += `  flex-wrap: var(--${componentId}-flex-wrap);\n`;
    css += `  flex-direction: var(--${componentId}-flex-direction);\n`;
    css += `  justify-content: var(--${componentId}-justify-content);\n`;
    css += `  align-content: var(--${componentId}-align-content);\n`;
    css += `  align-items: var(--${componentId}-align-items);\n`;
    css += `  gap: var(--${componentId}-gap);\n`;
    css += `  margin: var(--${componentId}-margin);\n`;
    css += `  padding: var(--${componentId}-padding);\n`;
    css += `  border-color: var(--${componentId}-border-color);\n`;
    css += `  border-width: var(--${componentId}-border-width);\n`;
    css += `  border-radius: var(--${componentId}-border-radius);\n`;
    css += `  border-style: var(--${componentId}-border-style);\n`;
    css += `  width: var(--${componentId}-width);\n`;
    css += `  height: var(--${componentId}-height);\n`;
    css += `  font-size: var(--${componentId}-font-size);\n`;
    css += `  font-weight: var(--${componentId}-font-weight);\n`;
    css += `  text-align: var(--${componentId}-text-align);\n`;
    css += `  line-height: var(--${componentId}-line-height);\n`;
    css += `  color: var(--${componentId}-color);\n`;
    css += `}\n\n`;
    css += `.component-instance-${componentId} img {\n`;
    css += `  width: 100%;\n`;
    css += `  height: 100%;\n`;
    css += `  object-fit: var(--${componentId}-object-fit);\n`;
    css += `  object-position: var(--${componentId}-object-position);\n`;
    css += `  opacity: var(--${componentId}-opacity);\n`;
    css += `}\n\n`;

    return css;
  }

  // 更新组件样式
  public updateComponentStyle(component: ComponentSchema): void {
    const componentId = component.comSchemaId.toString();
    const css = this.generateComponentCSS(component);
    this.componentStyles.set(componentId, css);
    this.updateStyleSheet();
  }

  // 删除组件样式
  public removeComponentStyle(componentId: number | string): void {
    // 确保ID是字符串类型
    const idStr = typeof componentId === 'number' ? componentId.toString() : componentId;
    this.componentStyles.delete(idStr);
    this.updateStyleSheet();
  }

  // 更新样式表
  private updateStyleSheet(): void {
    if (!this.styleElement) return;

    let allStyles = '';
    this.componentStyles.forEach(style => {
      allStyles += style;
    });

    this.styleElement.innerHTML = allStyles;
  }

  // 获取组件CSS类名
  public getComponentClasses(component: ComponentSchema): string {
    const componentId = component.comSchemaId.toString();
    const componentType = component.metadata.componentType;
    // 确保类名符合CSS命名规范（不能以数字开头）
    return `component-${componentType} component-instance-${componentId}`;
  }
}

// 导出单例实例
export const dynamicStyleManager = DynamicStyleManager.getInstance();

// 导出工具函数
export const generateComponentClasses = (component: ComponentSchema): string => {
  return dynamicStyleManager.getComponentClasses(component);
};

export const updateComponentStyle = (component: ComponentSchema): void => {
  return dynamicStyleManager.updateComponentStyle(component);
};

export const removeComponentStyle = (componentId: number | string): void => {
  return dynamicStyleManager.removeComponentStyle(componentId);
};