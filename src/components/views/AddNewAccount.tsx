import React, { SyntheticEvent, useContext, useState } from 'react';
import { Btn } from '../common/buttons/Btn';
import { useNavigate } from 'react-router-dom';
import { apiUrl } from '../../config/api';
import { AuthContext } from '../../contexts/authContext';

import './AddNewAccount.css';

export const AddNewAccount = () => {
  const userContext = useContext(AuthContext);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [form, setForm] = useState({
    name: '',
    currency: '',
  });

  const addAccount = async (e: SyntheticEvent) => {
    e.preventDefault();

    setLoading(true);
    try {
      const res = await fetch(`${apiUrl}/accounts/add`, {
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
        setError(data);
      }
      userContext?.setUser(data.user);
      //@TODO po dodaniu konta nie wraca mi na glowna strone a raczej jej nie wyswietla bo blad autoryzacji
      navigate(`/user`);
    } catch (e) {
      console.log('catch error', e);
    } finally {
      setLoading(false);
    }
  };
  const updateForm = (key: string, value: string) => {
    setForm((form) => ({
      ...form,
      [key]: value,
    }));
  };

  if (loading) {
    return <h2>Trwa dodawanie konta...</h2>;
  }

  if (error) {
    navigate('/invalid_credentials', { replace: true });
  }

  return (
    <div className="new-account">
      <form className="adding-new-account" action="" onSubmit={addAccount}>
        <h1>Wpisz nazwe i walute dla nowego konta</h1>
        <input
          type="text"
          name="name"
          placeholder="Nazwa nowego konta"
          required
          maxLength={50}
          value={form.name}
          onChange={(e) => updateForm('name', e.target.value)}
        />
        <input
          type="text"
          name="currency"
          placeholder="Waluta (PLN, EURO, DOLAR)"
          required
          maxLength={50}
          value={form.currency}
          onChange={(e) => updateForm('currency', e.target.value)}
        />
        <Btn text="Dodaj konto" />
      </form>
    </div>
  );
};
