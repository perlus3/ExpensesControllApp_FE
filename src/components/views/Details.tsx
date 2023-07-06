import React, { SyntheticEvent, useEffect, useState } from 'react';
import { Button, Modal } from 'react-bootstrap';
import { Month, NewOperationData } from '../../types/interfaces';
import { apiUrl } from '../../config/api';
import { ErrorHandler } from '../common/ErrorHandler';
import { DoughnutChart } from '../charts/DoughnutChart';
import { DetailsView } from './DetailsView';
import { LogoutFunction } from '../logout/Logout';
import { useNavigate } from 'react-router-dom';

interface Props {
  accountId: string | undefined;
}

export const Details = ({ accountId }: Props) => {
  const navigate = useNavigate();
  const [error, setError] = useState<string | undefined>(undefined);
  const [loading, setLoading] = useState(false);
  const [insertedDates, setInsertedDates] = useState<string[]>(['']);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [selectedYear, setSelectedYear] = useState<string>('');
  const [selectedMonth, setSelectedMonth] = useState<string>('');
  const [cashReport, setCashReport] = useState({
    income: 0,
    expenses: 0,
  });
  const [render, setRender] = useState<boolean>(false);
  const [dataAvailable, setDataAvailable] = useState<boolean>(false);

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

  useEffect(() => {
    try {
      (async () => {
        const res = await fetch(`${apiUrl}/operations/all/${accountId}`, {
          method: 'GET',
          credentials: 'include',
          headers: {
            'Content-Type': 'application/json',
          },
        });
        const data = await res.json();
        if (data.statusCode === 401) {
          LogoutFunction();
          navigate('/login');
        }
        const operationDates = data.map((el: NewOperationData) =>
          new Date(el.createdAt).getFullYear(),
        );
        const dates: Set<string> = new Set(operationDates);
        const datesArray: string[] = Array.from(dates);

        setInsertedDates(datesArray);
      })();
    } catch (err: any) {
      setError(err.message);
    }
  }, []);

  const changePeriodFilter = (e: SyntheticEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      (async () => {
        const res = await fetch(
          `${apiUrl}/operations/total/report?year=${selectedYear}&month=${selectedMonth}`,
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
          LogoutFunction();
          navigate('/login');
        }
        if (!data.id) {
          setError(data.message);
        }
        if (data.income === 0 && data.expenses === 0) {
          setDataAvailable(true);
        }
        setCashReport(data);
        setRender(true);
      })();
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <h2>Trwa pobieranie danych...</h2>;
  }

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

  const handleStatusChange = (status: boolean) => {
    setRender(status);
    setDataAvailable(status);
  };

  if (error) {
    return <ErrorHandler message={error} />;
  }

  return render ? (
    <div className="d-flex justify-content-center">
      <div className="pb-2">
        <div className="d-flex justify-content-center">
          <h5 className="mb-2">Okres analizy:</h5>
        </div>
        <div className="d-flex justify-content-center">
          <p>
            {`${
              selectedMonth
                ? months.find((el) => el.value === Number(selectedMonth))?.name
                : 'rok'
            } ${new Date(selectedYear).getFullYear()}`}
          </p>
        </div>
        {!dataAvailable ? (
          <div className="d-flex justify-content-center">
            <div className="d-flex justify-content-center chart">
              <DoughnutChart
                income={cashReport.income}
                expenses={cashReport.expenses}
              />
            </div>
          </div>
        ) : (
          <p className="text-center text-danger">Brak danych</p>
        )}
        <div className="row d-flex justify-content-center pt-1">
          <div className="row">
            <div className="col-6">
              <Button
                className="btn btn-secondary smaller-button"
                onClick={() => handleStatusChange(false)}
              >
                Powrót
              </Button>
            </div>
            <div className="col-6">
              <Button
                className="btn btn-primary smaller-button"
                onClick={() => setModalIsOpen(true)}
              >
                Szczegóły
              </Button>
            </div>
          </div>
          <Modal
            show={modalIsOpen}
            onHide={() => setModalIsOpen(false)}
            dialogClassName="custom-modal-width"
          >
            <Modal.Header closeButton>
              <Modal.Title>
                Szczegóły dla{' '}
                {`${
                  selectedMonth
                    ? months
                        .find((el) => el.value === Number(selectedMonth))
                        ?.name.toLowerCase()
                    : 'rok'
                } ${new Date(selectedYear).getFullYear()}`}{' '}
              </Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <DetailsView
                selectedMonth={selectedMonth}
                selectedYear={selectedYear}
              />
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={() => setModalIsOpen(false)}>
                Zamknij
              </Button>
            </Modal.Footer>
          </Modal>
        </div>
      </div>
    </div>
  ) : (
    <div className="col d-flex flex-column justify-content-center">
      <div className="row">
        <div className="col d-flex justify-content-center"></div>
      </div>
      <div className="row">
        <div className="col-12">
          <form onSubmit={changePeriodFilter}>
            <div className="row border-bottom border-dark d-flex justify-content-center text-center">
              <h5 className="m-2">Analizuj operacje</h5>
            </div>
            <div className="d-flex flex-column justify-content-center align-items-center">
              <div className="col">
                <p className="my-1 fw-bold text-center">Wybierz rok:</p>
                <select
                  className="form-select"
                  name="year"
                  value={selectedYear}
                  onChange={handleYearChange}
                >
                  <option value="">--Wybierz--</option>
                  {insertedDates.map((year) => (
                    <option key={year} value={year}>
                      {year}
                    </option>
                  ))}
                </select>
              </div>
              <div className="col">
                <p className="my-1 fw-bold text-center">Wybierz miesiąc:</p>
                <select
                  className="form-select"
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
              </div>
            </div>
            <div className="me-3 d-flex justify-content-center">
              <button
                disabled={!selectedYear}
                className="btn btn-primary my-2 smaller-button"
              >
                Sprawdź!
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
