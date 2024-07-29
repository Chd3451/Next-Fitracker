'use client';
import { useState } from 'react';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import { Chart, registerables } from 'chart.js';
import { Bar } from 'react-chartjs-2';
import type { ChartData, ChartOptions } from 'chart.js';
Chart.register(...registerables);

interface FormData {
  peso: number;
  altura: number;
  edad: number;
  genero: string;
  actividad: string;
}

interface Resultados {
  bmr: number;
  calorias: number;
  proteinas: number;
  carbohidratos: number;
  grasas: number;
}

const calculateBMR = (formData: FormData): Resultados => {
  const { peso, altura, edad, genero, actividad } = formData;
  let bmr: number;
  if (genero === 'masculino') {
    bmr = 88.362 + 13.397 * peso + 4.799 * altura - 5.677 * edad;
  } else {
    bmr = 447.593 + 9.247 * peso + 3.098 * altura - 4.33 * edad;
  }

  const actividadFactorMap: { [key: string]: number } = {
    sedentario: 1.2,
    ligeramenteActivo: 1.375,
    moderadamenteActivo: 1.55,
    muyActivo: 1.725,
    superActivo: 1.9,
  };

  const actividadFactor = actividadFactorMap[actividad];
  if (actividadFactor === undefined) {
    throw new Error(`Actividad no válida: ${actividad}`);
  }

  const calorias = bmr * actividadFactor;

  let proteinas: number;
  let carbohidratos: number;
  let grasas: number;

  proteinas = peso * 2;
  carbohidratos = (calorias * 0.45) / 4;
  grasas = (calorias * 0.3) / 9;

  return {
    bmr,
    calorias,
    proteinas,
    carbohidratos,
    grasas,
  };
};

const generatePDF = async (formData: FormData, resultados: Resultados) => {
  const doc = new jsPDF();

  doc.setFontSize(16);
  doc.text('Resultados de BMR', 14, 20);

  doc.setFontSize(12);
  doc.text('Datos de la Calculadora', 14, 30);

  (doc as any).autoTable({
    startY: 40,
    margin: { left: 14 },
    head: [['Campo', 'Valor']],
    body: [
      ['Peso', formData.peso.toFixed(2) + ' kg'],
      ['Altura', formData.altura.toFixed(2) + ' cm'],
      ['Edad', formData.edad.toString()],
      ['Género', formData.genero],
      ['Actividad', formData.actividad],
      ['BMR', resultados.bmr.toFixed(2) + ' calorías/día'],
      ['Calorías', resultados.calorias.toFixed(2) + ' calorías/día'],
      ['Proteínas', resultados.proteinas.toFixed(2) + ' gramos/día'],
      ['Carbohidratos', resultados.carbohidratos.toFixed(2) + ' gramos/día'],
      ['Grasas', resultados.grasas.toFixed(2) + ' gramos/día'],
    ],
    theme: 'grid',
    styles: { fontSize: 10 },
    headStyles: { fillColor: [22, 160, 133], textColor: [255, 255, 255] },
    bodyStyles: { fillColor: [255, 255, 255] },
  });

  doc.save('reporte_bmr.pdf');
};

const BmrCalculator = () => {
  const [formData, setFormData] = useState<FormData>({
    peso: 0,
    altura: 0,
    edad: 0,
    genero: '',
    actividad: 'sedentario',
  });

  const [resultados, setResultados] = useState<Resultados | null>(null);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const resultados = calculateBMR(formData);
    setResultados(resultados);
  };

  const chartData: ChartData<'bar', number[], string> = resultados ? {
    labels: ['Calorías', 'Proteínas', 'Carbohidratos', 'Grasas'],
    datasets: [{
      label: 'Cantidad (gramos)',
      data: [
        resultados.calorias / 4,
        resultados.proteinas,
        resultados.carbohidratos,
        resultados.grasas
      ],
      backgroundColor: [
        'rgba(75, 192, 192, 0.2)',
        'rgba(255, 159, 64, 0.2)',
        'rgba(153, 102, 255, 0.2)',
        'rgba(255, 99, 132, 0.2)'
      ],
      borderColor: [
        'rgba(75, 192, 192, 1)',
        'rgba(255, 159, 64, 1)',
        'rgba(153, 102, 255, 1)',
        'rgba(255, 99, 132, 1)'
      ],
      borderWidth: 1,
    }],
  } : { labels: [], datasets: [] };

  const chartOptions: ChartOptions<'bar'> = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      tooltip: {
        callbacks: {
          label: (context) => {
            const value = context.raw as number;
            return `${context.label}: ${value.toFixed(2)} gramos`;
          },
        },
      },
    },
  };

  return (
    <div className="max-w-4xl mx-auto mt-8 p-6 bg-white shadow-lg rounded-lg">
      <h1 className="text-3xl font-bold mb-6 text-center">Calculadora BMR</h1>
      <form onSubmit={handleSubmit} className="flex flex-wrap gap-6 p-6 bg-gray-100 shadow-md rounded-lg">
        <div className="w-full md:w-1/2 lg:w-1/3">
          <label className="block font-medium text-gray-700">Peso (kg):</label>
          <input
            type="number"
            name="peso"
            value={formData.peso}
            onChange={handleInputChange}
            className="mt-1 p-3 border border-gray-300 rounded w-full"
            required
          />
        </div>
        <div className="w-full md:w-1/2 lg:w-1/3">
          <label className="block font-medium text-gray-700">Altura (cm):</label>
          <input
            type="number"
            name="altura"
            value={formData.altura}
            onChange={handleInputChange}
            className="mt-1 p-3 border border-gray-300 rounded w-full"
            required
          />
        </div>
        <div className="w-full md:w-1/2 lg:w-1/3">
          <label className="block font-medium text-gray-700">Edad:</label>
          <input
            type="number"
            name="edad"
            value={formData.edad}
            onChange={handleInputChange}
            className="mt-1 p-3 border border-gray-300 rounded w-full"
            required
          />
        </div>
        <div className="w-full md:w-1/2 lg:w-1/3">
          <label className="block font-medium text-gray-700">Género:</label>
          <select
            name="genero"
            value={formData.genero}
            onChange={handleInputChange}
            className="mt-1 p-3 border border-gray-300 rounded w-full"
            required
          >
            <option value="masculino">Masculino</option>
            <option value="femenino">Femenino</option>
          </select>
        </div>
        <div className="w-full md:w-1/2 lg:w-1/3">
          <label className="block font-medium text-gray-700">Actividad:</label>
          <select
            name="actividad"
            value={formData.actividad}
            onChange={handleInputChange}
            className="mt-1 p-3 border border-gray-300 rounded w-full"
            required
          >
            <option value="sedentario">Sedentario</option>
            <option value="ligeramenteActivo">Ligeramente Activo</option>
            <option value="moderadamenteActivo">Moderadamente Activo</option>
            <option value="muyActivo">Muy Activo</option>
            <option value="superActivo">Super Activo</option>
          </select>
        </div>
        <div className="w-full flex justify-center mt-6">
          <button type="submit" className="p-3 bg-blue-500 text-white rounded-lg">Calcular</button>
        </div>
        {resultados && (
          <div className="w-full flex justify-center mt-6">
            <button onClick={() => generatePDF(formData, resultados)} className="p-3 bg-green-500 text-white rounded-lg">
              Generar Reporte PDF
            </button>
          </div>
        )}
      </form>

      {resultados && (
        <div className="mt-8">
        <h2 className="text-2xl font-bold text-center">Resultados</h2>
        <div className="flex flex-wrap justify-center gap-6 mt-6">
          <div className="bg-gray-100 p-6 rounded-lg shadow-md flex-1 min-w-0 max-w-xs">
            <p><strong>BMR:</strong> {resultados.bmr.toFixed(2)} calorías/día</p>
          </div>
          <div className="bg-gray-100 p-6 rounded-lg shadow-md flex-1 min-w-0 max-w-xs">
            <p><strong>Calorías:</strong> {resultados.calorias.toFixed(2)} calorías/día</p>
          </div>
          <div className="bg-gray-100 p-6 rounded-lg shadow-md flex-1 min-w-0 max-w-xs">
            <p><strong>Proteínas:</strong> {resultados.proteinas.toFixed(2)} gramos/día</p>
          </div>
          <div className="bg-gray-100 p-6 rounded-lg shadow-md flex-1 min-w-0 max-w-xs">
            <p><strong>Carbohidratos:</strong> {resultados.carbohidratos.toFixed(2)} gramos/día</p>
          </div>
          <div className="bg-gray-100 p-6 rounded-lg shadow-md flex-1 min-w-0 max-w-xs">
            <p><strong>Grasas:</strong> {resultados.grasas.toFixed(2)} gramos/día</p>
          </div>
        </div>

      

          <div className="mt-8 p-6 bg-gray-100 shadow-md rounded-lg">
            <h3 className="text-xl font-bold text-center">Distribución de Nutrientes</h3>
            <Bar
              data={chartData}
              options={chartOptions}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default BmrCalculator;
