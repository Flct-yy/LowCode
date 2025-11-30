import ComponentInstance from './componentInstance';

export default interface PageModel {
  components: ComponentInstance[];
  // 是否显示Iframe
  showIframe: boolean;
  // 选中的组件索引
  compActiveIndex: number;
  // 宽高比
  aspectRatio: number;
  // 缩放比例
  zoomRatio: number;
  // 预览区域滚动位置
  previewScrollTop: number;
  previewScrollLeft: number;
}