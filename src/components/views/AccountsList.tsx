import React, { useState } from 'react';
import { NewAccountEntity } from '../../types/interfaces';

interface SubmitHandler {
  (selectedAccountId: string): void;
}
interface Props {
  accounts?: NewAccountEntity[] | undefined;
  onSubmitEvent?: SubmitHandler;
}

export const AccountsList = ({ accounts, onSubmitEvent }: Props) => {
  const [selectedAccountId, setSelectedAccountId] = useState('');

  const handleAccountSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedAccountId(e.target.value);
  };

  const openSelectedAccount = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (onSubmitEvent) {
      onSubmitEvent(selectedAccountId);
    }
  };

  return (
    <form className="mt-4" onSubmit={openSelectedAccount}>
      <div className="d-flex justify-content-center">
        <select
          className="form-select-sm text-center"
          name="account"
          value={selectedAccountId}
          onChange={handleAccountSelect}
        >
          <option hidden value="#">
            --Wybierz konto--
          </option>
          {accounts?.map((account) => (
            <option key={account.id} value={account.id}>
              {account.name.charAt(0).toUpperCase() + account.name.slice(1)}
            </option>
          ))}
        </select>
      </div>
      <div className="d-flex justify-content-center mt-2">
        <button
          disabled={!selectedAccountId}
          className="btn btn-primary btn-sm my-2"
        >
          Wybierz!
        </button>
      </div>
    </form>
  );
};
