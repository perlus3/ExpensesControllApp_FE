import React, { useEffect, useState } from 'react';
import { apiUrl } from '../../config/api';
import { useNavigate, useParams } from 'react-router-dom';
import { OperationsList } from './OperationsList';
import { AccountInfo } from './AccountInfo';
import { NewAccountEntity } from '../../types/interfaces';
import { ErrorHandler } from '../common/ErrorHandler';
import { Header } from '../header/Header';
import { Button } from 'react-bootstrap';

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
    return () => {
      setAccount(null);
    };
  }, [id]);

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
    <div className="container-fluid d-flex flex-column p-0 background-color vh-100">
      <Header />
      <div className="row d-flex justify-content-center background-color border">
        <div className="mt-3"></div>
        <div className="d-flex justify-content-center">
          <h5 className="text-center">
            {account.name.charAt(0).toUpperCase() + account.name.slice(1)}
          </h5>
        </div>
        <div className="d-flex justify-content-center py-1">{today}</div>
        <div className="d-flex justify-content-center py-1">
          <Button
            className="btn btn-sm btn-primary my-3"
            onClick={() => navigate(`/add-operation/${id}`)}
          >
            Dodaj nową operacje
          </Button>
        </div>
        <div>
          <AccountInfo value={account.value} currency={account.currency} />
          <OperationsList currency={account.currency} />
        </div>
      </div>
    </div>
  );
};
