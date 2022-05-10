import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAppSelector } from '../redux/store';

/** 内部组件需要登录才能访问 */
const NeedAuth: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const auth = useAppSelector((state) => state.auth.authed);
  if (!auth) return <Navigate to="/login" replace />;
  // eslint-disable-next-line react/jsx-no-useless-fragment
  return <>{children}</>;
};

export default NeedAuth;
