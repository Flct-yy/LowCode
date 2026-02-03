import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useUserContext } from '../context/UserContext/UserContext';

interface AuthGuardProps {
  children: React.ReactNode;
}

const AuthGuard: React.FC<AuthGuardProps> = ({ children }) => {
  const { isAuthenticated, loading } = useUserContext();
  const location = useLocation();

  // 如果正在加载中，返回null或加载指示器
  if (loading) {
    return null; // 可以替换为加载组件
  }

  // 如果未认证，重定向到登录页面
  if (!isAuthenticated) {
    return (
      <Navigate 
        to="/auth/login" 
        state={{ from: location }} 
        replace 
      />
    );
  }

  // 已认证，渲染子组件
  return <>{children}</>;
};

export default AuthGuard;
