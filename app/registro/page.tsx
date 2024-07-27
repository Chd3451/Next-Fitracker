'use client';

import React, { useState, useEffect } from 'react';
import { FaUser, FaCalendarAlt, FaWeight, FaRulerVertical, FaBullseye, FaEnvelope, FaPhone, FaVenusMars, FaMapMarkerAlt } from 'react-icons/fa';


interface Cliente {
  nombre: string;
  fechaNacimiento: string;
  peso: number;
  altura: number;
  metaPeso: number;
  email: string;
  telefono: string;
  genero: string;
  direccion: string;
  fechaRegistro: string;
}

const RegisterForm: React.FC = () => {
  const [nombre, setNombre] = useState('');
  const [fechaNacimiento, setFechaNacimiento] = useState('');
  const [peso, setPeso] = useState('');
  const [altura, setAltura] = useState('');
  const [metaPeso, setMetaPeso] = useState('');
  const [email, setEmail] = useState('');
  const [telefono, setTelefono] = useState('');
  const [genero, setGenero] = useState('');
  const [direccion, setDireccion] = useState('');
  const [clientes, setClientes] = useState<Cliente[]>([]);
  const [alertMessage, setAlertMessage] = useState('');
  const [alertVisible, setAlertVisible] = useState(false);

  const fetchClientes = async () => {
    try {
      const response = await fetch('/api/clientes');
      if (response.ok) {
        const data: Cliente[] = await response.json();
        setClientes(data);
      } else {
        console.error('Error al obtener los clientes');
      }
    } catch (error) {
      console.error('Error en la solicitud:', error);
    }
  };

  useEffect(() => {
    fetchClientes();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await fetch('/api/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          nombre,
          fechaNacimiento,
          peso: parseFloat(peso),
          altura: parseFloat(altura),
          metaPeso: parseFloat(metaPeso),
          fechaRegistro: new Date().toISOString(),
          email,
          telefono,
          genero,
          direccion,
        }),
      });

      if (response.ok) {
        // Actualiza la lista de clientes
        fetchClientes();
        setAlertMessage('Cliente registrado exitosamente');
        setAlertVisible(true);
        setTimeout(() => setAlertVisible(false), 3000);
        // Limpiar el formulario
        setNombre('');
        setFechaNacimiento('');
        setPeso('');
        setAltura('');
        setMetaPeso('');
        setEmail('');
        setTelefono('');
        setGenero('');
        setDireccion('');
      } else {
        setAlertMessage('Error en la creación del cliente');
        setAlertVisible(true);
        setTimeout(() => setAlertVisible(false), 3000);
      }
    } catch (error) {
      console.error('Error en la solicitud:', error);
      setAlertMessage('Error en la solicitud');
      setAlertVisible(true);
      setTimeout(() => setAlertVisible(false), 3000);
    }
  };

  return (
    <div className="p-5">
      <div className="bg-white shadow-lg rounded-lg p-10 mb-10">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Registrar Cliente</h2>
      {alertVisible && (
        <div className="mb-4 p-4 text-white bg-green-500 rounded-lg shadow-lg">
          {alertMessage}
        </div>
      )}
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-2 gap-4">
          {/* Inputs */}
          <div className="flex flex-col">
            <label className="font-medium text-gray-700 flex items-center">
              <FaUser className="mr-2" /> Nombre
            </label>
            <input
              type="text"
              value={nombre}
              onChange={(e) => setNombre(e.target.value)}
              placeholder="Nombre"
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring focus:ring-opacity-50 p-2"
            />
          </div>
          <div className="flex flex-col">
            <label className="font-medium text-gray-700 flex items-center">
              <FaCalendarAlt className="mr-2" /> Fecha de Nacimiento
            </label>
            <input
              type="date"
              value={fechaNacimiento}
              onChange={(e) => setFechaNacimiento(e.target.value)}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring focus:ring-opacity-50 p-2"
            />
          </div>
          <div className="flex flex-col">
            <label className="font-medium text-gray-700 flex items-center">
              <FaWeight className="mr-2" /> Peso (kg)
            </label>
            <div className="relative mt-1">
              <input
                type="number"
                step="0.01"
                value={peso}
                onChange={(e) => setPeso(e.target.value)}
                placeholder="Peso"
                className="block w-full border border-gray-300 rounded-md shadow-sm focus:ring focus:ring-opacity-50 p-2 pr-12"
              />
              <span className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-500">
                kg
              </span>
            </div>
          </div>
          <div className="flex flex-col">
            <label className="font-medium text-gray-700 flex items-center">
              <FaRulerVertical className="mr-2" /> Altura (m)
            </label>
            <div className="relative mt-1">
              <input
                type="number"
                step="0.01"
                value={altura}
                onChange={(e) => setAltura(e.target.value)}
                placeholder="Altura"
                className="block w-full border border-gray-300 rounded-md shadow-sm focus:ring focus:ring-opacity-50 p-2 pr-12"
              />
              <span className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-500">
                m
              </span>
            </div>
          </div>
          <div className="flex flex-col">
            <label className="font-medium text-gray-700 flex items-center">
              <FaBullseye className="mr-2" /> Meta de Peso (kg)
            </label>
            <div className="relative mt-1">
              <input
                type="number"
                step="0.01"
                value={metaPeso}
                onChange={(e) => setMetaPeso(e.target.value)}
                placeholder="Meta de Peso"
                className="block w-full border border-gray-300 rounded-md shadow-sm focus:ring focus:ring-opacity-50 p-2 pr-12"
              />
              <span className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-500">
                kg
              </span>
            </div>
          </div>
          <div className="flex flex-col">
            <label className="font-medium text-gray-700 flex items-center">
              <FaEnvelope className="mr-2" /> Email
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email"
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring focus:ring-opacity-50 p-2"
            />
          </div>
          <div className="flex flex-col">
            <label className="font-medium text-gray-700 flex items-center">
              <FaPhone className="mr-2" /> Teléfono
            </label>
            <input
              type="text"
              value={telefono}
              onChange={(e) => setTelefono(e.target.value)}
              placeholder="Teléfono"
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring focus:ring-opacity-50 p-2"
            />
          </div>
          <div className="flex flex-col">
            <label className="font-medium text-gray-700 flex items-center">
              <FaVenusMars className="mr-2" /> Género
            </label>
            <select
              value={genero}
              onChange={(e) => setGenero(e.target.value)}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring focus:ring-opacity-50 p-2"
            >
              <option value="">Seleccione</option>
              <option value="M">Masculino</option>
              <option value="F">Femenino</option>
            </select>
          </div>
          <div className="flex flex-col col-span-2">
            <label className="font-medium text-gray-700 flex items-center">
              <FaMapMarkerAlt className="mr-2" /> Dirección
            </label>
            <input
              type="text"
              value={direccion}
              onChange={(e) => setDireccion(e.target.value)}
              placeholder="Dirección"
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring focus:ring-opacity-50 p-2"
            />
          </div>
        </div>
        <div className="flex justify-end">
          <input
            type="submit"
            value="Registrar Cliente"
            className="cursor-pointer rounded-lg border border-primary bg-primary py-2 px-4 text-white transition hover:bg-opacity-90"
          />
        </div>
      </form>
    </div>
      <div className="bg-white shadow-lg rounded-lg p-10">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">Clientes Registrados</h2>
        <div className="grid grid-cols-6 border-t border-stroke py-4.5 px-4 dark:border-strokedark sm:grid-cols-8 md:px-6 2xl:px-7.5">
          <div className="col-span-2 flex items-center">
            <p className="font-medium">Nombre</p>
          </div>
          <div className="col-span-2 hidden items-center sm:flex">
            <p className="font-medium">Email</p>
          </div>
          <div className="col-span-2 flex items-center">
            <p className="font-medium">Teléfono</p>
          </div>
          <div className="col-span-1 flex items-center">
            <p className="font-medium">Peso</p>
          </div>
          <div className="col-span-1 flex items-center">
            <p className="font-medium">Altura</p>
          </div>
        </div>

        {clientes.map((cliente, index) => (
          <div
            className="grid grid-cols-6 border-t border-stroke py-4.5 px-4 dark:border-strokedark sm:grid-cols-8 md:px-6 2xl:px-7.5"
            key={index}
          >
            <div className="col-span-2 flex items-center">
              <p className="text-sm text-black dark:text-white">{cliente.nombre}</p>
            </div>
            <div className="col-span-2 hidden items-center sm:flex">
              <p className="text-sm text-black dark:text-white">{cliente.email}</p>
            </div>
            <div className="col-span-2 flex items-center">
              <p className="text-sm text-black dark:text-white">{cliente.telefono}</p>
            </div>
            <div className="col-span-1 flex items-center">
              <p className="text-sm text-black dark:text-white">{cliente.peso}</p>
            </div>
            <div className="col-span-1 flex items-center">
              <p className="text-sm text-black dark:text-white">{cliente.altura}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RegisterForm;
