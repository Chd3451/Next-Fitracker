'use client';
import { useCallback, useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import jsPDF from 'jspdf';
import 'jspdf-autotable';

const ClientePage = () => {
  const [id, setId] = useState<number | null>(null);
  const [cliente, setCliente] = useState<any>(null);
  const [bmrData, setBmrData] = useState<any>(null);
  const [formData, setFormData] = useState({
    nombre: '',
    fechaNacimiento: '',
    peso: '',
    altura: '',
    metaPeso: '',
    email: '',
    telefono: '',
    genero: '',
    direccion: '',
    actividad: 'sedentario', // Valor predeterminado
  });

  const generatePDF = () => {
    const doc = new jsPDF();
  
    // Configuración del documento
    const today = new Date();
    const formattedDate = today.toLocaleDateString();
    doc.setFontSize(12);
    doc.text('FitTracker', 20, 10); // Nombre de la app
    doc.text(`Fecha de Impresión: ${formattedDate}`, 20, 20);
  
    // Datos del cliente
    doc.setFontSize(14);
    doc.text('Datos del Cliente', 20, 30);
  
    // Tabla para datos del cliente
    (doc as any).autoTable({
      startY: 40,
      margin: { left: 20 },
      head: [['Datos', 'Cliente']],
      body: [
        ['Nombre', cliente.nombre],
        ['Fecha de Nacimiento', new Date(cliente.fechaNacimiento).toLocaleDateString()],
        ['Peso', cliente.peso.toFixed(2)],
        ['Altura', cliente.altura.toFixed(2)],
        ['Meta Peso', cliente.metaPeso.toFixed(2)],
        ['Email', cliente.email],
        ['Teléfono', cliente.telefono],
        ['Género', cliente.genero],
        ['Dirección', cliente.direccion],
        ['Actividad', cliente.actividad],
      ],
      theme: 'grid',
      styles: { fontSize: 10 },
      headStyles: { fillColor: [22, 160, 133], textColor: [255, 255, 255] },
      bodyStyles: { fillColor: [255, 255, 255] },
    });
  
    // Espacio para la tabla de BMR
    const startY = (doc as any).autoTable.previous.finalY + 20;
    doc.text('Datos del BMR', 20, startY);
  
    if (cliente.BMR.length > 0) {
      // Tabla para datos de BMR
      (doc as any).autoTable({
        startY: startY + 10,
        margin: { left: 20 },
        head: [['Peso', 'Altura', 'Edad', 'Actividad', 'Género', 'Proteínas', 'Carbohidratos', 'Grasas', 'Calorías', 'Fecha']],
        body: cliente.BMR.map((bmr: any) => [
          bmr.peso.toFixed(2),
          bmr.altura.toFixed(2),
          bmr.edad,
          bmr.actividad,
          bmr.genero,
          bmr.proteinas.toFixed(2),
          bmr.carbohidratos.toFixed(2),
          bmr.grasas.toFixed(2),
          bmr.calorias.toFixed(2),
          new Date(bmr.fecha).toLocaleDateString()
        ]),
        theme: 'grid',
        styles: { fontSize: 10 },
        headStyles: { fillColor: [22, 160, 133], textColor: [255, 255, 255] },
        bodyStyles: { fillColor: [255, 255, 255] },
      });
    } else {
      doc.text('No hay datos de BMR disponibles.', 20, startY + 10);
    }
  
    doc.save('reporte_cliente.pdf');
  };
  
  
  const searchParams = useSearchParams();

  useEffect(() => {
    const clientId = searchParams.get('id');
    if (clientId) {
      setId(Number(clientId));
    }
  }, [searchParams]);

  const fetchCliente = useCallback(async () => {
    if (id === null) return;

    const res = await fetch(`/api/getCliente?clienteId=${id}`);
    const data = await res.json();

    if (res.ok) {
      setCliente(data.cliente);
      setBmrData(data.bmr);
      setFormData({
        nombre: data.cliente.nombre,
        fechaNacimiento: data.cliente.fechaNacimiento.split('T')[0], // Formatear fecha
        peso: data.cliente.peso,
        altura: data.cliente.altura,
        metaPeso: data.cliente.metaPeso,
        email: data.cliente.email,
        telefono: data.cliente.telefono,
        genero: data.cliente.genero,
        direccion: data.cliente.direccion,
        actividad: data.cliente.actividad || 'sedentario', // Usar valor de la base de datos o el predeterminado
      });
    } else {
      console.error('Error fetching client:', data.error);
    }
  }, [id]);

  useEffect(() => {
    if (id !== null) {
      fetchCliente();
    }
  }, [id, fetchCliente]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const updateCliente = async () => {
    if (id === null) return;

    const res = await fetch(`/api/upcli?id=${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    });
    const data = await res.json();

    if (res.ok) {
      setCliente(data);
      alert('Cliente actualizado con éxito');
    } else {
      console.error('Error updating client:', data.error);
    }
  };
  const handleGenerateReport = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    event.preventDefault(); // Evita el comportamiento predeterminado si está en un formulario
    generatePDF(); // Llama a la función para generar el PDF
  };
  return (
    <div className="max-w-2xl mx-auto mt-8 p-4 bg-white shadow-md rounded-lg">
      <h1 className="text-2xl font-bold mb-4">Gestionar Cliente</h1>
      <input
        type="number"
        placeholder="Ingrese ID del cliente"
        value={id ?? ''}
        onChange={(e) => setId(Number(e.target.value))}
        className="mb-4 p-2 border border-gray-300 rounded w-full"
      />
      <button
        onClick={fetchCliente}
        className="mb-4 p-2 bg-blue-500 text-white rounded hover:bg-blue-600"
      >
        Buscar Cliente
      </button>

      {cliente && (
        <div className="bg-white shadow-md rounded-lg p-8">
          <h2 className="text-2xl font-semibold mb-6">Detalles del Cliente</h2>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              updateCliente();
            }}
            className="grid grid-cols-1 gap-6 sm:grid-cols-2"
          >
            <div>
              <label className="block font-medium text-gray-700">Nombre:</label>
              <input
                type="text"
                name="nombre"
                value={formData.nombre}
                onChange={handleInputChange}
                className="mt-1 p-2 border border-gray-300 rounded w-full"
              />
            </div>
            <div>
              <label className="block font-medium text-gray-700">Fecha de Nacimiento:</label>
              <input
                type="date"
                name="fechaNacimiento"
                value={formData.fechaNacimiento}
                onChange={handleInputChange}
                className="mt-1 p-2 border border-gray-300 rounded w-full"
              />
            </div>
            <div>
              <label className="block font-medium text-gray-700">Peso:</label>
              <input
                type="number"
                step="0.1"
                name="peso"
                value={formData.peso}
                onChange={handleInputChange}
                className="mt-1 p-2 border border-gray-300 rounded w-full"
              />
            </div>
            <div>
              <label className="block font-medium text-gray-700">Altura:</label>
              <input
                type="number"
                step="0.01"
                name="altura"
                value={formData.altura}
                onChange={handleInputChange}
                className="mt-1 p-2 border border-gray-300 rounded w-full"
              />
            </div>
            <div>
              <label className="block font-medium text-gray-700">Meta de Peso:</label>
              <input
                type="number"
                step="0.1"
                name="metaPeso"
                value={formData.metaPeso}
                onChange={handleInputChange}
                className="mt-1 p-2 border border-gray-300 rounded w-full"
              />
            </div>
            <div>
              <label className="block font-medium text-gray-700">Email:</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                className="mt-1 p-2 border border-gray-300 rounded w-full"
              />
            </div>
            <div>
              <label className="block font-medium text-gray-700">Teléfono:</label>
              <input
                type="text"
                name="telefono"
                value={formData.telefono}
                onChange={handleInputChange}
                className="mt-1 p-2 border border-gray-300 rounded w-full"
              />
            </div>
            <div>
              <label className="block font-medium text-gray-700">Género:</label>
              <input
                type="text"
                name="genero"
                value={formData.genero}
                onChange={handleInputChange}
                className="mt-1 p-2 border border-gray-300 rounded w-full"
              />
            </div>
            <div>
              <label className="block font-medium text-gray-700">Dirección:</label>
              <input
                type="text"
                name="direccion"
                value={formData.direccion}
                onChange={handleInputChange}
                className="mt-1 p-2 border border-gray-300 rounded w-full"
              />
            </div>
            <div>
              <label className="block font-medium text-gray-700">Actividad Física:</label>
              <select
                name="actividad"
                value={formData.actividad}
                onChange={handleInputChange}
                className="mt-1 p-2 border border-gray-300 rounded w-full"
              >
                <option value="sedentario">Sedentario</option>
                <option value="ligeramenteActivo">Ligeramente Activo</option>
                <option value="moderadamenteActivo">Moderadamente Activo</option>
                <option value="muyActivo">Muy Activo</option>
                <option value="superActivo">Super Activo</option>
              </select>
            </div>
            <div className="col-span-1 sm:col-span-2">
              <button
                type="submit"
                className="w-full mt-4 p-2 bg-green-500 text-white rounded hover:bg-green-600"
              >
                Actualizar Cliente
              </button>
              <button
  onClick={handleGenerateReport}
  className="mt-4 p-2 bg-green-500 text-white rounded hover:bg-green-600"
>
  Generar Reporte PDF
</button>

            </div>
          </form>

          {/* Mostrar información del BMR si existe */}
          {bmrData && (
            <div className="mt-8 bg-gray-50 p-6 rounded-lg shadow-md">
              <h2 className="text-2xl font-semibold mb-4">Datos del BMR</h2>
              <p className="mb-2"><strong>Fecha:</strong> {new Date(bmrData.fecha).toLocaleDateString()}</p>
              <p className="mb-2"><strong>BMR:</strong> {bmrData.bmr}</p>
              <p className="mb-2"><strong>Proteínas:</strong> {bmrData.proteinas} g</p>
              <p className="mb-2"><strong>Carbohidratos:</strong> {bmrData.carbohidratos} g</p>
              <p className="mb-2"><strong>Grasas:</strong> {bmrData.grasas} g</p>
            </div>
          )}

          <Link
            href={{
              pathname: '/bmr', 
              query: { 
                clienteId: cliente.id,
                nombre: cliente.nombre,
                fechaNacimiento: cliente.fechaNacimiento,
                peso: cliente.peso,
                altura: cliente.altura,
                email: cliente.email,
                telefono: cliente.telefono,
                genero: cliente.genero,
                direccion: cliente.direccion,
                actividad: cliente.actividad,
              },
            }}
          >
            <button className="mt-4 p-2 bg-blue-500 text-white rounded hover:bg-blue-600">
              Calcular BMR
            </button>
          </Link>
        </div>
      )}
    </div>
  );
};

export default ClientePage;
