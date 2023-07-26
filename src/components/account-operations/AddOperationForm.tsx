import { useNavigate, useParams } from 'react-router-dom';
import { CategoryEntity, OperationType } from '../../types/interfaces';
import React, { ChangeEvent, SyntheticEvent, useEffect, useState } from 'react';
import { apiUrl } from '../../config/api';
import { ErrorHandler } from '../common/ErrorHandler';
import { GoBackButton } from '../common/buttons/GoBackBtn';

export const AddOperationForm = () => {
  const params = useParams();
  const { id } = params;
  const navigate = useNavigate();

  const [operationType, setOperationType] = useState<
    OperationType | string | null
  >(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | undefined>(undefined);
  const [categories, setCategories] = useState<CategoryEntity[]>([]);
  const [form, setForm] = useState({
    name: '',
    value: '',
    categoryId: '',
    operationType: operationType,
  });

  const isCategorySelected = form.categoryId !== '';

  const handleOperationTypeChange = (e: ChangeEvent<HTMLInputElement>) => {
    setOperationType(e.target.value);
  };

  useEffect(() => {
    try {
      (async () => {
        const res = await fetch(`${apiUrl}/categories`, {
          method: 'GET',
          credentials: 'include',
          headers: {
            'Content-Type': 'application/json',
          },
        });
        const data = await res.json();
        if (data.statusCode === 401) {
          navigate('/login');
        }

        if (!data.id) {
          setError(data.message);
        }
        setCategories(data);
      })();
    } catch (error: any) {
      setError(error.message);
    }
  }, []);

  const addOperation = async (e: SyntheticEvent) => {
    e.preventDefault();

    setLoading(true);
    try {
      const res = await fetch(`${apiUrl}/operations/${id}/add`, {
        method: 'POST',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },

        body: JSON.stringify({
          ...form,
          operationType: operationType,
        }),
      });
      const data = await res.json();
      if (data.statusCode === 401) {
        navigate('/login');
      }
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
      <form className="form" onSubmit={addOperation}>
        <h5>Wybierz typ operacji:</h5>
        <div className="row mb-3">
          <label className="mb-0">
            <div className="col d-flex align-items-center">
              <div className="col-6">
                <input
                  type="radio"
                  className="my-radio"
                  value={OperationType.INCOME}
                  checked={operationType === OperationType.INCOME}
                  onChange={handleOperationTypeChange}
                />
              </div>
              Przychód
            </div>
          </label>
        </div>
        <div className="row mb-3">
          <label className="mb-0">
            <div className="d-flex align-items-center">
              <div className="col-6">
                <input
                  type="radio"
                  className="my-radio"
                  value={OperationType.EXPENSE}
                  checked={operationType === OperationType.EXPENSE}
                  onChange={handleOperationTypeChange}
                />
              </div>
              Wydatek
            </div>
          </label>
        </div>
        <div className="row mb-3">
          <div className="col-12 col-md-6">
            <input
              type="text"
              className="form-control"
              name="name"
              placeholder="Nazwa operacji"
              required
              maxLength={50}
              value={form.name}
              onChange={(e) => updateForm('name', e.target.value)}
            />
          </div>
          <div className="col-12 col-md-6">
            <input
              type="number"
              className="form-control"
              name="value"
              placeholder="Wpisz wartość operacji"
              required
              maxLength={50}
              value={form.value}
              onChange={(e) => updateForm('value', Number(e.target.value))}
            />
          </div>
        </div>
        <div className="row mb-3 d-flex justify-content-center">
          <div className="col-12 col-md-6">
            <select
              className="form-select"
              name="categoryId"
              value={form.categoryId}
              onChange={(e) => updateForm('categoryId', e.target.value)}
            >
              <option>--wybierz--</option>
              {operationType === 'INCOME'
                ? categories
                    .filter((category) => category.type === 'INCOME')
                    .map((category) => (
                      <option key={category.id} value={category.id}>
                        {category.name}
                      </option>
                    ))
                : categories
                    .filter((category) => category.type === 'EXPENSE')
                    .map((category) => (
                      <option key={category.id} value={category.id}>
                        {category.name}
                      </option>
                    ))}
            </select>
          </div>
        </div>
        <button
          className="btn btn-primary w-50 mb-2"
          disabled={!isCategorySelected}
        >
          Dodaj
        </button>
        <GoBackButton />
      </form>
    </div>
  );
};
