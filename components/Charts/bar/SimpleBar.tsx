// components/Charts/bar.tsx
import React from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

type SimpleBarProps = {
  data: {
    clienteCount: number;
    averageWeight: number;
    averageMetaPeso: number;
  };
};

const SimpleBar: React.FC<SimpleBarProps> = ({ data }) => {
  const chartData = {
    labels: ['Clientes Registrados', 'Peso Promedio', 'Meta de Peso Promedio'],
    datasets: [
      {
        label: 'Datos',
        data: [data.clienteCount, data.averageWeight, data.averageMetaPeso],
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 1,
      },
    ],
  };

  return <Bar data={chartData} />;
};

export default SimpleBar;
