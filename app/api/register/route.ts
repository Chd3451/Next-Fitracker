import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function POST(req: NextRequest) {
  try {
    const { nombre, fechaNacimiento, peso, altura, metaPeso, email, telefono, genero, direccion } = await req.json();

    const newCliente = await prisma.cliente.create({
      data: {
        nombre,
        fechaNacimiento: new Date(fechaNacimiento),
        peso: parseFloat(peso),
        altura: parseFloat(altura),
        metaPeso: parseFloat(metaPeso),
        email,
        telefono,
        genero,
        direccion,
        fechaRegistro: new Date(),
      },
    });

    return NextResponse.json(newCliente, { status: 201 });
  } catch (error) {
    console.error('Error al registrar el cliente:', error);
    return NextResponse.json({ message: 'Error al registrar el cliente' }, { status: 500 });
  }
}
