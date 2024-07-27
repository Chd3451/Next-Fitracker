
import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function GET() {
  try {
    const clientes = await prisma.cliente.findMany(); // Obtén todos los clientes desde la base de datos
    return NextResponse.json(clientes); // Devuelve la respuesta en formato JSON
  } catch (error) {
    console.error('Error al obtener los clientes:', error);
    return NextResponse.json({ message: 'Error al obtener los clientes' }, { status: 500 });
  }
}

