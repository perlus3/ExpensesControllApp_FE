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
      const currentDate = new Date();
      const year = currentDate.getFullYear();
      const month = String(currentDate.getMonth() + 1).padStart(2, '0');
      const day = String(currentDate.getDate()).padStart(2, '0');
      const hours = String(currentDate.getHours()).padStart(2, '0');
      const minutes = String(currentDate.getMinutes()).padStart(2, '0');
      const seconds = String(currentDate.getSeconds()).padStart(2, '0');
      const formattedDate = `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
      console.log('data', data, formattedDate);
      if (data.statusCode === 401) {
        console.log('loggedOUT', formattedDate);
        setLoggedIn(false);
      }
    } catch (err: any) {
      setError(err.message);
    }
  };

  useEffect(() => {
    const interval = setInterval(refreshToken, 1000 * 60 * 4);
    console.log('interfval RUN', interval);
    return () => {
      clearInterval(interval);
      console.log('interval cleared', interval);
    };
  }, []);

  if (error) {
    return <ErrorHandler message={error} />;
  }

  return loggedIn ? <Outlet /> : <Navigate to="/login" />;
};
