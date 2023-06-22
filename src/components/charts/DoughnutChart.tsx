import React from 'react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';

ChartJS.register(ArcElement, Tooltip, Legend);

interface Props {
  income: number;
  expenses: number;
}

export const DoughnutChart = (props: Props) => {
  const data = {
    labels: ['Przychód', 'Wydatki'],
    datasets: [
      {
        label: 'Suma operacji',
        data: [props.income, props.expenses],
        backgroundColor: ['rgba(95,206,37,0.2)', 'rgba(255, 99, 132, 0.2)'],
        borderColor: ['rgb(74,189,61)', 'rgba(255, 99, 132, 1)'],
        hoverBackgroundColor: ['#64af29', '#FF6384'],
        borderWidth: 1,
      },
    ],
  };
  return <Doughnut data={data} />;
};
