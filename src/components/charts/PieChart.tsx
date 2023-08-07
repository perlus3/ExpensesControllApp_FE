import React from 'react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Pie } from 'react-chartjs-2';
import { NewOperationData, OperationType } from '../../types/interfaces';
import { months } from '../views/Details';

ChartJS.register(ArcElement, Tooltip, Legend);

interface Props {
  operationsData: NewOperationData[];
  year: string;
  month: number;
  operationType: OperationType | string | null;
}

export const PieChart = (props: Props) => {
  const currentYear = Number(new Date().getFullYear());
  const currentMonth = Number(new Date().getMonth() + 1);

  const labels =
    props.operationType === 'INCOME'
      ? [
          { name: 'WYPŁATA', value: 'rgba(71, 235, 53, 0.5)' },
          { name: 'POŻYCZKA', value: 'rgba(235, 205, 53, 0.5)' },
        ]
      : [
          { name: 'OPŁATY', value: 'rgba(255, 99, 132, 0.5)' },
          { name: 'UBRANIA', value: 'rgba(53, 162, 235, 0.5)' },
          { name: 'SPORT', value: 'rgba(236, 130, 10, 0.5)' },
          { name: 'PODRÓŻE', value: 'rgba(5, 47, 222, 0.5)' },
          { name: 'JEDZENIE', value: 'rgba(190, 53, 235, 0.5)' },
          { name: 'ROZRYWKA', value: 'rgba(0, 255, 216, 0.5)' },
        ];

  const legendLabels = labels.map((bgColor) => ({
    text: bgColor.name,
    fillStyle: bgColor.value,
  }));

  const generateDatasets = () => {
    const data = months.map(() => {
      const values: number[] = [];
      for (const bgColor of labels) {
        const filteredOperations = props.operationsData.filter(
          (operation) =>
            operation.operationType === props.operationType &&
            new Date(operation.updatedAt).getMonth() + 1 ===
              (props.month || currentMonth) &&
            new Date(operation.updatedAt).getFullYear() ===
              (Number(props.year) || currentYear) &&
            operation.category.name === bgColor.name,
        );

        const totalValue = filteredOperations.reduce(
          (total, operation) => total + Number(operation.value),
          0,
        );

        values.push(totalValue);
      }

      return {
        data: values,
        backgroundColor: labels.map((bgColor) => bgColor.value),
        borderColor: labels.map((bgColor) => bgColor.value),
      };
    });

    return data;
  };

  const selectedBackgroundColors = labels.filter((bgColor) =>
    props.operationType === 'INCOME'
      ? ['WYPŁATA', 'POŻYCZKA'].includes(bgColor.name)
      : [
          'OPŁATY',
          'UBRANIA',
          'SPORT',
          'PODRÓŻE',
          'JEDZENIE',
          'ROZRYWKA',
        ].includes(bgColor.name),
  );

  const data = {
    labels: selectedBackgroundColors.map((bgColor) => bgColor.name),
    datasets: generateDatasets(),
  };
  const options = {
    plugins: {
      legend: {
        labels: {
          generateLabels: (chart: any) => {
            return legendLabels;
          },
        },
      },
    },
  };

  return <Pie data={data} options={options} />;
};
