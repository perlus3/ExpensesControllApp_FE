import React, { SyntheticEvent, useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../contexts/authContext';
import {
  CategoryEntity,
  FilteredOperation,
  NewOperationData,
} from '../../types/interfaces';
import { apiUrl } from '../../config/api';
import { ErrorHandler } from '../common/ErrorHandler';

interface Props {
  selectedMonth?: string;
  selectedYear?: string;
}

export const DetailsView = ({ selectedMonth, selectedYear }: Props) => {
  const userContext = useContext(AuthContext);
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
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${userContext?.token}`,
          },
        },
      );
      const operationsData = await res.json();
      const operationDates = operationsData.map((el: NewOperationData) => {
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

      if (operationsData) {
        setFilteredOperations(operationDates);
        setShowOperations(true);
      }
      if (!operationsData) {
        setError(operationsData.message);
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
    return <h2>Trwa pobieranie operacji...</h2>;
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
                    <th scope="col">Nazwa</th>
                    <th scope="col">Wartość</th>
                    <th scope="col">Data</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredOperations.map((el) => (
                    <tr key={el.id}>
                      <td>{el.name}</td>
                      <td>{el.value}</td>
                      <td>{el.fullDate}</td>
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
