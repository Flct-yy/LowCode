import { ComTree } from '@wect/type';
import { type PageMetadata } from '@wect/type';

// 页面宽高比枚举
export enum AspectRatioEnum {
  RATIO_16_9 = '16/9',
  RATIO_9_16 = '9/16',
  RATIO_16_10 = '16/10',
  RATIO_10_16 = '10/16',
  RATIO_4_3 = '4/3',
  RATIO_3_4 = '3/4',
  RATIO_1_1 = '1',
  CUSTOM = '-1'
}

// 页面模型接口
export interface PageModel {
  metadata: PageMetadata; // 页面元信息
  comTree: ComTree; // 组件树
  showIframe: boolean; // 是否显示Iframe
  selectedComponentId?: number; // 选中的组件ID
  aspectRatio: AspectRatioEnum; // 宽高比
  zoomRatio: number; // 缩放比例
  previewScrollTop: number; // 预览区域滚动位置
  previewScrollLeft: number; // 预览区域滚动位置
  isDragCom: boolean;// 是否拖动画布还是组件
  isSliding: boolean;// 是否滑动
}

// 导出默认接口，保持向后兼容
export default PageModel;