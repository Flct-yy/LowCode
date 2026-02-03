import api from './api';

export interface User {
  id?: string;
  username?: string;
  email?: string;
  password?: string;
  role?: string;
  isActive?: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface LoginResponse {
  accessToken: string;
  user: User;
}

export const authApi = {
  // 用户注册
  register: async (userData: { username: string; email: string; password: string }): Promise<User> => {
    const response = await api.post('/auth/register', userData);
    return response.data;
  },

  // 用户登录
  login: async (credentials: { email: string; password: string }): Promise<LoginResponse> => {
    const response = await api.post('/auth/login', credentials);
    return response.data;
  },

  // 获取当前用户信息
  getCurrentUser: async (): Promise<User> => {
    const response = await api.get('/auth/me');
    return response.data;
  },
};
