import React, { useContext } from 'react';
import { AuthContext } from '../contexts/authContext';
import { Navigate, Outlet } from 'react-router-dom';

export const PrivateRoutes = () => {
  const authContext = useContext(AuthContext);

  return authContext?.token ? <Outlet /> : <Navigate to="/" />;
};
