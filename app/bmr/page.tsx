'use client';
import { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import { toPng } from 'html-to-image';
import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

// Registrar las escalas y componentes necesarios
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

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

const BmrPage = () => {
  const searchParams = useSearchParams();
  const [formData, setFormData] = useState<FormData>({
    peso: 0,
    altura: 0,
    edad: 0,
    genero: '',
    actividad: 'sedentario',
  });

  const [resultados, setResultados] = useState<Resultados | null>(null);

  useEffect(() => {
    const peso = parseFloat(searchParams.get('peso') || '0');
    const altura = parseFloat(searchParams.get('altura') || '0');
    const edad = calcularEdad(searchParams.get('fechaNacimiento') || '');
    const genero = searchParams.get('genero') || '';

    setFormData({
      peso,
      altura,
      edad,
      genero,
      actividad: 'sedentario',
    });
  }, [searchParams]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const calcularBMR = (): Resultados => {
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

    const proteinas = peso * 2;
    const carbohidratos = (calorias * 0.45) / 4;
    const grasas = (calorias * 0.3) / 9;

    return {
      bmr,
      calorias,
      proteinas,
      carbohidratos,
      grasas,
    };
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const resultados = calcularBMR();
    setResultados(resultados);
  
    const clienteId = searchParams.get('clienteId');
    
    const payload = {
      clienteId: Number(clienteId),
      peso: Number(formData.peso),
      altura: Number(formData.altura),
      edad: Number(formData.edad),
      genero: formData.genero,
      actividad: formData.actividad,
      bmr: resultados.bmr,
      calorias: resultados.calorias,
      proteinas: resultados.proteinas,
      carbohidratos: resultados.carbohidratos,
      grasas: resultados.grasas,
    };
    
    try {
      const res = await fetch('/api/saveBMR', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });
  
      if (!res.ok) {
        throw new Error('Error al guardar los datos del BMR');
      }
  
      const data = await res.json();
      console.log('Datos guardados con éxito:', data);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const calcularEdad = (fechaNacimiento: string): number => {
    const hoy = new Date();
    const nacimiento = new Date(fechaNacimiento);
    let edad = hoy.getFullYear() - nacimiento.getFullYear();
    const mes = hoy.getMonth() - nacimiento.getMonth();
    if (mes < 0 || (mes === 0 && hoy.getDate() < nacimiento.getDate())) {
      edad--;
    }
    return edad;
  };

  const formatFechaNacimiento = (fecha: string): string => {
    const opciones: Intl.DateTimeFormatOptions = {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
    };
    return new Date(fecha).toLocaleDateString('es-ES', opciones);
  };

  const chartData = {
    labels: ['Calorías', 'Proteínas', 'Carbohidratos', 'Grasas'],
    datasets: [
      {
        label: 'Nutrientes',
        data: resultados ? [resultados.calorias, resultados.proteinas, resultados.carbohidratos, resultados.grasas] : [0, 0, 0, 0],
        backgroundColor: ['rgba(75, 192, 192, 0.6)', 'rgba(54, 162, 235, 0.6)', 'rgba(255, 206, 86, 0.6)', 'rgba(255, 99, 132, 0.6)'],
      },
    ],
  };

  const generatePDF = async () => {
    const doc = new jsPDF();
  
    // Añadir el título
    doc.setFontSize(16);
    doc.text('FitTracker', 14, 20);
    doc.setFontSize(12);
    doc.text('Resultados de BMR', 14, 30);
  
    // Datos del cliente
    const clienteId = searchParams.get('clienteId') || '';
    const nombre = searchParams.get('nombre') || '';
  
    doc.setFontSize(12);
    doc.text('Datos del Cliente', 14, 40);
  
    (doc as any).autoTable({
      startY: 50,
      margin: { left: 14 },
      head: [['Campo', 'Valor']],
      body: [
        ['ID del Cliente', clienteId],
        ['Nombre', nombre],
        ['Peso', formData.peso.toFixed(2) + ' kg'],
        ['Altura', formData.altura.toFixed(2) + ' cm'],
        ['Edad', formData.edad.toString()],
        ['Género', formData.genero],
        ['Actividad', formData.actividad],
      ],
      theme: 'grid',
      styles: { fontSize: 10 },
      headStyles: { fillColor: [22, 160, 133], textColor: [255, 255, 255] },
      bodyStyles: { fillColor: [255, 255, 255] },
    });
  
    // Resultados de BMR
    if (resultados) {
      const startY = (doc as any).autoTable.previous.finalY + 10;
      doc.setFontSize(12);
      doc.text('Resultados de BMR', 14, startY);
  
      (doc as any).autoTable({
        startY: startY + 10,
        margin: { left: 14 },
        head: [['Campo', 'Valor']],
        body: [
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
  
      // Capturar el gráfico y añadirlo al PDF
      const chartContainer = document.querySelector('#chart-container');
      if (chartContainer && chartContainer instanceof HTMLElement) {
        const dataUrl = await toPng(chartContainer);
  
        doc.addPage();
        doc.text('Gráfico de Resultados', 14, 20);
        doc.addImage(dataUrl, 'PNG', 14, 30, 180, 100); // Ajusta el tamaño según lo necesario
      }
    } else {
      doc.text('No hay resultados de BMR disponibles.', 14, (doc as any).autoTable.previous.finalY + 10);
    }
  
    doc.save('reporte_bmr.pdf');
  };
  

  return (
    <div className="max-w-4xl mx-auto mt-8 p-6 bg-white shadow-lg rounded-lg">
      <h1 className="text-3xl font-bold mb-6 text-center">Datos del Cliente</h1>
      <div className="mb-6 p-6 bg-gray-200 shadow-md rounded-lg flex flex-wrap gap-6">
        <div className="w-full md:w-1/3">
          <p><strong>ID del Cliente:</strong> {searchParams.get('clienteId')}</p>
        </div>
        <div className="w-full md:w-1/3">
          <p><strong>Nombre:</strong> {searchParams.get('nombre')}</p>
        </div>
        <div className="w-full md:w-1/3">
          <p><strong>Fecha de Nacimiento:</strong> {formatFechaNacimiento(searchParams.get('fechaNacimiento') || '')}</p>
        </div>
        <div className="w-full md:w-1/3">
          <p><strong>Peso:</strong> {formData.peso} kg</p>
        </div>
        <div className="w-full md:w-1/3">
          <p><strong>Altura:</strong> {formData.altura} cm</p>
        </div>
        <div className="w-full md:w-1/3">
          <p><strong>Género:</strong> {formData.genero}</p>
        </div>
      </div>

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
            <option value="superActivo">Súper Activo</option>
          </select>
        </div>
        <div className="w-full flex justify-center">
          <button type="submit" className="mt-6 p-3 bg-blue-500 text-white rounded-lg">Calcular</button>
        </div>
        <div className="w-full flex justify-center mt-6">
          <button type="button" onClick={generatePDF} className="p-3 bg-green-500 text-white rounded-lg">
            Generar Reporte PDF
          </button>
        </div>
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
          <div id="chart-container" className="mt-6">
            <Bar data={chartData} />
          </div>
        </div>
      )}
    </div>
  );
};

export default BmrPage;
