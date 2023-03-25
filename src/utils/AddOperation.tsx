import React, { SyntheticEvent, useContext, useState } from 'react';
import { OperationType } from '../../../wydatki-backend/types';
import { apiUrl } from '../config/api';
import { AuthContext } from '../contexts/authContext';
import { Btn } from '../components/common/buttons/Btn';
import { useNavigate } from 'react-router-dom';
import { GoBackButton } from '../components/common/buttons/GoBackBtn';

interface Props {
  accountId: string | undefined;
  operationType: OperationType;
}

export const AddOperation = (props: Props) => {
  const userContext = useContext(AuthContext);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
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
      if (data) {
        navigate(-1);
      }
    } catch (e) {
      console.log(e);
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

  return (
    <form className="add-operation-form" action="" onSubmit={addOperation}>
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
      <Btn text="Dodaj" />
      <GoBackButton />
    </form>
  );
};
