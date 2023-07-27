import React, { useEffect, useState } from 'react';
import { apiUrl } from '../../config/api';
import { useNavigate, useParams } from 'react-router-dom';
import { AccountOperationsListView } from './AccountOperationsListView';
import { AccountInfo } from '../account-operations/AccountInfo';
import { NewAccountEntity } from '../../types/interfaces';
import { ErrorHandler } from '../common/ErrorHandler';
import { Header } from '../header/Header';
import { Button } from 'react-bootstrap';
import { Footer } from '../../footer/Footer';

export const SingleAccountPage = () => {
  const params = useParams();
  const { id } = params;
  const navigate = useNavigate();
  const [account, setAccount] = useState<NewAccountEntity | null>(null);
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
  }, []);

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
    <div className="container-fluid p-0">
      <Header />
      <div className="container-fluid d-flex flex-column">
        <div className="row d-flex justify-content-center background-color border">
          <div className="d-flex justify-content-center py-1">
            <h5>
              {account.name.charAt(0).toUpperCase() + account.name.slice(1)}
            </h5>
          </div>
          <div className="d-flex justify-content-center py-1">{today}</div>
          <div className="d-flex justify-content-center py-1">
            <Button
              className="btn btn-sm smaller-button btn-primary mb-1"
              onClick={() => navigate(`/add-operation/${id}`)}
            >
              Dodaj nową operacje
            </Button>
          </div>
          <div>
            <AccountInfo
              id={params.id}
              value={account.value}
              currency={account.currency}
            />
            <AccountOperationsListView
              id={params.id}
              currency={account.currency}
            />
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};
