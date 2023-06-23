import React, { SyntheticEvent, useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { apiUrl } from '../../config/api';
import { AuthContext } from '../../contexts/authContext';
import './AddNewAccount.css';
import { GoBackButton } from '../common/buttons/GoBackBtn';
import { ErrorHandler } from '../common/ErrorHandler';

export const AddNewAccountForm = () => {
  const userContext = useContext(AuthContext);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState();
  const [form, setForm] = useState({
    name: '',
    currency: '',
  });
  const addAccount = async (e: SyntheticEvent) => {
    e.preventDefault();

    setLoading(true);
    const controller = new AbortController();
    const signal = controller.signal;
    try {
      const res = await fetch(`${apiUrl}/accounts/add`, {
        signal,
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${userContext?.token}`,
        },

        body: JSON.stringify({
          ...form,
        }),
      });
      const data = await res.json();
      if (data.error) {
        setError(data.message);
      }

      userContext?.setUser(data.user);
      navigate(`/user`);
    } catch (err: any) {
      setError(err.message);
      if (err.name === 'AbortError') {
        console.log('cancelled');
      } else {
        setError(err.message);
      }
    } finally {
      setLoading(false);
    }

    return () => {
      controller.abort();
    };
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
    return <h2>Trwa dodawanie konta...</h2>;
  }

  return (
    <div className="new-account">
      <form className="adding-new-account" action="" onSubmit={addAccount}>
        <h1>Stwórz nowe konto</h1>
        <div className="form-floating w-100">
          <input
            id="login"
            type="name"
            name="name"
            placeholder="Nazwa nowego konta"
            required
            maxLength={50}
            value={form.name}
            className="form-control"
            onChange={(e) => updateForm('name', e.target.value)}
          />
          <label htmlFor="login">Nazwa konta</label>
        </div>
        <select
          className="form-select w-75"
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
        <button className="btn btn-primary w-50">Dodaj konto</button>
        <GoBackButton />
      </form>
    </div>
  );
};
