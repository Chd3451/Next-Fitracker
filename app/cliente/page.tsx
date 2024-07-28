'use client';
import { useCallback, useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';

const ClientePage = () => {
  const [id, setId] = useState<number | null>(null);
  const [cliente, setCliente] = useState<any>(null);
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

  const searchParams = useSearchParams();

  useEffect(() => {
    const clientId = searchParams.get('id');
    if (clientId) {
      setId(Number(clientId));
    }
  }, [searchParams]);

  const fetchCliente = useCallback(async () => {
    if (id === null) return;

    const res = await fetch(`/api/upcli?id=${id}`);
    const data = await res.json();

    if (res.ok) {
      setCliente(data);
      setFormData({
        nombre: data.nombre,
        fechaNacimiento: data.fechaNacimiento.split('T')[0], // Formatear fecha
        peso: data.peso,
        altura: data.altura,
        metaPeso: data.metaPeso,
        email: data.email,
        telefono: data.telefono,
        genero: data.genero,
        direccion: data.direccion,
        actividad: data.actividad || 'sedentario', // Usar valor de la base de datos o el predeterminado
      });
    } else {
      console.error('Error fetching client:', data.message);
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
      console.error('Error updating client:', data.message);
    }
  };

  const calculateAge = (dob: string) => {
    const birthDate = new Date(dob);
    const ageDifMs = Date.now() - birthDate.getTime();
    const ageDate = new Date(ageDifMs);
    return Math.abs(ageDate.getUTCFullYear() - 1970);
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
              <label className="block font-medium text-gray-700">Actividad:</label>
              <select
                name="actividad"
                value={formData.actividad}
                onChange={handleInputChange}
                className="mt-1 p-2 border border-gray-300 rounded w-full"
              >
                <option value="sedentario">Sedentario</option>
                <option value="ligera">Ligera</option>
                <option value="moderada">Moderada</option>
                <option value="intensa">Intensa</option>
                <option value="muy_intensa">Muy Intensa</option>
              </select>
            </div>
            <div className="col-span-1 sm:col-span-2">
              <button
                type="submit"
                className="w-full mt-4 p-2 bg-green-500 text-white rounded hover:bg-green-600"
              >
                Actualizar Cliente
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};

export default ClientePage;
