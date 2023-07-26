import React, { useEffect, useState } from 'react';
import { apiUrl } from '../../config/api';

import { AccountsListView } from './AccountsListView';
import { Header } from '../header/Header';

import { ErrorHandler } from '../common/ErrorHandler';
import { Link, useNavigate } from 'react-router-dom';
import { NewAccountEntity } from '../../types/interfaces';

export const UserMainPageView = () => {
  const navigate = useNavigate();
  const [accounts, setAccounts] = useState<NewAccountEntity[] | undefined>(
    undefined,
  );
  const [error, setError] = useState<string | undefined>(undefined);

  useEffect(() => {
    (async () => {
      try {
        const res = await fetch(`${apiUrl}/accounts/all`, {
          method: 'GET',
          credentials: 'include',
          headers: {
            'Content-Type': 'application/json',
          },
        });
        const data = await res.json();
        if (data.statusCode === 401) {
          navigate('/login');
        }
        setAccounts(data);
      } catch (err: any) {
        setError(err.message);
      }
    })();
  }, []);

  if (error) {
    return <ErrorHandler message={error} />;
  }

  return (
    <>
      <Header />
      {accounts && !accounts.length ? (
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
        <AccountsListView accounts={accounts} />
      )}
    </>
  );
};
