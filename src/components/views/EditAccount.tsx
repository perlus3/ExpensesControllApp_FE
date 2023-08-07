import React, { SyntheticEvent, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { apiUrl } from '../../config/api';
import { ErrorHandler } from '../common/ErrorHandler';
import { GoBackButton } from '../common/buttons/GoBackBtn';
import { Spinner } from '../common/spinner/Spinner';
import { Toast } from '../../utils/toastify';

interface Props {
  accountId: string | undefined;
}

export const EditAccount = (props: Props) => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | undefined>(undefined);
  const [selectedOption, setSelectedOption] = useState('');
  const [isCurrencySelected, setIsCurrencySelected] = useState(false);
  const [selectedAccount, setSelectedAccount] = useState({
    name: '',
    currency: '',
  });
  const [form, setForm] = useState({
    name: ``,
    currency: '',
  });

  const updateAccountId = 'updateAccountId';

  useEffect(() => {
    (async () => {
      const res = await fetch(`${apiUrl}/accounts/${props.accountId}`, {
        method: 'GET',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      const data = await res.json();
      setSelectedAccount(data);
    })();
  }, []);
  const editOperation = async (e: SyntheticEvent) => {
    e.preventDefault();

    setLoading(true);
    try {
      const res = await fetch(`${apiUrl}/accounts/${props.accountId}`, {
        method: 'PUT',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },

        body: JSON.stringify({
          ...form,
          currency: selectedOption,
        }),
      });
      const data = await res.json();
      if (!data.error) {
        Toast('Dane konta zaktualizowane!', updateAccountId, 1000);
        navigate(-1);
      }
      if (!data.name) {
        setError(data.message);
      }
    } catch (e: any) {
      setError(e.message);
    } finally {
      setLoading(false);
    }
  };

  const updateForm = (key: string, value: string | number) => {
    setForm((form) => ({
      ...form,
      [key]: value,
    }));
  };

  const handleOptionChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedOption(e.target.value);
    setIsCurrencySelected(e.target.value !== '#');
  };

  if (loading) {
    return <Spinner />;
  }

  if (error) {
    return <ErrorHandler message={error} />;
  }

  return (
    <div className="form-container background-image vh-100">
      <form className="form" action="" onSubmit={editOperation}>
        <h1>Edytuj konto</h1>
        <p className="mt-2 mb-0 text-center">
          Aktualna nazwa konta to: {selectedAccount.name}
        </p>
        <input
          type="text"
          name="name"
          placeholder="Wpisz nową nazwe konta"
          maxLength={50}
          value={form.name}
          onChange={(e) => updateForm('name', e.target.value)}
        />
        <p className="mt-2 mb-0 text-center">
          Aktualna waluta to: {selectedAccount.currency}
        </p>
        <select
          className="form-select-sm"
          name="currency"
          value={selectedOption}
          onChange={handleOptionChange}
        >
          <option value="#">--wybierz--</option>
          <option value="PLN">PLN</option>
          <option value="EURO">EURO</option>
          <option value="DOLAR">DOLAR</option>
        </select>

        <button className="btn btn-primary w-50" disabled={!isCurrencySelected}>
          Zapisz
        </button>
        <GoBackButton />
      </form>
    </div>
  );
};
