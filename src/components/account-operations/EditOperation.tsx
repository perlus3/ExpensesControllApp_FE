import React, { SyntheticEvent, useEffect, useState } from 'react';
import { apiUrl } from '../../config/api';
import { useNavigate } from 'react-router-dom';
import { GoBackButton } from '../common/buttons/GoBackBtn';

import '../../assets/styles/Form.css';
import { ErrorHandler } from '../common/ErrorHandler';
import { CategoryEntity } from '../../types/interfaces';
import { Spinner } from '../common/spinner/Spinner';
import { Toast } from '../../utils/toastify';

interface Props {
  operationId: string | undefined;
}

export const EditOperation = (props: Props) => {
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

  const updateOperationId = 'updateOperationId';

  useEffect(() => {
    (async () => {
      const res = await fetch(`${apiUrl}/operations/${props.operationId}`, {
        method: 'GET',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      const categories = await fetch(`${apiUrl}/categories`, {
        method: 'GET',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      const categoryNames = await categories.json();
      if (categoryNames.statusCode === 401) {
        navigate('/login');
      }
      setCategories(categoryNames);

      const data = await res.json();
      if (data.statusCode === 401) {
        navigate('/login');
      }
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
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },

        body: JSON.stringify({
          ...form,
          categoryId: form.category,
        }),
      });
      const data = await res.json();
      if (data.statusCode === 401) {
        navigate('/login');
      }
      if (!data.error) {
        Toast('Operacja edytowana pomyślnie!', updateOperationId, 1000);
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
    return <Spinner />;
  }

  if (error) {
    return <ErrorHandler message={error} />;
  }

  return (
    <div className="form-container">
      <form className="form" action="" onSubmit={editOperation}>
        <h3 className="text-center mt-2">
          Edytuj{' '}
          {selectedOperation.operationType === 'INCOME'
            ? 'przychód'
            : 'wydatek'}{' '}
          na koncie
        </h3>
        <p className="mt-2 mb-0 text-center">
          Aktualna nazwa to: {selectedOperation.name}
        </p>
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
          className="form-select-sm mt-2"
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
        <div className="col my-2">
          <div className="col my-2 text-center">
            <button className="btn btn-sm w-100 btn-primary">Zapisz</button>
          </div>
          <div className="col text-center">
            <GoBackButton />
          </div>
        </div>
      </form>
    </div>
  );
};
