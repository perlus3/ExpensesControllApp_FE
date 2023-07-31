import React, { SyntheticEvent, useEffect, useState } from 'react';
import {
  CategoryEntity,
  FilteredOperation,
  NewOperationData,
} from '../../types/interfaces';
import { apiUrl } from '../../config/api';
import { ErrorHandler } from '../common/ErrorHandler';
import { useNavigate } from 'react-router-dom';
import { Spinner } from '../common/spinner/Spinner';

interface Props {
  selectedMonth?: string;
  selectedYear?: string;
}

export const DetailsView = ({ selectedMonth, selectedYear }: Props) => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | undefined>(undefined);
  const [showOperations, setShowOperations] = useState(false);
  const [categories, setCategories] = useState<CategoryEntity[]>([]);
  const [filteredOperations, setFilteredOperations] = useState<
    FilteredOperation[]
  >([
    {
      id: '',
      name: '',
      value: 0,
      fullDate: '',
    },
  ]);

  const [selectedCategoryId, setSelectedCategoryId] = useState('');

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
    } catch (err: any) {
      setError(err.message);
    }
  }, []);

  const checkDetails = async (e: SyntheticEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch(
        `${apiUrl}/categories/all/${selectedCategoryId}?year=${selectedYear}&month=${selectedMonth}`,
        {
          method: 'GET',
          credentials: 'include',
          headers: {
            'Content-Type': 'application/json',
          },
        },
      );
      const data = await res.json();
      if (data.statusCode === 401) {
        navigate('/login');
      }
      const operationDates = data.map((el: NewOperationData) => {
        const date = new Date(el.createdAt).toLocaleDateString('pl-PL', {
          day: 'numeric',
          month: 'long',
          year: 'numeric',
        });
        return {
          ...el,
          fullDate: date,
        };
      });

      if (data) {
        setFilteredOperations(operationDates);
        setShowOperations(true);
      }
      if (!data) {
        setError(data.message);
      }
    } catch (e: any) {
      setError('Aby kontynuować musisz wybrać kategorie operacji!');
    } finally {
      setLoading(false);
    }
  };

  const handleCategoryIdChange = (e: any) => {
    setSelectedCategoryId(e.target.value);
  };

  if (loading) {
    return <Spinner />;
  }

  if (error) {
    return <ErrorHandler message={error} />;
  }

  return (
    <>
      <div className="d-flex justify-content-center">
        <div className="row">
          <form className="" onSubmit={checkDetails}>
            <h3>Analizuj wybrane kategorie</h3>
            <select
              className="form-select"
              name="categoryId"
              value={selectedCategoryId}
              onChange={handleCategoryIdChange}
            >
              <option value="">--Wybierz kategorie--</option>
              {categories.map((category) => (
                <option key={category.id} value={category.id}>
                  {category.name}
                </option>
              ))}
            </select>
            <div className="row pt-3">
              <div className="d-flex justify-content-center">
                <button className="btn btn-primary">Wybierz</button>
              </div>
            </div>
          </form>
        </div>
      </div>

      {showOperations ? (
        <div className="container mt-4">
          {' '}
          <div className="row">
            <div className="col">
              <table className="table table-striped">
                <thead>
                  <tr>
                    <th scope="col">Data</th>
                    <th scope="col">Nazwa</th>
                    <th scope="col">Wartość</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredOperations.map((el) => (
                    <tr key={el.id}>
                      <td>{el.fullDate}</td>
                      <td>{el.name}</td>
                      <td>{el.value}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
};
