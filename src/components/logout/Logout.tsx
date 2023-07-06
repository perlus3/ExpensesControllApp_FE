import React, { useEffect } from 'react';
import { apiUrl } from '../../config/api';
import { Navigate } from 'react-router-dom';

export const LogoutFunction = () => {
  (async () => {
    await fetch(`${apiUrl}/auth/log-out`, {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
    });
  })();
};

export const Logout = () => {
  useEffect(() => {
    LogoutFunction();
  }, []);

  return <Navigate to="/login" />;
};
