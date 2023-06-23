import React, { SyntheticEvent, useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../contexts/authContext';
import { GoBackButton } from '../common/buttons/GoBackBtn';
import {
  CategoryEntity,
  FilteredOperation,
  Month,
} from '../../types/interfaces';
import { apiUrl } from '../../config/api';
import { ErrorHandler } from '../common/ErrorHandler';

export const DetailsView = () => {
  const userContext = useContext(AuthContext);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | undefined>(undefined);
  const [showOperations, setShowOperations] = useState(false);
  const [selectedYear, setSelectedYear] = useState<string>('');
  const [selectedMonth, setSelectedMonth] = useState<string>('');
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

  const [selectedCategoryId, setSelectedCategoryId] = useState('');
  const isMonthsDisabled = selectedYear === '';

  const months: Month[] = [
    { name: 'Styczeń', value: 1 },
    { name: 'Luty', value: 2 },
    { name: 'Marzec', value: 3 },
    { name: 'Kwiecień', value: 4 },
    { name: 'Maj', value: 5 },
    { name: 'Czerwiec', value: 6 },
    { name: 'Lipiec', value: 7 },
    { name: 'Sierpień', value: 8 },
    { name: 'Wrzesień', value: 9 },
    { name: 'Październik', value: 10 },
    { name: 'Listopad', value: 11 },
    { name: 'Grudzień', value: 12 },
  ];

  const currentYear = new Date().getFullYear();
  const yearsCount = 3;

  const years = [];
  for (let i = currentYear - yearsCount; i <= currentYear + yearsCount; i++) {
    years.push(i);
  }

  const newDate = (date: Date) => {
    return new Date(date).toLocaleDateString('pl-PL', {
      year: 'numeric',
      month: 'long',
    });
  };
  const handleYearChange = (e: any) => {
    const selectedYearValue = e.target.value;
    setSelectedYear(selectedYearValue);

    if (selectedYearValue === '') {
      setSelectedMonth('');
    }
  };

  const handleMonthChange = (e: any) => {
    setSelectedMonth(e.target.value);
  };

  useEffect(() => {
    const controller = new AbortController();
    const signal = controller.signal;
    try {
      (async () => {
        const res = await fetch(`${apiUrl}/categories`, {
          signal,
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
      if (err.name === 'AbortError') {
        console.log('cancelled');
      } else {
        setError(err.message);
      }
    }
    return () => {
      controller.abort();
    };
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
      const data = await res.json();

      if (data) {
        setFilteredOperations(data);
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
    return <h2>Trwa pobieranie operacji...</h2>;
  }

  if (error) {
    return <ErrorHandler message={error} />;
  }

  return (
    <div className="col-6 d-flex justify-content-center border border-white">
      <form className="" onSubmit={checkDetails}>
        <h3>Analizuj wydatki</h3>
        <select
          // className="form-select"
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
        <h4>Wybierz rok:</h4>
        <select
          // className="form-select"
          name="year"
          value={selectedYear}
          onChange={handleYearChange}
        >
          <option value="">--Wybierz--</option>
          {years.map((year) => (
            <option key={year} value={year}>
              {year}
            </option>
          ))}
        </select>
        <h4>Wybierz miesiąc:</h4>
        <select
          // className="form-select"
          name="month"
          value={selectedMonth}
          disabled={isMonthsDisabled}
          onChange={handleMonthChange}
        >
          <option value="">--Wybierz--</option>
          {months.map((month) => (
            <option key={month.name} value={month.value}>
              {month.name}
            </option>
          ))}
        </select>
        <button className="btn btn-primary w-50">Wybierz</button>
        <GoBackButton />
      </form>
      {showOperations ? (
        <div className="details-list d-flex col mt-5 border">
          <div className="col">
            <table className="table table-striped text-white">
              <thead>
                <tr>
                  <th scope="col">Nazwa</th>
                  <th scope="col">Wartość</th>
                  <th scope="col">Data</th>
                </tr>
              </thead>
              {filteredOperations.map((el) => (
                <tbody key={el.id}>
                  <tr>
                    <td>{el.name}</td>
                    <td>{el.value}</td>
                    <td>{newDate(el.createdAt)}</td>
                  </tr>
                </tbody>
              ))}
            </table>
          </div>
          <div className="col">
            <p className="text-center text">
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
      {/*<DonughtChart />*/}
    </div>
  );
};
