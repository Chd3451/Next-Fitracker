import { PrismaClient } from '@prisma/client';
import type { NextApiRequest, NextApiResponse } from 'next';

const prisma = new PrismaClient();

const calcularBMR = (
  peso: number,
  altura: number,
  edad: number,
  genero: string,
  actividad: string,
  objetivo: string
) => {
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

  // mantener peso
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

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const { clienteId, peso, altura, edad, genero, actividad, objetivo } = req.body;

    const resultados = calcularBMR(peso, altura, edad, genero, actividad, objetivo);

    try {
      const bmr = await prisma.bMR.create({
        data: {
          peso,
          altura,
          edad,
          actividad,
          clienteId,
          objetivo, // Añadir objetivo aquí
          proteinas: resultados.proteinas,
          carbohidratos: resultados.carbohidratos,
          grasas: resultados.grasas,
          calorias: resultados.calorias,
          fecha: new Date(),
          cliente: {
            connect: { id: clienteId },
          },
        },
      });
      res.status(200).json(resultados);
    } catch (error) {
      res.status(500).json({ error: 'Error creando BMR' });
    }
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
