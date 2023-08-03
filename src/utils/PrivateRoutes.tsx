import React, { useEffect, useState } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { apiUrl } from '../config/api';
import { ErrorHandler } from '../components/common/ErrorHandler';

export const PrivateRoutes = () => {
  const [error, setError] = useState<string | undefined>(undefined);
  const [loggedIn, setLoggedIn] = useState<boolean>(true);

  const refreshToken = async () => {
    try {
      const res = await fetch(`${apiUrl}/auth/refresh`, {
        method: 'GET',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      const data = await res.json();
      if (data.statusCode === 401) {
        setLoggedIn(false);
      }
    } catch (err: any) {
      setError(err.message);
    }
  };

  useEffect(() => {
    const interval = setInterval(refreshToken, 1000 * 60 * 4);
    return () => {
      clearInterval(interval);
    };
  }, []);

  if (error) {
    return <ErrorHandler message={error} />;
  }

  return loggedIn ? <Outlet /> : <Navigate to="/login" />;
};
