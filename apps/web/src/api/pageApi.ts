import api from './api';
import { PageMetadata } from '@/type/PageModel';
import { ComponentSchema } from '@/type/ComponentSchema';



interface PageModelResponse {
  pageMetadata: PageMetadata;
  com_tree: ComponentSchema;
}
// 创建页面接口参数
interface CreatePageParams {
  title: string;
  description?: string;
  keywords?: string[];
  comTree: any;
}

// 更新页面接口参数
interface UpdatePageParams {
  title?: string;
  description?: string;
  keywords?: string[];
  comTree?: any;
}

// 页面API服务
const pageApi = {
  // 创建页面
  createPage: async (params: CreatePageParams): Promise<PageModelResponse> => {
    return await api.post('/pages', params);
  },

  // 获取页面列表
  getPages: async (): Promise<PageModelResponse[]> => {
    return await api.get('/pages');
  },

  // 根据ID获取页面
  getPageById: async (id: number): Promise<PageModelResponse> => {
    return await api.get(`/pages/${id}`);
  },

  // 更新页面
  updatePage: async (id: number, params: UpdatePageParams): Promise<PageModelResponse> => {
    return await api.put(`/pages/${id}`, params);
  },

  // 删除页面
  deletePage: async (id: number): Promise<void> => {
    return await api.delete(`/pages/${id}`);
  },
};

export default pageApi;