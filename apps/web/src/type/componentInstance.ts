import component from "./component";

export interface ComponentInstance {
  id: string; // 唯一标识符
  type: 'button' | 'input' | 'container'; // 组件类型
  x: number; // x 坐标
  y: number; // y 坐标
  width: number; // 宽度
  height: number; // 高度
  props: component; // 组件的实例
}