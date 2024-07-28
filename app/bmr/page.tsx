import { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import { Card, DonutChart, Title } from '@tremor/react';

const valueFormatter = (number: number) => `${new Intl.NumberFormat('us').format(number).toString()}g`;

const BMRPage = () => {
  const [formData, setFormData] = useState({
    clienteId: '',
    peso: '',
    altura: '',
    edad: '',
    genero: '',
    actividad: 'sedentario',
    objetivo: 'mantener peso', // Añadir objetivo por defecto
  });
  const [resultados, setResultados] = useState(null);
  const searchParams = useSearchParams();

  useEffect(() => {
    const clientId = searchParams.get('clienteId');
    if (clientId) {
      // Fetch client data
      fetch(`/api/cliente?id=${clientId}`)
        .then((response) => response.json())
        .then((data) => {
          setFormData({
            clienteId: clientId,
            peso: data.peso,
            altura: data.altura,
            edad: data.edad,
            genero: data.genero,
            actividad: 'sedentario',
            objetivo: 'mantener peso', // Añadir objetivo por defecto
          });
        });
    }
  }, [searchParams]);

  const calcularBMR = async () => {
    try {
      const res = await fetch('/api/bmr', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      setResultados(data);
    } catch (error) {
      console.error('Error al calcular BMR:', error);
    }
  };

  const imprimirReporte = () => {
    window.print();
  };

  const data = resultados
    ? [
        { name: 'Proteínas', value: resultados.proteinas },
        { name: 'Carbohidratos', value: resultados.carbohidratos },
        { name: 'Grasas', value: resultados.grasas },
      ]
    : [];

  return (
    <div className="max-w-2xl mx-auto mt-8 p-4 bg-white shadow-md rounded-lg">
      <h1 className="text-2xl font-bold mb-4">Calculadora BMR</h1>
      {resultados && (
        <Card className="mt-6">
          <Title>Resultado de BMR</Title>
          <p>BMR: {resultados.bmr} kcal</p>
          <p>Calorías: {resultados.calorias} kcal</p>
          <DonutChart
            className="mt-6"
            data={data}
            category="value"
            index="name"
            valueFormatter={valueFormatter}
            colors={["slate", "violet", "indigo"]}
          />
          <button
            onClick={imprimirReporte}
            className="mt-4 p-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            Imprimir Reporte
          </button>
        </Card>
      )}
      <div className="mt-6">
        <button
          onClick={calcularBMR}
          className="w-full p-2 bg-green-500 text-white rounded hover:bg-green-600"
        >
          Calcular BMR
        </button>
      </div>
    </div>
  );
};

export default BMRPage;


