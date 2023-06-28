import React, { SyntheticEvent, useContext, useEffect, useState } from 'react';
import { apiUrl } from '../config/api';
import { AuthContext } from '../contexts/authContext';
import { useNavigate } from 'react-router-dom';
import { GoBackButton } from '../components/common/buttons/GoBackBtn';

import './Form.css';
import { ErrorHandler } from '../components/common/ErrorHandler';
import { CategoryEntity } from '../types/interfaces';

interface Props {
  operationId: string | undefined;
}

export const EditOperation = (props: Props) => {
  const userContext = useContext(AuthContext);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string>('');
  const [categories, setCategories] = useState<CategoryEntity[]>([]);

  const [selectedOperation, setSelectedOperation] = useState({
    name: '',
    value: '',
    category: '',
    operationType: '',
  });
  const [form, setForm] = useState({
    name: ``,
    value: ``,
    category: ``,
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
      const categories = await fetch(`${apiUrl}/categories`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${userContext?.token}`,
        },
      });
      const categoryNames = await categories.json();
      setCategories(categoryNames);
      const data = await res.json();
      setSelectedOperation({
        ...data,
        category: data.category.name,
      });
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
          categoryId: form.category,
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
        <p className="mt-2 mb-0">
          Aktualna kategoria to: {selectedOperation.category}
        </p>

        <select
          className="form-select w-75"
          name="category"
          value={form.category}
          onChange={(e) => updateForm('category', e.target.value)}
        >
          <option value="">--Wybierz kategorie--</option>
          {categories.map((category) => (
            <option key={category.id} value={category.id}>
              {category.name}
            </option>
          ))}
        </select>

        <button className="btn btn-primary w-50">Zapisz</button>
        <GoBackButton />
      </form>
    </div>
  );
};
