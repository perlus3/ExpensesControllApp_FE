import React, { SyntheticEvent, useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../contexts/authContext';
import { GoBackButton } from '../common/buttons/GoBackBtn';
import { CategoryEntity, FilteredOperation } from '../../types/interfaces';
import { apiUrl } from '../../config/api';
import { ErrorHandler } from '../common/ErrorHandler';
import { eachDayOfInterval, format } from 'date-fns';

export const DetailsView = () => {
  const userContext = useContext(AuthContext);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | undefined>(undefined);
  const [render, setRender] = useState(0);

  const [categories, setCategories] = useState<CategoryEntity[]>([]);
  const [filteredOperations, setFilteredOperations] = useState<
    FilteredOperation[]
  >([
    {
      id: '',
      name: '',
      value: 0,
      createdAt: new Date(),
    },
  ]);

  const [form, setForm] = useState({
    categoryId: '',
    startDate: '',
    endDate: '',
  });

  const startDate = new Date(2023, 0, 1);
  const endDate = new Date(2030, 3, 1);

  const dates = eachDayOfInterval({ start: startDate, end: endDate }).map(
    (date) => format(date, 'dd.MM.yyyy'),
  );

  useEffect(() => {
    try {
      (async () => {
        const res = await fetch(`${apiUrl}/categories`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${userContext?.token}`,
          },
        });
        const data = await res.json();
        if (!data.id) {
          setError(data.message);
        }
        setCategories(data);
      })();
    } catch (error: any) {
      setError(error.message);
    }
  }, []);
  const checkDetails = async (e: SyntheticEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch(
        `${apiUrl}/categories/all/${form.categoryId}?startDate=${form.startDate}&endDate=${form.endDate}`,
        {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${userContext?.token}`,
          },
        },
      );
      const data = await res.json();

      if (!data.message) {
        setFilteredOperations(data);
        setRender(+1);
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
    return <h2>Trwa pobieranie operacji...</h2>;
  }

  if (error) {
    return <ErrorHandler message={error} />;
  }

  const newDate = (date: Date) => {
    return new Date(date).toLocaleDateString('pl-PL', {
      year: 'numeric',
      month: 'numeric',
      day: 'numeric',
    });
  };

  return (
    <div className="container">
      <div className="row">
        <div className="details-view col">
          <form className="form" onSubmit={checkDetails}>
            <h1>Wybierz kategorie</h1>
            <select
              className="form-select w-75"
              name="categoryId"
              value={form.categoryId}
              onChange={(e) => updateForm('categoryId', e.target.value)}
            >
              <option value="">--Wybierz kategorie--</option>
              {categories.map((category) => (
                <option key={category.id} value={category.id}>
                  {category.name}
                </option>
              ))}
            </select>
            <h2>Wybierz daty</h2>
            <p className="mb-0">od:</p>
            <select
              className="form-select w-75"
              name="startDate"
              value={form.startDate}
              onChange={(e) => updateForm('startDate', e.target.value)}
            >
              <option value="">--Wybierz datę--</option>
              {dates.map((date) => (
                <option key={date} value={date}>
                  {date}
                </option>
              ))}
            </select>
            <p className="mb-0">do:</p>
            <select
              className="form-select w-75"
              name="endDate"
              value={form.endDate}
              onChange={(e) => updateForm('endDate', e.target.value)}
            >
              <option value="">--Wybierz datę--</option>
              {dates.map((date) => (
                <option key={date} value={date}>
                  {date}
                </option>
              ))}
            </select>
            <button className="btn btn-primary w-50">Wybierz</button>
            <GoBackButton />
          </form>
        </div>
        {render ? (
          <div className="details-list d-flex col mt-5 border">
            <div className="col">
              <table className="table table-striped">
                <thead>
                  <tr>
                    <th scope="col">Nazwa</th>
                    <th scope="col">Wartość</th>
                    <th scope="col">Data</th>
                  </tr>
                </thead>
                {filteredOperations.map((el) => (
                  <tbody>
                    <tr key={el.id}>
                      <td>{el.name}</td>
                      <td>{el.value}</td>
                      <td>{newDate(el.createdAt)}</td>
                    </tr>
                  </tbody>
                ))}
              </table>
            </div>
            <div className="col">
              <p className="text-center">
                Suma wybranych operacji wyniosła:{' '}
                <strong>
                  {filteredOperations.reduce(
                    (sum, el) => sum + Number(el.value),
                    0,
                  )}
                </strong>
              </p>
            </div>
          </div>
        ) : null}
      </div>
    </div>
  );
};
