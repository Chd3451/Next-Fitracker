import { NextResponse } from 'next/server';
import prisma from '../../../lib/prisma';

export async function POST(req: Request) {
  try {
    const data = await req.json();
    console.log('Data received:', data); // Añade esto para verificar los datos en la consola

    const savedBMR = await prisma.bMR.create({
      data: {
        clienteId: data.clienteId,
        peso: data.peso,
        altura: data.altura,
        edad: data.edad,
        genero: data.genero,
        actividad: data.actividad,
        calorias: data.calorias,
        proteinas: data.proteinas,
        carbohidratos: data.carbohidratos,
        grasas: data.grasas,
      },
    });

    return NextResponse.json(savedBMR);
  } catch (error) {
    console.error('Error saving BMR:', error);
    return new NextResponse('Error saving BMR', { status: 500 });
  }
}
