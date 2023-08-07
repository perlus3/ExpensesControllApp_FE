import React from 'react';
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
import { months } from '../views/Details';
import { NewOperationData, OperationType } from '../../types/interfaces';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
);

interface Props {
  operationsData: NewOperationData[];
  year: string;
  operationType: OperationType | string | null;
}
export const BarChart = (props: Props) => {
  const currentYear = Number(new Date().getFullYear());

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top' as const,
      },
      title: {
        display: true,
        text: `Wykres dla roku ${props.year !== '' ? props.year : currentYear}`,
      },
    },
  };

  const backgroundColors = [
    { name: 'OPŁATY', value: 'rgba(255, 99, 132, 0.5)' },
    { name: 'UBRANIA', value: 'rgba(53, 162, 235, 0.5)' },
    { name: 'WYPŁATA', value: 'rgba(71, 235, 53, 0.5)' },
    { name: 'POŻYCZKA', value: 'rgba(235, 205, 53, 0.5)' },
    { name: 'SPORT', value: 'rgba(236, 130, 10, 0.5)' },
    { name: 'PODRÓŻE', value: 'rgba(5, 47, 222, 0.5)' },
    { name: 'JEDZENIE', value: 'rgba(190, 53, 235, 0.5)' },
    { name: 'ROZRYWKA', value: 'rgba(0, 255, 216, 0.5)' },
  ];

  const labels = months.map((month) => month.name);
  const generateDatasets = () => {
    return backgroundColors.map((bgColor) => {
      const data = months.map((month) => {
        const filteredOperations = props.operationsData.filter(
          (operation) =>
            operation.operationType === props.operationType &&
            new Date(operation.updatedAt).getMonth() + 1 === month.value &&
            new Date(operation.updatedAt).getFullYear() ===
              (Number(props.year) || currentYear) &&
            operation.category.name === bgColor.name,
        );

        const totalValue = filteredOperations.reduce(
          (total, operation) => total + Number(operation.value),
          0,
        );

        return totalValue;
      });

      return {
        label: bgColor.name,
        data,
        backgroundColor: bgColor.value,
      };
    });
  };

  const data = {
    labels: labels,
    datasets: generateDatasets(),
  };

  return <Bar options={options} data={data} />;
};
