import React, { SyntheticEvent, useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../contexts/authContext';
import { useNavigate } from 'react-router-dom';
import { apiUrl } from '../../config/api';
import { ErrorHandler } from '../common/ErrorHandler';
import { GoBackButton } from '../common/buttons/GoBackBtn';

interface Props {
  accountId: string | undefined;
}

export const EditAccount = (props: Props) => {
  const userContext = useContext(AuthContext);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | undefined>(undefined);
  const [selectedOption, setSelectedOption] = useState('');
  const [selectedAccount, setSelectedAccount] = useState({
    name: '',
    currency: '',
  });
  const [form, setForm] = useState({
    name: ``,
    currency: '',
  });

  useEffect(() => {
    const controller = new AbortController();
    const signal = controller.signal;
    (async () => {
      const res = await fetch(`${apiUrl}/accounts/${props.accountId}`, {
        signal,
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${userContext?.token}`,
        },
      });
      const data = await res.json();
      setSelectedAccount(data);
    })();
    return () => {
      controller.abort();
    };
  }, []);
  const editOperation = async (e: SyntheticEvent) => {
    e.preventDefault();

    setLoading(true);
    try {
      const res = await fetch(`${apiUrl}/accounts/${props.accountId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${userContext?.token}`,
        },

        body: JSON.stringify({
          ...form,
          currency: selectedOption,
        }),
      });
      const data = await res.json();
      if (!data.error) {
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

  const handleOptionChange = (e: any) => {
    setSelectedOption(e.target.value);
  };

  if (loading) {
    return <h2>Trwa edycja operacji...</h2>;
  }

  if (error) {
    return <ErrorHandler message={error} />;
  }

  return (
    <div className="form-container">
      <form className="form" action="" onSubmit={editOperation}>
        <h1>Edytuj konto</h1>
        <p className="mt-2 mb-0">
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
        <p className="mt-2 mb-0">
          Aktualna waluta to: {selectedAccount.currency}
        </p>
        <select
          className="form-select w-75"
          name="currency"
          value={selectedOption}
          onChange={handleOptionChange}
        >
          <option value="#">--wybierz--</option>
          <option value="PLN">PLN</option>
          <option value="EURO">EURO</option>
          <option value="DOLAR">DOLAR</option>
        </select>

        <button className="btn btn-primary w-50">Zapisz</button>
        <GoBackButton />
      </form>
    </div>
  );
};
