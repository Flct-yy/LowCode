import api from './api';
import { type ComponentSchema } from '@wect/type';

interface PageModelResponse {
  com_tree: ComponentSchema;
  aspect_ratio: string;
}

// 页面API服务
const pageApi = {
  // 根据PageMetadata的ID获取组件树
  getPageById: async (id: number): Promise<PageModelResponse> => {
    return await api.get(`/pages/${id}/com_tree`);
  },
};

export default pageApi;