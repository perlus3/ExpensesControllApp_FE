import React, { SyntheticEvent, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { apiUrl } from '../../config/api';
import '../../assets/styles/AddNewAccount.css';
import { GoBackButton } from '../common/buttons/GoBackBtn';
import { ErrorHandler } from '../common/ErrorHandler';
import { Toast } from '../../utils/toastify';
import { Spinner } from '../common/spinner/Spinner';

export const AddNewAccountForm = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState();
  const [form, setForm] = useState({
    name: '',
    currency: '',
  });

  const isCurrencySelected = form.currency !== '';

  const addAccount = async (e: SyntheticEvent) => {
    e.preventDefault();

    setLoading(true);

    const addAccountId = 'addAccountId';

    try {
      const res = await fetch(`${apiUrl}/accounts/add`, {
        method: 'POST',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },

        body: JSON.stringify({
          ...form,
        }),
      });
      const data = await res.json();
      if (!data.error) {
        Toast('Nowe konto dodane!', addAccountId, 1000);
        navigate(`/user`);
      }
      setError(data.message);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  if (error) {
    return <ErrorHandler message={error} />;
  }

  const updateForm = (key: string, value: string) => {
    setForm((form) => ({
      ...form,
      [key]: value,
    }));
  };

  if (loading) {
    return <Spinner />;
  }

  return (
    <div className="background-image vh-100">
      <div className="new-account">
        <form className="adding-new-account" action="" onSubmit={addAccount}>
          <h1>Stwórz nowe konto</h1>
          <div className="form-floating w-100">
            <input
              type="name"
              name="name"
              placeholder="Nazwa nowego konta"
              required
              maxLength={20}
              value={form.name}
              className="form-control"
              onChange={(e) => updateForm('name', e.target.value)}
            />
            <label htmlFor="login">Nazwa konta</label>
          </div>
          <p className="fs-5 m-0">Wybierz walute:</p>
          <select
            className="form-select-sm"
            name="currency"
            value={form.currency}
            onChange={(e) => updateForm('currency', e.target.value)}
          >
            <option hidden value="#">
              --wybierz--
            </option>
            <option value="PLN">PLN</option>
            <option value="EURO">EURO</option>
            <option value="DOLAR">DOLAR</option>
          </select>
          <button disabled={!isCurrencySelected} className="btn btn-primary">
            Dodaj konto
          </button>
          <GoBackButton />
        </form>
      </div>
    </div>
  );
};
