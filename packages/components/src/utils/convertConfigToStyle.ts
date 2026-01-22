import { ComponentSchema, ComTree } from "@wect/type";
import { updateComponentStyle, generateComponentClasses, removeComponentStyle } from "./dynamicStyleManager";

// 将组件配置转换为React样式对象
// 现在主要返回位置相关的内联样式，其他样式通过动态CSS类处理
const convertConfigToStyle = (component: ComponentSchema): { style: React.CSSProperties; className: string } => {
  // 更新组件的动态样式
  updateComponentStyle(component);

  // 生成组件的CSS类名
  const className = generateComponentClasses(component);

  // 仅保留位置相关的内联样式
  const style: React.CSSProperties = {
    position: component.position?.position,
    left: component.position?.x || 0,
    top: component.position?.y || 0,
    zIndex: component.position?.zIndex || 0,
  };

  return { style, className };
};

export { convertConfigToStyle };
