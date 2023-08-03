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

  const backgroundColors = [
    { name: 'WYPŁATA', value: 'rgba(71, 235, 53, 0.5)' },
    { name: 'POŻYCZKA', value: 'rgba(235, 205, 53, 0.5)' },
    { name: 'OPŁATY', value: 'rgba(255, 99, 132, 0.5)' },
    { name: 'UBRANIA', value: 'rgba(53, 162, 235, 0.5)' },
    { name: 'SPORT', value: 'rgba(236, 130, 10, 0.5)' },
    { name: 'PODRÓŻE', value: 'rgba(5, 47, 222, 0.5)' },
    { name: 'JEDZENIE', value: 'rgba(190, 53, 235, 0.5)' },
    { name: 'ROZRYWKA', value: 'rgba(0, 255, 216, 0.5)' },
  ];

  const labels =
    props.operationType === 'INCOME'
      ? [backgroundColors[0].name, backgroundColors[1].name]
      : [
          backgroundColors[2].name,
          backgroundColors[3].name,
          backgroundColors[4].name,
          backgroundColors[5].name,
          backgroundColors[6].name,
          backgroundColors[7].name,
        ];

  const generateDatasets = () => {
    const data = months.map(() => {
      const values: number[] = [];
      for (const bgColor of backgroundColors) {
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
        backgroundColor: backgroundColors.map((bgColor) => bgColor.value),
        borderColor: backgroundColors.map((bgColor) => bgColor.value),
      };
    });

    return data;
  };

  const data = {
    labels: labels.map((label) => label),
    datasets: generateDatasets(),
  };

  return <Pie data={data} />;
};
