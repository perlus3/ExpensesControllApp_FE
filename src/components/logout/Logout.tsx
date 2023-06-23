import { useContext, useEffect } from 'react';
import { AuthContext } from '../../contexts/authContext';
import { apiUrl } from '../../config/api';
import { LoginForm } from '../login/LoginForm';

export const Logout = () => {
  const userContext = useContext(AuthContext);

  useEffect(() => {
    const controller = new AbortController();
    const signal = controller.signal;
    (async () => {
      await fetch(`${apiUrl}/auth/log-out`, {
        signal,
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${userContext?.token}`,
        },
      });
      userContext?.setToken('');

      return () => {
        controller.abort();
      };
    })();
  }, []);

  return <LoginForm />;
};
