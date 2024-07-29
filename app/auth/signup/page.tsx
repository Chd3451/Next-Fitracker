'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Breadcrumb from '@/components/Breadcrumbs/Breadcrumb';
import Image from "next/image";

const SignUp: React.FC = () => {
  const [nombre, setNombre] = useState('');
  const [apellido, setApellido] = useState('');
  const [correo, setCorreo] = useState('');
  const [contrasena, setContrasena] = useState('');
  const [confirmarContrasena, setConfirmarContrasena] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (contrasena !== confirmarContrasena) {
      alert('Las contraseñas no coinciden');
      return;
    }

    try {
      const response = await fetch('/api/usuarios/crear', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ nombre, apellido, correo, contrasena }),
      });

      if (response.ok) {
        window.location.href = '/auth/signin';
      } else {
        alert('Error en la creación de la cuenta');
      }
    } catch (error) {
      console.error('Error en la solicitud:', error);
    }
  };

  return (
    <>
      <Breadcrumb pageName="Sign Up" />

      <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
        <div className="flex flex-wrap items-center">
          <div className="hidden w-full xl:block xl:w-1/2">
            <div className="px-26 py-17.5 text-center">
           <Link className="mb-5.5 inline-block" href="/">
                <h1 className="text-2xl font-semibold text-white">
                  FitTracker
                </h1>
                <Image
                  className="dark:hidden"
                  src={"/images/FitTracker.svg"}
                  alt="Logo"
                  width={176}
                  height={32}
                />
              </Link>

              <p className="2xl:px-20">
                Mantén un registro detallado de tu progreso físico y alcanza tus metas con FitTracker.
              </p>

              <span className="mt-15 inline-block"></span>
            </div>
          </div>

          <div className="w-full border-stroke dark:border-strokedark xl:w-1/2 xl:border-l-2">
            <div className="w-full p-4 sm:p-12.5 xl:p-17.5">
              <span className="mb-1.5 block font-medium">Empieza gratis</span>
              <h2 className="mb-9 text-2xl font-bold text-black dark:text-white sm:text-title-xl2">
                Regístrate
              </h2>

              <form onSubmit={handleSubmit}>
                <div className="mb-4">
                  <label className="mb-2.5 block font-medium text-black dark:text-white">
                    Nombre
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      value={nombre}
                      onChange={(e) => setNombre(e.target.value)}
                      placeholder="Nombre "
                      className="w-full rounded-lg border border-stroke bg-transparent py-4 pl-6 pr-10 outline-none focus:border-primary focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                    />
                  </div>
                </div>

                <div className="mb-4">
                  <label className="mb-2.5 block font-medium text-black dark:text-white">
                    Apellido
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      value={apellido}
                      onChange={(e) => setApellido(e.target.value)}
                      placeholder="Apellido"
                      className="w-full rounded-lg border border-stroke bg-transparent py-4 pl-6 pr-10 outline-none focus:border-primary focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                    />
                  </div>
                </div>

                <div className="mb-4">
                  <label className="mb-2.5 block font-medium text-black dark:text-white">
                    Correo
                  </label>
                  <div className="relative">
                    <input
                      type="email"
                      value={correo}
                      onChange={(e) => setCorreo(e.target.value)}
                      placeholder="Correo"
                      className="w-full rounded-lg border border-stroke bg-transparent py-4 pl-6 pr-10 outline-none focus:border-primary focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                    />
                  </div>
                </div>

                <div className="mb-4">
                  <label className="mb-2.5 block font-medium text-black dark:text-white">
                    Contraseña
                  </label>
                  <div className="relative">
                    <input
                      type="password"
                      value={contrasena}
                      onChange={(e) => setContrasena(e.target.value)}
                      placeholder="6+ Caracteres, 1 Letra Mayúscula"
                      className="w-full rounded-lg border border-stroke bg-transparent py-4 pl-6 pr-10 outline-none focus:border-primary focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                    />
                  </div>
                </div>

                <div className="mb-6">
                  <label className="mb-2.5 block font-medium text-black dark:text-white">
                    Confirma la contraseña
                  </label>
                  <div className="relative">
                    <input
                      type="password"
                      value={confirmarContrasena}
                      onChange={(e) => setConfirmarContrasena(e.target.value)}
                      placeholder="6+ Caracteres, 1 Letra Mayúscula"
                      className="w-full rounded-lg border border-stroke bg-transparent py-4 pl-6 pr-10 outline-none focus:border-primary focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                    />
                  </div>
                </div>

                <div className="mb-5">
                  <input
                    type="submit"
                    value="Crear cuenta"
                    className="w-full cursor-pointer rounded-lg border border-primary bg-primary p-4 text-white transition hover:bg-opacity-90"
                  />
                </div>

                <div className="mt-6 text-center">
                  <p>
                    ¿Ya estás registrado?{' '}
                    <Link href="/auth/signin" className="text-primary">
                      Inicia Sesión
                    </Link>
                  </p>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SignUp;

