import React, { useEffect, useState } from 'react';
import { apiUrl } from '../../config/api';
import { useNavigate, useParams } from 'react-router-dom';
import { AccountOperationsListView } from './AccountOperationsListView';
import { GoBackButton } from '../common/buttons/GoBackBtn';

import { AccountInfo } from '../account-operations/AccountInfo';
import { NewAccountEntity } from '../../types/interfaces';
import { ErrorHandler } from '../common/ErrorHandler';
import { AddOperationForm } from '../account-operations/AddOperationForm';
import { LogoutFunction } from '../logout/Logout';

export const SingleAccountPage = () => {
  const params = useParams();
  const { id } = params;
  const navigate = useNavigate();
  const [account, setAccount] = useState<NewAccountEntity | null>(null);
  const [count, setCount] = useState(0);
  const [error, setError] = useState<string | undefined>(undefined);

  useEffect(() => {
    try {
      (async () => {
        const res = await fetch(`${apiUrl}/accounts/${id}`, {
          method: 'GET',
          credentials: 'include',
          headers: {
            'Content-Type': 'application/json',
          },
        });
        const result = await res.json();
        if (result.statusCode === 401) {
          LogoutFunction();
          navigate('/login');
        }

        if (!result.name) {
          setError(result.message);
        }
        setAccount(result);
      })();
    } catch (err: any) {
      setError(err.message);
    }
  }, [count]);

  if (account === null) {
    return <p>Wczytywanie...</p>;
  }

  if (error) {
    return <ErrorHandler message={error} />;
  }

  const today = new Date().toLocaleDateString('pl-PL', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  return (
    <div className="container-fluid">
      <div className="row d-flex justify-content-center background-color border">
        <div className="d-flex justify-content-center py-1">
          <h5>{account.name}</h5>
        </div>
        <div className="d-flex justify-content-center py-1">{today}</div>
        <div className="d-flex justify-content-center py-1">
          <AddOperationForm />
        </div>
        <AccountInfo
          id={params.id}
          value={account.value}
          currency={account.currency}
        />
        <AccountOperationsListView
          id={params.id}
          currency={account.currency}
          count={count}
          setCount={setCount}
        />
        <div className="container mt-3">
          <div className="row">
            <div className="col">
              <GoBackButton />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
