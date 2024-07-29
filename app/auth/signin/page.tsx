'use client'
import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";


const SignIn: React.FC = () => {
  const [correo, setCorreo] = useState("");
  const [contrasena, setContrasena] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validar que ambos campos estén presentes
    if (!correo || !contrasena) {
      alert("Correo y contraseña son requeridos");
      return;
    }

    try {
      const response = await fetch("/api/signin", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ correo, contrasena }),
      });

      const data = await response.json();

      if (!response.ok) {
        alert(data.error || "Error en el inicio de sesión");
        return;
      }

      // Guardar el token en localStorage
      localStorage.setItem("token", data.token);

      // Redirigir al usuario a la página de inicio o a donde prefieras
      window.location.href = "/";
    } catch (error) {
      console.error("Error en el inicio de sesión:", error);
      alert("Error en el inicio de sesión");
    }
  };

  return (
    <>
      <Breadcrumb pageName="Iniciar Sesión" />

      <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
        <div className="flex flex-wrap items-center">
          <div className="hidden w-full xl:block xl:w-1/2">
            <div className="px-26 py-17.5 text-center">
              <Link className="mb-5.5 inline-block" href="/">
                <h1 className="text-2xl font-semibold text-white">FitTracker</h1>
                <Image
                  className="dark:hidden"
                  src={"/images/FitTracker.svg"}
                  alt="Logo"
                  width={176}
                  height={32}
                />
              </Link>

              <p className="2xl:px-20">
                Bienvenido a FitTracker, tu compañero ideal para alcanzar tus metas de fitness.
              </p>
            </div>
          </div>

          <div className="w-full border-stroke dark:border-strokedark xl:w-1/2 xl:border-l-2">
            <div className="w-full p-4 sm:p-12.5 xl:p-17.5">
              <span className="mb-1.5 block font-medium">Comienza gratis</span>
              <h2 className="mb-9 text-2xl font-bold text-black dark:text-white sm:text-title-xl2">
                Inicia Sesión en FitTracker
              </h2>

              <form onSubmit={handleSubmit}>
                <div className="mb-4">
                  <label className="mb-2.5 block font-medium text-black dark:text-white">
                    Correo Electrónico
                  </label>
                  <div className="relative">
                    <input
                      type="email"
                      placeholder="Ingresa tu correo electrónico"
                      className="w-full rounded-lg border border-stroke bg-transparent py-4 pl-6 pr-10 outline-none focus:border-primary focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                      value={correo}
                      onChange={(e) => setCorreo(e.target.value)}
                    />
                  </div>
                </div>

                <div className="mb-6">
                  <label className="mb-2.5 block font-medium text-black dark:text-white">
                    Contraseña
                  </label>
                  <div className="relative">
                    <input
                      type="password"
                      placeholder="6+ Caracteres, 1 letra mayúscula"
                      className="w-full rounded-lg border border-stroke bg-transparent py-4 pl-6 pr-10 outline-none focus:border-primary focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                      value={contrasena}
                      onChange={(e) => setContrasena(e.target.value)}
                    />
                  </div>
                </div>

                <div className="mb-5">
                  <input
                    type="submit"
                    value="Iniciar Sesión"
                    className="w-full cursor-pointer rounded-lg border border-primary bg-primary p-4 text-white transition hover:bg-opacity-90"
                  />
                </div>

                <div className="mt-6 text-center">
                  <p>
                    ¿No tienes una cuenta?{" "}
                    <Link href="/auth/signup" className="text-primary">
                      Regístrate
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

export default SignIn;
