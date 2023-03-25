import React, { useContext, useEffect } from 'react';
import { AuthContext } from '../../contexts/authContext';
import { apiUrl } from '../../config/api';

import { AccountsList } from './AccountsList';
import { Header } from '../header/Header';

import './UserMainPage.css';

export const UserMainPageView = () => {
  const userContext = useContext(AuthContext);

  useEffect(() => {
    (async () => {
      const res = await fetch(`${apiUrl}/accounts/all`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${userContext?.token}`,
        },
      });
      const data = await res.json();

      userContext?.setAccounts(data);
    })();
  }, []);

  if (userContext?.accounts === null) {
    return <p>Wczytywanie...</p>;
  }

  return (
    <div className="user-page">
      <Header />
      <AccountsList />
    </div>
  );
};
