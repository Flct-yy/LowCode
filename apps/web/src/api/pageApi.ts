import api from './api';
import { type PageMetadata } from '@wect/type';
import { type ComponentSchema } from '@wect/type';



interface PageModelResponse {
  pageMetadata: PageMetadata;
  com_tree: { root: ComponentSchema };
  aspect_ratio: string;
}
// 创建页面接口参数
interface CreatePageParams {
  title: string;
  description?: string;
  keywords?: string[];
  comTree: any;
  aspectRatio: string;
}

// 更新页面接口参数
interface UpdatePageParams {
  title?: string;
  description?: string;
  keywords?: string[];
  comTree?: any;
  aspectRatio?: string;
}

// 页面API服务
const pageApi = {
  // 创建页面
  createPage: async (params: CreatePageParams): Promise<PageModelResponse> => {
    return await api.post('/pages', params);
  },

  // 获取页面列表无组件树
  getPages: async (): Promise<PageMetadata[]> => {
    return await api.get('/pages');
  },

  // 根据PageMetadata的ID获取页面及组件树
  getPageById: async (id: number): Promise<PageModelResponse> => {
    return await api.get(`/pages/${id}`);
  },

  // 更新页面及组件树
  updatePage: async (id: number, params: UpdatePageParams): Promise<PageModelResponse> => {
    return await api.put(`/pages/${id}`, params);
  },

  // 删除页面及组件树
  deletePage: async (id: number): Promise<void> => {
    return await api.delete(`/pages/${id}`);
  },
};

export default pageApi;