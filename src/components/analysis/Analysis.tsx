import React, { ChangeEvent, useContext, useEffect, useState } from 'react';
import { UserAccountsContext } from '../../context/UserAccountsContext';
import { AccountsList } from '../views/AccountsList';
import { useNavigate } from 'react-router-dom';
import { apiUrl } from '../../config/api';
import { ErrorHandler } from '../common/ErrorHandler';
import { NewOperationData, OperationType } from '../../types/interfaces';
import { Header } from '../header/Header';
import { Spinner } from '../common/spinner/Spinner';
import { BarChart } from '../charts/BarChart';
import { months } from '../views/Details';
import { PieChart } from '../charts/PieChart';

export const Analysis = () => {
  const accountsContext = useContext(UserAccountsContext);
  const navigate = useNavigate();
  const [selectedAccountId, setSelectedAccountId] = useState<string>('');
  const [accountOperations, setAccountOperations] = useState<
    NewOperationData[]
  >([]);
  const [error, setError] = useState<string | undefined>(undefined);
  const [loading, setLoading] = useState(false);
  const [operationsYears, setOperationsYears] = useState<string[]>(['']);
  const [selectedYear, setSelectedYear] = useState<string>('');
  const [selectedMonth, setSelectedMonth] = useState<number>(0);
  const [operationType, setOperationType] = useState<
    OperationType | string | null
  >(null);

  useEffect(() => {
    if (!accountsContext?.accounts) {
      setLoading(true);
      (async () => {
        try {
          const res = await fetch(`${apiUrl}/accounts/all`, {
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
          accountsContext?.setAccounts(data);
        } catch (err: any) {
          setError(err.message);
        } finally {
          setLoading(false);
        }
      })();
    }
  }, []);

  useEffect(() => {
    if (selectedAccountId) {
      setLoading(true);
      (async () => {
        try {
          const res = await fetch(
            `${apiUrl}/operations/all/${selectedAccountId}`,
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
          const operationDates = data.map((el: NewOperationData) =>
            new Date(el.updatedAt).getFullYear(),
          );
          const years: Set<string> = new Set(operationDates);
          const yearsArray: string[] = Array.from(years);

          setOperationsYears(yearsArray);
          setAccountOperations(data);
        } catch (err: any) {
          setError(err.message);
        } finally {
          setLoading(false);
        }
      })();
    }
  }, [selectedAccountId]);

  if (error) {
    return <ErrorHandler message={error} />;
  }

  if (loading) {
    return <Spinner />;
  }

  const openAccountAnalysis = (accountId: string) => {
    setSelectedAccountId(accountId);
  };

  const handleYearChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedYearValue = e.target.value;
    setSelectedYear(selectedYearValue);
  };

  const handleMonthChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedMonthValue = Number(e.target.value);
    setSelectedMonth(selectedMonthValue);
  };

  const handleOperationTypeChange = (e: ChangeEvent<HTMLInputElement>) => {
    setOperationType(e.target.value);
  };

  const getAccountName = accountOperations
    .map((el) => el.byUserAccount?.name)
    .find((name) => name !== undefined);

  return (
    <div className="container-fluid background-color p-0 vh-100">
      <Header />
      <div className="row">
        <div className="col-12">
          <h1 className="text-center mt-3">Wybierz konto do analizy:</h1>
        </div>
        <div className="col-12">
          <AccountsList
            accounts={accountsContext?.accounts}
            onSubmitEvent={openAccountAnalysis}
          />
        </div>
      </div>
      {selectedAccountId !== '' && (
        <div className="background-color">
          <div className="row justify-content-center mt-4">
            {getAccountName ? (
              <h5 className="text-center">
                Wybrane konto:
                <p className="account-name">{getAccountName?.toUpperCase()}</p>
              </h5>
            ) : (
              <p className="text-center text-danger">Brak operacji na koncie</p>
            )}
            {getAccountName && (
              <div className="col-12 col-md-3 text-center mb-3">
                <p className="">Wybierz rok:</p>
                <select
                  className="form-select-sm"
                  name="year"
                  value={selectedYear}
                  onChange={handleYearChange}
                >
                  <option hidden value="#">
                    --Wybierz rok--
                  </option>
                  {operationsYears.map((year) => (
                    <option key={year} value={year}>
                      {year}
                    </option>
                  ))}
                </select>
              </div>
            )}
            {getAccountName && (
              <div className="col-12 col-md-3 text-center mb-3">
                <p className="">Wybierz rodzaj operacji:</p>
                <div className="form-check form-check-inline">
                  <label className="form-check-label mx-1">
                    <input
                      type="radio"
                      className="form-check-input"
                      name="operationType"
                      value={OperationType.INCOME}
                      checked={operationType === OperationType.INCOME}
                      onChange={handleOperationTypeChange}
                    />
                    Przychód
                  </label>
                </div>
                <div className="form-check form-check-inline">
                  <label className="form-check-label mx-1 ">
                    <input
                      type="radio"
                      className="form-check-input"
                      name="operationType"
                      value={OperationType.EXPENSE}
                      checked={operationType === OperationType.EXPENSE}
                      onChange={handleOperationTypeChange}
                    />
                    Wydatek
                  </label>
                </div>
              </div>
            )}
            <div className="row justify-content-center m-0">
              {getAccountName && (
                <div className="d-md-none background-color chart-div">
                  <div className="col-12 col-md-3 text-center mb-3">
                    <p className="">Wybierz miesiąc:</p>
                    <select
                      className="form-select-sm custom-select"
                      name="month"
                      value={selectedMonth}
                      onChange={handleMonthChange}
                    >
                      <option hidden value="#">
                        --Wybierz miesiąc--
                      </option>
                      {months.map((month) => (
                        <option key={month.name} value={month.value}>
                          {month.name}
                        </option>
                      ))}
                    </select>
                  </div>
                  <PieChart
                    operationsData={accountOperations}
                    year={selectedYear}
                    month={selectedMonth}
                    operationType={operationType}
                  />
                </div>
              )}
              {getAccountName && (
                <div className="d-none d-md-block">
                  <div className="d-flex justify-content-center">
                    <div className="d-flex justify-content-center bar-chart">
                      <BarChart
                        operationsData={accountOperations}
                        year={selectedYear}
                        operationType={operationType}
                      />
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
