import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const clienteId = searchParams.get('clienteId');

    if (!clienteId) {
      return NextResponse.json({ error: 'Cliente ID es requerido' }, { status: 400 });
    }

    const cliente = await prisma.cliente.findUnique({
      where: { id: Number(clienteId) },
      include: {
        BMR: {
          orderBy: { 
            fecha: 'desc' 
          },
          take: 1,
        },
      },
    });

    if (!cliente) {
      return NextResponse.json({ error: 'Cliente no encontrado' }, { status: 404 });
    }

    return NextResponse.json({
      cliente,
      bmr: cliente.BMR.length > 0 ? cliente.BMR[0] : null,
    });
  } catch (error) {
    return NextResponse.json({ error: 'Error al obtener el cliente' }, { status: 500 });
  }
}
