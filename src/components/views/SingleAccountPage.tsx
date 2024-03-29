import React, { useContext, useEffect, useState } from 'react';
import { apiUrl } from '../../config/api';
import { AuthContext } from '../../contexts/authContext';
import { useNavigate, useParams } from 'react-router-dom';
import { AccountOperationsListView } from './AccountOperationsListView';
import { GoBackButton } from '../common/buttons/GoBackBtn';

import { AddAccountOperations } from '../account-operations/AddAccountOperations';
import { DeleteAccountBtn } from '../common/buttons/DeleteAccountBtn';
import { NewAccountEntity } from '../../types/interfaces';
import { ErrorHandler } from '../common/ErrorHandler';

export const SingleAccountPage = () => {
  const userContext = useContext(AuthContext);
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
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${userContext?.token}`,
          },
        });
        const result = await res.json();
        if (!result.name) {
          setError(result.message);
        }
        setAccount(result);
      })();
    } catch (e: any) {
      setError(e.message);
    }
  }, [count]);

  if (account === null) {
    return <p>Wczytywanie...</p>;
  }

  if (error) {
    return <ErrorHandler message={error} />;
  }

  const navigateClick = () => {
    navigate(`/edit-account-form/${id}`);
  };

  const goForDetails = () => {
    navigate(`/details/${id}`);
  };

  return (
    <div className="container-fluid text-center mb-3">
      <AddAccountOperations
        name={account.name}
        value={account.value}
        key={account.id}
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
          <div className="col">
            <button
              className="btn btn-success"
              style={{ color: 'white' }}
              onClick={() => goForDetails()}
            >
              Analizuj wydatki
            </button>
          </div>
          <div className="col">
            <button
              className="btn btn-warning"
              style={{ color: 'white' }}
              onClick={() => navigateClick()}
            >
              Edytuj konto
            </button>
          </div>
          <div className="col">
            <DeleteAccountBtn />
          </div>
        </div>
      </div>
    </div>
  );
};
