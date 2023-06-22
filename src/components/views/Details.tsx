import React, { SyntheticEvent, useContext, useState } from 'react';
import { Month } from '../../types/interfaces';
import { apiUrl } from '../../config/api';
import { AuthContext } from '../../contexts/authContext';
import { ErrorHandler } from '../common/ErrorHandler';
import { DoughnutChart } from '../charts/DoughnutChart';

export const Details = () => {
  const userContext = useContext(AuthContext);
  const [error, setError] = useState<string | undefined>(undefined);
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

  const currentYear = new Date().getFullYear();
  const yearsCount = 3;

  const years = [];
  for (let i = currentYear - yearsCount; i <= currentYear + yearsCount; i++) {
    years.push(i);
  }
  const changePeriodFilter = (e: SyntheticEvent) => {
    e.preventDefault();
    try {
      (async () => {
        const res = await fetch(
          `${apiUrl}/operations/total/report?year=${selectedYear}&month=${selectedMonth}`,
          {
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
        console.log(data);
        setCashReport(data);
        setRender(true);
      })();
    } catch (error: any) {
      setError(error.message);
    }
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

  if (error) {
    return <ErrorHandler message={error} />;
  }

  console.log(
    new Date(selectedMonth).getMonth() + 1,
    new Date(selectedYear).getFullYear(),
  );

  return render ? (
    <div className="col-6 d-flex flex-column justify-content-center border border-white">
      <div className="col-12">
        <p className="text-white">Okres analizy:</p>
        <p className="text-white">
          {`${
            selectedMonth
              ? months.find((el) => el.value === Number(selectedMonth))?.name
              : 'rok'
          } ${new Date(selectedYear).getFullYear()}`}
        </p>
      </div>

      <DoughnutChart
        income={cashReport.income}
        expenses={cashReport.expenses}
      />
    </div>
  ) : (
    <div className="col-6 d-flex flex-column justify-content-center border border-white">
      <div className="row">
        <div className="col d-flex justify-content-center"></div>
      </div>
      <div className="row">
        <div className="col-12">
          <form onSubmit={changePeriodFilter}>
            <div className="row border-bottom d-flex justify-content-center">
              <p className="text-white m-2 fs-4">Analizuj wpływy i wydatki</p>
            </div>
            <div className="d-flex mt-2">
              <div className="me-3">
                <p className="text-white">Wybierz rok:</p>
                <select
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
              </div>
              <div className="me-3">
                <p className="text-white">Wybierz miesiąc:</p>
                <select
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
              <button className="btn btn-primary w-25 mb-2">Check!</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
