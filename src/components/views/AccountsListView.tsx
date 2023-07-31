import React, { useState } from 'react';

import { useNavigate } from 'react-router-dom';

import './AccountList.css';
import { NewAccountEntity } from '../../types/interfaces';

interface Props {
  accounts?: NewAccountEntity[] | undefined;
}

export const AccountsListView = (props: Props) => {
  const navigate = useNavigate();
  const [selectedAccountId, setSelectedAccountId] = useState('');

  const handleAccountSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedAccountId(e.target.value);
  };

  const openSelectedAccount = () => {
    navigate(`/accounts/${selectedAccountId}`);
  };
  return (
    <div className="row justify-content-center">
      <div className="col-12">
        <div className="pt-5"></div>
        <p className="fs-3 pt-5 text-center text-white">
          Wybierz konto aby wykonywać na nim operacje:
        </p>
      </div>
      <form className="mt-4" onSubmit={openSelectedAccount}>
        <div className="d-flex justify-content-center">
          <select
            className="form-select w-50 text-center"
            name="account"
            value={selectedAccountId}
            onChange={handleAccountSelect}
          >
            <option value="">--Wybierz--</option>
            {props.accounts?.map((account) => (
              <option key={account.id} value={account.id}>
                {account.name.charAt(0).toUpperCase() + account.name.slice(1)}
              </option>
            ))}
          </select>
        </div>
        <div className="me-3 d-flex justify-content-center mt-5">
          <button
            disabled={!selectedAccountId}
            className="btn btn-primary my-2"
          >
            Wybierz!
          </button>
        </div>
      </form>
    </div>
  );
};
