import { ComponentInstance } from './componentInstance';

export interface PageModel {
  components: ComponentInstance[];
  showIframe: boolean;
  compActiveIndex: number;
  
  // 其他页面级配置，如背景、尺寸等
}