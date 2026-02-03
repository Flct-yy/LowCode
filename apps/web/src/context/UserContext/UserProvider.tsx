import React, { useState, useEffect, ReactNode } from 'react';
import { UserContext, UserContextType } from './UserContext';
import { authApi, User } from '@/api/authApi';
import api from '@/api/api';

interface UserProviderProps {
  children: ReactNode;
}

export const UserProvider: React.FC<UserProviderProps> = ({ children }) => {
  // 状态管理
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // 初始化时检查本地存储中的token
  useEffect(() => {
    const storedToken = localStorage.getItem('token');
    const storedUser = localStorage.getItem('user');

    if (storedToken && storedUser) {
      setToken(storedToken);
      setUser(JSON.parse(storedUser));
      // 设置axios拦截器，在请求头中添加token
      api.interceptors.request.use(
        (config) => {
          if (storedToken) {
            config.headers.Authorization = `Bearer ${storedToken}`;
          }
          return config;
        },
        (error) => {
          return Promise.reject(error);
        }
      );
    }

    setLoading(false);
  }, []);

  // 登录功能
  const login = async (email: string, password: string) => {
    setLoading(true);
    setError(null);

    try {
      const response = await authApi.login({ email, password });
      const { accessToken, user: userData } = response;

      // 存储到本地存储
      localStorage.setItem('token', accessToken);
      localStorage.setItem('user', JSON.stringify(userData));

      // 更新状态
      setToken(accessToken);
      setUser(userData);

      // 设置axios拦截器
      api.interceptors.request.use(
        (config) => {
          config.headers.Authorization = `Bearer ${accessToken}`;
          return config;
        },
        (error) => {
          return Promise.reject(error);
        }
      );
    } catch (err: any) {
      setError(err.response?.data?.message || '登录失败，请检查邮箱和密码');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  // 注册功能
  const register = async (username: string, email: string, password: string) => {
    setLoading(true);
    setError(null);

    try {
      const userData = await authApi.register({ username, email, password });
      // 注册成功后自动登录
      await login(email, password);
      return userData;
    } catch (err: any) {
      setError(err.response?.data?.message || '注册失败，请检查输入信息');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  // 登出功能
  const logout = () => {
    // 清除本地存储
    localStorage.removeItem('token');
    localStorage.removeItem('user');

    // 更新状态
    setToken(null);
    setUser(null);

    // 清除axios拦截器中的token
    api.interceptors.request.use(
      (config) => {
        delete config.headers.Authorization;
        return config;
      },
      (error) => {
        return Promise.reject(error);
      }
    );
  };

  const value: UserContextType = {
    user,
    token,
    login,
    register,
    logout,
    isAuthenticated: !!token,
    loading,
    error,
  };

  return (
    <UserContext.Provider value={value}>
      {children}
    </UserContext.Provider>
  );
};
