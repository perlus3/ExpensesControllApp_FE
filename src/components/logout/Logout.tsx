import React, { useEffect } from 'react';
import { apiUrl } from '../../config/api';
import { Navigate } from 'react-router-dom';
import { Toast } from '../../utils/toastify';

export const LogoutFunction = () => {
  const logoutId = 'logout';
  (async () => {
    await fetch(`${apiUrl}/auth/log-out`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    Toast('Wylogowano!', logoutId);
  })();
};

export const Logout = () => {
  useEffect(() => {
    LogoutFunction();
  }, []);

  return <Navigate to="/" />;
};
