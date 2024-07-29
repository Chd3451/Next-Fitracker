"use client";

import React, { useEffect, useState } from "react";
import DataCard from "../Cards/DataCard";
import AreaChart from "../Charts/area";
import SimpleBar from "../Charts/bar"; // Asegúrate de que el componente SimpleBar esté bien definido

const ECommerce: React.FC = () => {
  const [data, setData] = useState<any>({
    clienteCount: 0,
    averageWeight: 0,
    averageMetaPeso: 0,
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('/api/dashboard-data');
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const result = await response.json();
        setData(result);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-6 xl:grid-cols-3 2xl:gap-7.5">
      <DataCard
          name="Clientes Registrados"
          amount={data.clienteCount}
          percentageChange={15} // Ajusta según tus datos
          currentValue={data.clienteCount}
          totalValue={1000} // Ajusta según tus datos
          progress={15} // Ajusta según tus datos
        />
        <DataCard
          name="Peso Promedio"
          amount={data.averageWeight.toFixed(2)}
          percentageChange={10} // Ajusta según tus datos
          currentValue={data.averageWeight.toFixed(2)}
          totalValue={150} // Ajusta según tus datos
          progress={25} // Ajusta según tus datos
        />
        <DataCard
          name="Meta de Peso Promedio"
          amount={data.averageMetaPeso.toFixed(2)}
          percentageChange={5} // Ajusta según tus datos
          currentValue={data.averageMetaPeso.toFixed(2)}
          totalValue={200} // Ajusta según tus datos
          progress={20} // Ajusta según tus datos
        />
      </div>
      <div className="space-y-5 py-5">
        <AreaChart data={data} />
        <SimpleBar data={data} /> {/* Asegúrate de que SimpleBar acepte los datos */}
      </div>
    </>
  );
};

export default ECommerce;
