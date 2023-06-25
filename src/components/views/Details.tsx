import React, { SyntheticEvent, useContext, useEffect, useState } from 'react';
import { Button, Modal } from 'react-bootstrap';
import { Month, NewOperationData } from '../../types/interfaces';
import { apiUrl } from '../../config/api';
import { AuthContext } from '../../contexts/authContext';
import { ErrorHandler } from '../common/ErrorHandler';
import { DoughnutChart } from '../charts/DoughnutChart';
import { DetailsView } from './DetailsView';

interface Props {
  accountId: string;
}

export const Details = ({ accountId }: Props) => {
  const userContext = useContext(AuthContext);
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
  const [render, setRender] = useState(false);

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
        const operations = await fetch(
          `${apiUrl}/operations/all/${accountId}`,
          {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${userContext?.token}`,
            },
          },
        );
        const operationsData = await operations.json();
        const operationDates = operationsData.map((el: NewOperationData) =>
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

    const controller = new AbortController();
    const signal = controller.signal;
    try {
      (async () => {
        const res = await fetch(
          `${apiUrl}/operations/total/report?year=${selectedYear}&month=${selectedMonth}`,
          {
            signal,
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${userContext?.token}`,
            },
          },
        );

        const data = await res.json();
        if (!data.id) {
          setError(data.message);
        }
        setCashReport(data);
        setRender(true);
      })();
    } catch (err: any) {
      setError(err.message);
      if (err.name === 'AbortError') {
        console.log('cancelled');
      } else {
        setError(err.message);
      }
    } finally {
      setLoading(false);
    }
    return () => {
      controller.abort();
    };
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

  if (error) {
    return <ErrorHandler message={error} />;
  }

  return render ? (
    <div className="col-5 ">
      <div className="border border-white pb-2 rounded-3">
        <div className="d-flex justify-content-center">
          <p className="text-white mb-2">Okres analizy:</p>
        </div>
        <div className="d-flex justify-content-center">
          <p className="text-white">
            {`${
              selectedMonth
                ? months.find((el) => el.value === Number(selectedMonth))?.name
                : 'rok'
            } ${new Date(selectedYear).getFullYear()}`}
          </p>
        </div>
        <div className="d-flex justify-content-center">
          <div className="d-flex justify-content-center chart">
            <DoughnutChart
              income={cashReport.income}
              expenses={cashReport.expenses}
            />
          </div>
        </div>
        <div className="d-flex justify-content-center pt-2">
          <Button
            className="btn btn-primary"
            onClick={() => setModalIsOpen(true)}
          >
            Szczegóły
          </Button>
          <Modal
            show={modalIsOpen}
            onHide={() => setModalIsOpen(false)}
            dialogClassName="custom-modal-width"
          >
            <Modal.Header closeButton>
              <Modal.Title>Szczegóły</Modal.Title>
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
    <div className="col-5 d-flex rounded-3 flex-column justify-content-center border border-white">
      <div className="row">
        <div className="col d-flex justify-content-center"></div>
      </div>
      <div className="row">
        <div className="col-12">
          <form onSubmit={changePeriodFilter}>
            <div className="row border-bottom d-flex justify-content-center">
              <p className="text-white m-2 fs-4">Analizuj wpływy i wydatki</p>
            </div>
            <div className="d-flex mt-3">
              <div className="mx-2">
                <p className="text-white">Wybierz rok:</p>
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
              <div>
                <p className="text-white">Wybierz miesiąc:</p>
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
            <div className="me-3 d-flex justify-content-center pt-3">
              <button
                disabled={!selectedYear}
                className="btn btn-primary w-25 mb-2"
              >
                Check!
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
