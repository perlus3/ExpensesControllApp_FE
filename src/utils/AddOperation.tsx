import React, { SyntheticEvent, useContext, useState } from 'react';
import { OperationType } from '../../../wydatki-backend/types';
import { apiUrl } from '../config/api';
import { AuthContext } from '../contexts/authContext';
import { useNavigate } from 'react-router-dom';
import { GoBackButton } from '../components/common/buttons/GoBackBtn';

import './Form.css';
import { ErrorHandler } from '../components/common/ErrorHandler';

interface Props {
  accountId: string | undefined;
  operationType: OperationType;
}

export const AddOperation = (props: Props) => {
  const userContext = useContext(AuthContext);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | undefined>(undefined);
  const [form, setForm] = useState({
    name: '',
    value: '',
    operationType: props.operationType,
  });

  const addOperation = async (e: SyntheticEvent) => {
    e.preventDefault();

    setLoading(true);
    try {
      const res = await fetch(`${apiUrl}/operations/${props.accountId}/add`, {
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
      console.log(data);
      if (!data.message) {
        navigate(-1);
      }
      if (!data.value) {
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
  if (loading) {
    return <h2>Trwa dodawanie operacji...</h2>;
  }

  if (error) {
    return <ErrorHandler message={error} />;
  }

  return (
    <div className="form-container">
      <form className="form" action="" onSubmit={addOperation}>
        <h1>Dodaj operacje na koncie</h1>
        <input
          type="text"
          name="name"
          placeholder="Nazwa operacji"
          required
          maxLength={50}
          value={form.name}
          onChange={(e) => updateForm('name', e.target.value)}
        />
        <input
          type="number"
          name="value"
          placeholder="Wpisz wartość operacji"
          required
          maxLength={50}
          value={form.value}
          onChange={(e) => updateForm('value', Number(e.target.value))}
        />
        <button className="btn btn-primary w-50">Dodaj</button>
        <GoBackButton />
      </form>
    </div>
  );
};
