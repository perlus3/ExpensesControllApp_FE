import { useContext, useEffect } from 'react';
import { AuthContext } from '../../contexts/authContext';
import { apiUrl } from '../../config/api';

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
    })();
  }, []);
  //@Todo zrobic zeby wylogowanie wyrzucalo do panelu logowania/ problem z cofaniem strony, nadal mozna wykonywac akcje/oraz odwieczny problem z odswiezaniem strony/ jak zrobic warunki na routes
  return <p>Wylogowano</p>;
};
