import { useContext, useEffect } from 'react';
import { AuthContext } from '../../contexts/authContext';
import { apiUrl } from '../../config/api';
import { LoginForm } from '../login/LoginForm';

export const Logout = () => {
  const userContext = useContext(AuthContext);

  useEffect(() => {
    (async () => {
      await fetch(`${apiUrl}/auth/log-out`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${userContext?.token}`,
        },
      });
      userContext?.setToken('');
    })();
  }, []);

  return <LoginForm />;
};
