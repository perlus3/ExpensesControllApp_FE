import React, { useEffect, useState } from 'react';
import { Navigate, Outlet, useNavigate } from 'react-router-dom';
import { apiUrl } from '../config/api';
import { LogoutFunction } from '../components/logout/Logout';
import { ErrorHandler } from '../components/common/ErrorHandler';

export const PrivateRoutes = () => {
  const navigate = useNavigate();
  const [error, setError] = useState<string | undefined>(undefined);
  const [loggedIn, setLoggedIn] = useState<boolean>();

  const cookie = document.cookie.includes('AccessToken');

  const refreshToken = async () => {
    setLoggedIn(true);
    try {
      if (cookie) {
        const res = await fetch(`${apiUrl}/auth/refresh`, {
          method: 'GET',
          credentials: 'include',
          headers: {
            'Content-Type': 'application/json',
          },
        });
        const data = await res.json();
        if (data.statusCode === 401) {
          LogoutFunction();
          navigate('/login');
        }
      }
      setLoggedIn(false);
    } catch (err: any) {
      setError(err.message);
    }
  };

  useEffect(() => {
    console.log('start refresh interval');
    const interval = setInterval(refreshToken, 1000 * 15);
    return () => {
      console.log('clear refresh interval');
      clearInterval(interval);
    };
  }, [loggedIn]);

  if (error) {
    return <ErrorHandler message={error} />;
  }

  return cookie ? <Outlet /> : <Navigate to="/login" />;
};
