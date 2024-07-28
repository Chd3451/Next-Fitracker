import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const id = searchParams.get('id');

  if (!id) {
    return NextResponse.json({ message: 'ID de cliente no proporcionado' }, { status: 400 });
  }

  try {
    const cliente = await prisma.cliente.findUnique({
      where: { id: Number(id) },
    });
    if (cliente) {
      return NextResponse.json(cliente, { status: 200 });
    } else {
      return NextResponse.json({ message: 'Cliente no encontrado' }, { status: 404 });
    }
  } catch (error) {
    console.error('Error al obtener el cliente:', error);
    return NextResponse.json({ message: 'Error al obtener el cliente' }, { status: 500 });
  }
}

export async function PUT(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const id = searchParams.get('id');

  if (!id) {
    return NextResponse.json({ message: 'ID de cliente no proporcionado' }, { status: 400 });
  }

  const { nombre, fechaNacimiento, peso, altura, metaPeso, email, telefono, genero, direccion } = await req.json();

  try {
    const updatedCliente = await prisma.cliente.update({
      where: { id: Number(id) },
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
      },
    });
    return NextResponse.json(updatedCliente, { status: 200 });
  } catch (error) {
    console.error('Error al actualizar el cliente:', error);
    return NextResponse.json({ message: 'Error al actualizar el cliente' }, { status: 500 });
  }
}
