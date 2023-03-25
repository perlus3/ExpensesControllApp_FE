import React, { useContext, useEffect, useState } from 'react';
import { apiUrl } from '../../config/api';
import { AuthContext } from '../../contexts/authContext';
import { useParams } from 'react-router-dom';
import { AddAccountOperations } from '../account-operations/AddAccountOperations';
import { AccountOperationsList } from '../account-operations/AccountOperationsList';
import { GoBackButton } from '../common/buttons/GoBackBtn';
import { NewAccountEntity } from '../../../../wydatki-backend/types';

import './SingleAccountPage.css';

export const SingleAccountPage = () => {
  const userContext = useContext(AuthContext);
  const params = useParams();
  const { id } = params;
  const [account, setAccount] = useState<NewAccountEntity | null>(null);

  useEffect(() => {
    (async () => {
      const res = await fetch(`${apiUrl}/accounts/${id}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${userContext?.token}`,
        },
      });
      const data = await res.json();

      setAccount(data);
    })();
  }, []);

  if (account === null) {
    return <p>Wczytywanie...</p>;
  }

  return (
    <div className="single-account-page">
      <div className="account-info">
        <p>
          {account.name} <br />
          {account.value} {account.currency}
        </p>
        <AddAccountOperations />
      </div>
      <AccountOperationsList id={params.id} />
      <GoBackButton />
    </div>
  );
};
