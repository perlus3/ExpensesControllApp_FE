import React, { SyntheticEvent, useContext, useEffect, useState } from 'react';
import { apiUrl } from '../config/api';
import { AuthContext } from '../contexts/authContext';
import { useNavigate } from 'react-router-dom';
import { GoBackButton } from '../components/common/buttons/GoBackBtn';

import './Form.css';
import { ErrorHandler } from '../components/common/ErrorHandler';

interface Props {
  operationId: string | undefined;
}

export const EditOperation = (props: Props) => {
  const userContext = useContext(AuthContext);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string>('');
  const [selectedOption, setSelectedOption] = useState('');
  const [selectedOperation, setSelectedOperation] = useState({
    name: '',
    value: '',
    operationType: '',
  });
  const [form, setForm] = useState({
    name: ``,
    value: ``,
    operationType: ``,
  });

  useEffect(() => {
    (async () => {
      const res = await fetch(`${apiUrl}/operations/${props.operationId}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${userContext?.token}`,
        },
      });
      const data = await res.json();
      setSelectedOperation(data);
    })();
  }, []);
  const editOperation = async (e: SyntheticEvent) => {
    e.preventDefault();

    setLoading(true);
    try {
      const res = await fetch(`${apiUrl}/operations/${props.operationId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${userContext?.token}`,
        },

        body: JSON.stringify({
          ...form,
          operationType: selectedOption,
        }),
      });
      const data = await res.json();
      if (!data.error) {
        navigate(-1);
      }
      console.log(data);
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
      <form
        style={{
          backgroundColor:
            selectedOperation.operationType === 'INCOME'
              ? '#beff9c'
              : '#f799af',
        }}
        className="form"
        action=""
        onSubmit={editOperation}
      >
        <h1>
          Edytuj{' '}
          {selectedOperation.operationType === 'INCOME'
            ? 'przychód'
            : 'wydatek'}{' '}
          na koncie
        </h1>
        <p className="mt-2 mb-0">Aktualna nazwa to: {selectedOperation.name}</p>
        <input
          type="text"
          name="name"
          placeholder="Wpisz nazwe operacji"
          maxLength={50}
          value={form.name}
          onChange={(e) => updateForm('name', e.target.value)}
        />
        <p className="mt-2 mb-0">
          Aktualna wartość to: {selectedOperation.value}
        </p>
        <input
          type="number"
          name="value"
          placeholder="Wpisz wartość operacji"
          maxLength={50}
          value={form.value}
          onChange={(e) => updateForm('value', Number(e.target.value))}
        />
        <select
          className="form-select w-75"
          name="operationType"
          value={selectedOption}
          onChange={handleOptionChange}
        >
          <option value="#">--wybierz--</option>
          <option value="INCOME">INCOME</option>
          <option value="EXPENSE">EXPENSE</option>
        </select>

        <button className="btn btn-primary w-50">Zapisz</button>
        <GoBackButton />
      </form>
    </div>
  );
};
