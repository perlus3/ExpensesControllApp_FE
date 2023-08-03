import React, { SyntheticEvent, useState } from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';
import { NewOperationData } from '../../types/interfaces';
import { months } from '../views/Details';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
);

interface Props {
  data: NewOperationData[];
  years: string[];
}

export const BarChart = (props: Props) => {
  const [selectedYear, setSelectedYear] = useState<string>('');
  const [filteredData, setFilteredData] = useState<NewOperationData[]>([]);

  const handleYearChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedYearValue = e.target.value;
    setSelectedYear(selectedYearValue);
  };

  const filterOperationsByMonths = (
    data: NewOperationData[],
    months: number[],
  ) => {
    return data.filter((operation) => {
      const month = new Date(operation.updatedAt).getMonth() + 1;
      return months.includes(month);
    });
  };

  const filterOperationsByYear = (data: NewOperationData[], year: string) => {
    return data.filter((operation) => {
      const operationYear = new Date(operation.updatedAt)
        .getFullYear()
        .toString();
      return operationYear === year;
    });
  };

  const changeYearFilter = (e: SyntheticEvent) => {
    e.preventDefault();

    const filteredByYear = filterOperationsByYear(props.data, selectedYear);

    const monthsNumbers = Array.from(
      new Set(
        filteredByYear.map((op) => new Date(op.updatedAt).getMonth() + 1),
      ),
    );

    const filteredData = filterOperationsByMonths(
      filteredByYear,
      monthsNumbers,
    );
    setFilteredData(filteredData);
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top' as const,
      },
      title: {
        display: true,
        text: `Rok ${selectedYear}`,
      },
    },
  };

  const monthsData = months.map((month) => ({
    name: month.name,
    value: month.value,
    data: new Map<string, number>(),
  }));

  const operationsMonthsNumbers = props.data.map(
    (el) => new Date(el.updatedAt).getMonth() + 1,
  );

  const filteredMonths = months.filter((month) =>
    operationsMonthsNumbers.includes(month.value),
  );

  const monthNames = filteredMonths.map((month) => month.name);

  const filteredMonthsData = monthsData.filter((month) =>
    monthNames.includes(month.name),
  );

  const prepareChartData = (data: NewOperationData[]) => {
    data.forEach((operation) => {
      const monthValue = new Date(operation.updatedAt).getMonth() + 1;
      const monthIndex = filteredMonthsData.findIndex(
        (month) => month.value === monthValue,
      );
      if (monthIndex !== -1) {
        const categorySum =
          filteredMonthsData[monthIndex].data.get(operation.category.name) || 0;
        filteredMonthsData[monthIndex].data.set(
          operation.category.name,
          categorySum + Number(operation.value),
        );
      }
    });

    const uniqueLabels = Array.from(
      new Set(data.map((operation) => operation.category.name)),
    );

    const backgroundColors = [
      { name: 'Opłaty', value: 'rgba(255, 99, 132, 0.5)' },
      { name: 'Ubrania', value: 'rgba(53, 162, 235, 0.5)' },
      { name: 'Wypłata', value: 'rgba(71, 235, 53, 0.5)' },
      { name: 'Pożyczka', value: 'rgba(235, 205, 53, 0.5)' },
      { name: 'Sport', value: 'rgba(236, 130, 10, 0.5)' },
      { name: 'Podróże', value: 'rgba(5, 47, 222, 0.5)' },
      { name: 'Jedzenie', value: 'rgba(190, 53, 235, 0.5)' },
      { name: 'Rozrywka', value: 'rgba(0, 255, 216, 0.5)' },
    ];

    const getBackgroundColor = (i: number) =>
      backgroundColors[i % backgroundColors.length].value;

    const chartData = {
      labels: months.map((month) => month.name),
      datasets: uniqueLabels.map((label, index) => {
        const data = filteredMonthsData.map(
          (month) => month.data.get(label) || 0,
        );
        return {
          label,
          data,
          backgroundColor: getBackgroundColor(index),
        };
      }),
    };

    return chartData;
  };

  const dataToUse = filteredData.length ? filteredData : props.data;

  const chartData = prepareChartData(dataToUse);

  return (
    <div className="bg-white">
      <div className="row">
        <div className="d-flex flex-column justify-content-center align-items-center">
          <form onSubmit={changeYearFilter}>
            <p className="my-1 fw-bold text-center">Wybierz rok:</p>
            <select
              className="form-select-sm"
              name="year"
              value={selectedYear}
              onChange={handleYearChange}
            >
              <option value="">--Wybierz--</option>
              {props.years.map((year) => (
                <option key={year} value={year}>
                  {year}
                </option>
              ))}
            </select>
            <div className="d-flex justify-content-center mt-1">
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
      <div className="row">
        <Bar options={options} data={chartData} />
      </div>
    </div>
  );
};
