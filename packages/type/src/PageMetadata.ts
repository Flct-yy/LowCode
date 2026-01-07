// 页面元信息接口
export interface PageMetadata {
  id: number; // 页面唯一标识
  title: string; // 页面标题
  description?: string; // 页面描述
  keywords?: string[]; // 页面关键词
  createdAt: Date; // 创建时间
  updatedAt: Date; // 更新时间
}