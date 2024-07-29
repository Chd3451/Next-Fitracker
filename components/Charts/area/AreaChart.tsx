// components/Charts/area.tsx
import React from 'react';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

type AreaChartProps = {
  data: {
    clienteCount: number;
    averageWeight: number;
    averageMetaPeso: number;
  };
};

const AreaChart: React.FC<AreaChartProps> = ({ data }) => {
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

  return <Line data={chartData} />;
};

export default AreaChart;
