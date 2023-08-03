import React, { useContext, useEffect, useState } from 'react';
import { apiUrl } from '../../config/api';

import { AccountsList } from './AccountsList';
import { Header } from '../header/Header';

import { ErrorHandler } from '../common/ErrorHandler';
import { Link, useNavigate } from 'react-router-dom';
import { NewAccountEntity } from '../../types/interfaces';
import { UserAccountsContext } from '../../context/UserAccountsContext';

export const UserMainPageView = () => {
  const accountsContext = useContext(UserAccountsContext);
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
        accountsContext?.setAccounts(data);
      } catch (err: any) {
        setError(err.message);
      }
    })();
  }, []);

  const handleAccountSubmit = (accountId: string) => {
    navigate(`/accounts/${accountId}`);
  };

  if (error) {
    return <ErrorHandler message={error} />;
  }
  return (
    <div className="container-fluid d-flex flex-column p-0 vh-100">
      <Header />
      {accounts && !accounts.length ? (
        <div className="d-flex flex-column justify-content-between h-100">
          <span className="d-flex align-items-center justify-content-center">
            <h3 className="text-center text mt-5 mx-5 pt-5">
              Ta aplikacja ma pomagać w kontrolowaniu swoich wydatków, stwórz
              nowe konto, dodaj na niego środki, a następnie wykonuj na nim
              dowolne operacje, wpłacaj środki, zapisuj wydatki.
            </h3>
          </span>
          <div className="d-flex align-items-center justify-content-center">
            <button
              className="btn btn-lg btn-light text-dark "
              style={{ position: 'relative', top: '100px' }}
            >
              <Link to="/new-account">Dodaj nowe konto!</Link>
            </button>
          </div>
        </div>
      ) : (
        <div className="row justify-content-center">
          <div className="col-12">
            <div className="pt-5"></div>
            <p className="fs-3 pt-5 text-center text-white">
              Wybierz konto aby wykonywać na nim operacje:
            </p>
          </div>
          <AccountsList
            accounts={accounts}
            onSubmitEvent={handleAccountSubmit}
          />
        </div>
      )}
    </div>
  );
};
