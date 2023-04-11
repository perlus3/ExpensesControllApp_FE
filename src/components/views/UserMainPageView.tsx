import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../contexts/authContext';
import { apiUrl } from '../../config/api';

import { AccountsList } from './AccountsList';
import { Header } from '../header/Header';

import { ErrorHandler } from '../common/ErrorHandler';
import { Link } from 'react-router-dom';

export const UserMainPageView = () => {
  const userContext = useContext(AuthContext);
  const [error, setError] = useState<string | undefined>(undefined);

  useEffect(() => {
    const controller = new AbortController();
    const signal = controller.signal;
    (async () => {
      try {
        const res = await fetch(`${apiUrl}/accounts/all`, {
          signal,
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${userContext?.token}`,
          },
        });
        const data = await res.json();

        userContext?.setAccounts(data);
      } catch (err: any) {
        setError(err.message);
        if (err.name === 'AbortError') {
          console.log('cancelled');
        } else {
          setError(err.message);
        }
      }

      return () => {
        controller.abort();
      };
    })();
  }, []);

  if (userContext?.accounts === null) {
    return <p>Wczytywanie...</p>;
  }

  if (error) {
    return <ErrorHandler message={error} />;
  }

  return (
    <>
      <Header />
      {userContext?.accounts && !userContext?.accounts.length ? (
        <div className="d-flex flex-column justify-content-between h-100">
          <span className="d-flex align-items-center justify-content-center">
            <h3 className="text-center mt-5 mx-5">
              Ta aplikacja ma pomagać w kontrolowaniu swoich wydatków, stwórz
              nowe konto, dodaj na niego środki, a następnie wykonuj na nim
              dowolne operacje, wpłacaj środki, zapisuj wydatki.
            </h3>
          </span>
          <div className="d-flex align-items-center justify-content-center">
            <button
              className="btn btn-lg btn-dark"
              style={{ position: 'relative', top: '100px' }}
            >
              <Link to="/new-account" style={{ color: 'white' }}>
                Dodaj nowe konto!
              </Link>
            </button>
          </div>
        </div>
      ) : (
        <AccountsList />
      )}
    </>
  );
};
