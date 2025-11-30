import component from "./component";
import componentType from "./componentType";

export default interface ComponentInstance {
  id: number; // 唯一标识符
  type: componentType; // 组件类型
  x: number; // x 坐标
  y: number; // y 坐标
  width: number; // 宽度
  height: number; // 高度
  config: component['config']; // 组件的实例
}